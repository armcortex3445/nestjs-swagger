import { ClassDeclaration, InterfaceDeclaration, MappedTypeNode, Project , SourceFile, StructureKind, SymbolFlags, SyntaxKind, ts } from "ts-morph";

interface ASTProperty{
    name: string; type: string; hasQuestionToken: boolean
}

function getAllProperties(declaration : ClassDeclaration ) : ASTProperty[]{


    const collectedProps: Map<string, ASTProperty> = new Map();

    const type = declaration.getType();
    const ownProps = type.getProperties();
    ownProps.forEach(prop => {
        collectedProps.set(prop.getName(), {
            name: prop.getName(),
            type: prop.getTypeAtLocation(declaration).getText(),
            hasQuestionToken: prop.hasFlags(SymbolFlags.Optional),
        });
    });

    return [...collectedProps.values()];
}

function getAncestorProperties(declaration : ClassDeclaration){
    const baseTypes = declaration.getBaseTypes();
    const collectedProps: Map<string, ASTProperty> = new Map();
    
    for (const baseType of baseTypes) {
        const baseSymbol = baseType.getSymbol();
        if (!baseSymbol) continue;

        const baseDecl = baseSymbol.getDeclarations()[0]; 
        if (!baseDecl) continue;

        const kind = baseDecl.getKind();
        console.log(`[getAncestorProperties] kind : ${baseDecl.getKindName()}`);
        let inheritedProps : ASTProperty[] = [];

        if(kind === SyntaxKind.ClassDeclaration || kind === SyntaxKind.InterfaceDeclaration){
            const properties = baseDecl.getKind() === SyntaxKind.ClassDeclaration ?
            baseDecl.asKindOrThrow(SyntaxKind.ClassDeclaration).getProperties() :
            baseDecl.asKindOrThrow(SyntaxKind.InterfaceDeclaration).getProperties();
    
          inheritedProps = properties.map(prop => ({
            name: prop.getName(),
            type: prop.getType().getText(),
            hasQuestionToken: prop.hasQuestionToken()
          }));
        }
        // AST가 없는 MappedType이나 TypeReference에 경우, TypeChecker를 활용
        else {
            const checker = declaration.getProject().getTypeChecker(); 
            inheritedProps = baseType.getProperties().map(prop => {
            const propType = checker.getTypeOfSymbolAtLocation(prop, declaration); //const propType = prop.getTypeAtLocation(declaration); 동일한 방법
            return {
                name: prop.getName(),
                type: propType.getText(),
                hasQuestionToken: prop.hasFlags(ts.SymbolFlags.Optional)
            };
            });
        }

        inheritedProps.forEach(ast => {
            if (!collectedProps.has(ast.name)) {
                collectedProps.set(ast.name, ast);
            }
        });
    }

    return [...collectedProps.values()];
}

export function transformToInterface(inputDir : string, globPattern : string[],outDir : string ){

    const project = new Project({
        tsConfigFilePath : "tsconfig.json",
        // skipAddingFilesFromTsConfig : true,
        // skipFileDependencyResolution: true,
    });

    const sourceFiles = project.getSourceFiles(globPattern.map(p=>`${inputDir}/**/${p}`));
     
    for( const file of sourceFiles){
        console.log(`#processing : ${file.getFilePath()}`);

        
        const classDeclaration = file.getClass(()=>true);
        
        if (!classDeclaration) {
            console.warn(`⚠️ No matching class in file: ${file.getBaseName()}`);
            continue;
        }
        
        const properties : ASTProperty[] = getAllProperties(classDeclaration);
        const outputFilePath = `${outDir}/${getPathAfterDir(file.getFilePath(),inputDir)}`;
        generateInterface(classDeclaration,properties,outputFilePath);
    }
}

function generateInterface(classDeclaration : ClassDeclaration, properties : ASTProperty[], outputFilePath : string){

        
    const className = classDeclaration.getName();
    const typeParams = classDeclaration.getTypeParameters();
    const typeParamTexts = typeParams.map(tp => tp.getText()); // 예: ['T', 'U']
    const interfaceFile = classDeclaration.getProject().createSourceFile(outputFilePath,"",{overwrite : true});
    
    
    const genericSuffix = typeParamTexts.length > 0 ? `<${typeParamTexts.join(", ")}>` : "";
    interfaceFile.addInterface({
        name : className!,
        isExported : true,
        typeParameters: typeParamTexts,
        properties : properties
    });
    
    interfaceFile.saveSync();

    console.log(`✅ Created interface: ${className}${genericSuffix} → ${outputFilePath}`);
}

function getPathAfterDir(fullPath: string, dirName: string): string | null {
    const idx = fullPath.indexOf(`/${dirName}/`);
    if (idx === -1) return null;
    return fullPath.substring(idx + dirName.length + 1); // +1 for the extra slash
  }
