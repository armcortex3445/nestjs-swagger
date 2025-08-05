import { get } from "http";
import { ClassDeclaration, InterfaceDeclaration, Project , StructureKind, SyntaxKind, ts } from "ts-morph";

interface ASTProperty{
    name: string; type: string; hasQuestionToken: boolean
}

function extractProperties( declaration : ClassDeclaration ) : ASTProperty[]{


    const collectedProps: Map<string, ASTProperty> = new Map();

    getOwnProperties();
    getAncestorProperties();

    return [...collectedProps.values()];

    function getOwnProperties(){
        const ownProps = declaration.getProperties();
        ownProps.forEach(p => p.getDecorators().forEach(d => d.remove()));
        ownProps.forEach(prop => {
            collectedProps.set(prop.getName(), {
                name: prop.getName(),
                type: prop.getType().getText(),
                hasQuestionToken: prop.hasQuestionToken(),
            });
        });
    }


    function getAncestorProperties(){
        const baseTypes = declaration.getBaseTypes();
        
        for (const baseType of baseTypes) {
            const baseSymbol = baseType.getSymbol();
            if (!baseSymbol) continue;

            const declaration = baseSymbol.getDeclarations().find(d =>
                d.getKindName() === "ClassDeclaration" || d.getKindName() === "InterfaceDeclaration"
            ) as ClassDeclaration | InterfaceDeclaration | undefined;

            if (!declaration) continue;

            const inheritedProps =
                declaration.getKindName() === "ClassDeclaration"
                    ? (declaration as ClassDeclaration).getProperties()
                    : (declaration as InterfaceDeclaration).getProperties();

            inheritedProps.forEach(prop => {
                const name = prop.getName();
                if (!collectedProps.has(name)) {
                    collectedProps.set(name, {
                        name,
                        type: prop.getType().getText(),
                        hasQuestionToken: prop.hasQuestionToken(),
                    });
                }
            });
        }
    }
}

export function ClassMigration(){

    const project = new Project({
        tsConfigFilePath : "tsconfig.json",
        // skipAddingFilesFromTsConfig : true,
        // skipFileDependencyResolution: true,
        compilerOptions : {
            outDir : "types",
        }
    });

    const sourceFiles = project.getSourceFiles(["src/**/*.response.ts" , "src/**/*dto.ts"]);
     
    for( const file of sourceFiles){
        console.log(`#processing : ${file.getFilePath()}`);

        const fileName = file.getFilePath().split('/').slice(-1).join();

        const classDeclaration = file.getClass((declaration => {
            const name = declaration.getName() ?? "";
            if(!(name.includes(`Response`) || name.includes(`Dto`))){
                return false;
            }
            return true;
        }));

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
        
        const outputFilePath = `types/${fileName}`;
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
