import { ClassDeclaration, InterfaceDeclaration, MappedTypeNode, Project , SourceFile, StructureKind, SymbolFlags, SyntaxKind, ts } from "ts-morph";

interface ASTProperty{
    name: string; type: string; hasQuestionToken: boolean
}

function extractProperties(declaration : ClassDeclaration ) : ASTProperty[]{


    const collectedProps: Map<string, ASTProperty> = new Map();

    getOwnProperties();
    getAncestorProperties();

    return [...collectedProps.values()];

    function getOwnProperties(){
        const type = declaration.getType();
        const ownProps = type.getProperties();
        ownProps.forEach(prop => {
            const valueLoc = prop.getValueDeclaration();
            if(!valueLoc) return;
            collectedProps.set(prop.getName(), {
                name: prop.getName(),
                type: prop.getTypeAtLocation(prop.getValueDeclarationOrThrow()).getText(),
                hasQuestionToken: prop.hasFlags(SymbolFlags.Optional),
            });
        });
    }


    function getAncestorProperties(){
        const baseTypes = declaration.getBaseTypes();
        
        for (const baseType of baseTypes) {
            const baseSymbol = baseType.getSymbol();
            if (!baseSymbol) continue;

            const baseDecl = baseSymbol.getDeclarations()[0]; 
            if (!baseDecl) continue;

            const kindName = baseDecl.getKindName();
            console.log(`[getAncestorProperties] kind : ${kindName}`);
            const inheritedProps : ASTProperty[] = [];

            switch(kindName){

                case "ClassDeclaration" : {
                    baseDecl.asKindOrThrow(SyntaxKind.ClassDeclaration).getProperties().forEach(prop=> {
                        inheritedProps.push({
                            name : prop.getName(),
                            type : prop.getType().getText(),
                            hasQuestionToken : prop.hasQuestionToken()
                        });
                    });
                    break;
                }

                case "InterfaceDeclaration"  :{
                    baseDecl.asKindOrThrow(SyntaxKind.InterfaceDeclaration).getProperties().forEach(prop=> {
                        inheritedProps.push({
                            name : prop.getName(),
                            type : prop.getType().getText(),
                            hasQuestionToken : prop.hasQuestionToken()
                        });
                    });

                    break;
                }

                //MappedType 경우, 타입 스탠스폼을 통해 생성되므로, 별도의 작업이 필요.
                case "MappedType" : {
                    const checker = declaration.getProject().getTypeChecker();
                    const extendsClause = declaration.getHeritageClauses().find(h=>h.getToken() === SyntaxKind.ExtendsKeyword);
                    const baseTypeNode = extendsClause.getTypeNodes()[0];
                    const baseType = checker.getTypeAtLocation(baseTypeNode);

                    // 3. 상속한 타입의 프로퍼티 추출
                    baseType.getProperties().forEach(prop => {
                        const propType = prop.getTypeAtLocation(declaration);
                      
                        inheritedProps.push({
                          name: prop.getName(),
                          type: propType.getText(),
                          hasQuestionToken : prop.hasFlags(ts.SymbolFlags.Optional),
                        });
                    });
                    break;
                }

                case "TypeReference" : {

                }

                default : {
                    console.warn(`[getAncestorProperties] not defined SyntaxKind`);
                    continue;
                }
            }

            inheritedProps.forEach(ast => {
                if (!collectedProps.has(ast.name)) {
                    collectedProps.set(ast.name, ast);
                }
            });
        }
    }
}

export function transformToInterface(globPattern : string[],outDir : string ){

    const project = new Project({
        tsConfigFilePath : "tsconfig.json",
        // skipAddingFilesFromTsConfig : true,
        // skipFileDependencyResolution: true,
    });

    const sourceFiles = project.getSourceFiles(globPattern);
     
    for( const file of sourceFiles){
        console.log(`#processing : ${file.getFilePath()}`);

        const fileName = file.getFilePath().split('/').slice(-1)[0];

        const classDeclaration = file.getClass(()=>true);

        if (!classDeclaration) {
            console.warn(`⚠️ No matching class in file: ${file.getBaseName()}`);
            continue;
        }

        const className = classDeclaration.getName();
        const typeParams = classDeclaration.getTypeParameters();
        const typeParamTexts = typeParams.map(tp => tp.getText()); // 예: ['T', 'U']
        const genericSuffix = typeParamTexts.length > 0 ? `<${typeParamTexts.join(", ")}>` : "";


        const properties : ASTProperty[] = extractProperties(classDeclaration);

        classDeclaration.getDecorators().forEach(d=>d.remove);
        
        const outputFilePath = `${outDir}/${fileName}`;
        const interfaceFile = project.createSourceFile(outputFilePath,"",{overwrite : true});


        interfaceFile.addInterface({
            name : className,
            isExported : true,
            typeParameters: typeParamTexts,
            properties : properties
        });
        
        interfaceFile.saveSync();
        console.log(`✅ Created interface: ${className}${genericSuffix} → ${outputFilePath}`);

    }
}
