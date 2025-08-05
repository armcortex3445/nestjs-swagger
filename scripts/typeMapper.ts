
import path, { dirname, relative } from "path";
import glob, { sync } from "glob";
import { Node,ImportTypeNode, InterfaceDeclaration, Project, PropertyDeclaration, SourceFile, StringLiteral, StructureKind, SyntaxKind, TypeNode } from "ts-morph";

type ImportMap = Map<string,Set<string>>;

function isImportedType(prop: PropertyDeclaration): boolean {
    const type = prop.getType();
    const symbol = type.getSymbol();
    if (!symbol) return false;

    const propSourcePath = prop.getSourceFile().getFilePath();

    return symbol.getDeclarations().some((decl) => {
        const declPath = decl.getSourceFile().getFilePath();
        return declPath !== propSourcePath;
    });
}

function extractImportType(importType: ImportTypeNode): string | null {
  const qualifier = importType.getQualifier();
  if (!qualifier) return null;

  let typeName: string;

  if (Node.isQualifiedName(qualifier)) {
    typeName = qualifier.getRight().getText();  // ex: Namespace.Type → "Type"
  } else if (Node.isIdentifier(qualifier)) {
    typeName = qualifier.getText();  // ex: "Type"
  } else {
    return null;
  }

  // 타입 인자 처리
  const typeArgs = importType.getTypeArguments();
  if (typeArgs.length > 0) {
    const typeArgsText = typeArgs.map(arg => arg.getText()).join(", ");
    return `${typeName}<${typeArgsText}>`;
  }

  return typeName;
}

function refactorImportType(importType : ImportTypeNode) {

  const typeName = extractImportType(importType);
  if (typeName) {
    const newNode = importType.replaceWithText(typeName);
    return;
  }
}

/**
 * 타입 노드를 재귀적으로 순회하면서 import(...) 제거
 */
function recursivelySimplifyType(typeNode: TypeNode): void {

  const kind = typeNode.getKind();

  console.log(`[recursivelySimplifyType] type : ` + typeNode.getText());

  // 1. import(...) 제거
  if (kind === SyntaxKind.ImportType) {
    const importType : ImportTypeNode = typeNode.asKindOrThrow(SyntaxKind.ImportType);
    
    importType.getTypeArguments().forEach(recursivelySimplifyType);
    console.log(`[recursivelySimplifyType] ImportType`);
    refactorImportType(importType);
    return;

  }

  // 2. 제네릭 타입 처리: A<B, C>
  if (Node.isTypeReference(typeNode)) {
    const typeArgs = typeNode.getTypeArguments();
    console.log(`[recursivelySimplifyType] GenericType`);
    typeArgs.forEach(recursivelySimplifyType);
    return;
  }

  // 3. 유니언 타입 처리: A | B
  if (Node.isUnionTypeNode(typeNode)) {
    console.log(`[recursivelySimplifyType] UnionTypeNode`);
    typeNode.getTypeNodes().forEach(recursivelySimplifyType);
    return;
  }

  // 4. 인터섹션 타입 처리: A & B
  if (Node.isIntersectionTypeNode(typeNode)) {
    console.log(`[recursivelySimplifyType] IntersectionType` );
    typeNode.getTypeNodes().forEach(recursivelySimplifyType);
    return;
  }

  // 5. 배열 타입 처리 :  T[] , Array<T>
  // if (Node.isArrayTypeNode(typeNode)) ...

  if (Node.isArrayTypeNode(typeNode)){
    const typeArgs = typeNode.getElementTypeNode();
    console.log(`[recursivelySimplifyType] ArrayType`);
    recursivelySimplifyType(typeArgs);
    return;
  }

  if(Node.isTypeOperatorTypeNode(typeNode) && typeNode.getOperator() === SyntaxKind.KeyOfKeyword){
    const type = typeNode.getTypeNode();
    console.log(`[recursivelySimplifyType] keyof`);

    recursivelySimplifyType(type);
    return;
  }


}

/**
 * interface 내부의 모든 프로퍼티 타입에서 import(...) 제거
 */
export function simplifyImportTypesInInterface(sourceFile: SourceFile): void {
  const interfaceDecl = sourceFile.getInterfaces()[0];
  if (!interfaceDecl) return;

  for (const prop of interfaceDecl.getProperties()) {
    const typeNode = prop.getTypeNode();

    if (typeNode) {
      recursivelySimplifyType(typeNode);
    }
  }
}

function extractImportPathFromImportType(importTypeNode: ImportTypeNode): string | undefined {
    const argument = importTypeNode.getArgument();
  
    if (argument.getKind() !== SyntaxKind.LiteralType) return;
  
    const literalType = argument.asKindOrThrow(SyntaxKind.LiteralType);
    const literal = literalType.getLiteral();
  
    if (literal.getKind() === SyntaxKind.StringLiteral) {
      return (literal as StringLiteral).getLiteralText();
    }
  
    return;
  }


// 파일에서 이미 존재하는 import들을 맵으로 수집
function getExistingImports (file: SourceFile) : ImportMap {
    const importMap : ImportMap = new Map<string, Set<string>>();
    file.getImportDeclarations().forEach((decl) => {
        const module = decl.getModuleSpecifierValue();
        const names = decl.getNamedImports().map((ni) => ni.getName());
        importMap.set(module, new Set(names));
    });
    return importMap;
};
  
  // import("...").Type 형식의 타입을 찾아 필요한 import들을 수집
function findImportTypeReferences (file: SourceFile, filePath: string) {
    const importsToAdd: Record<string, Set<string>> = {};


    const interfaceDecl = file.getInterfaces()[0];
    const interfaceName = interfaceDecl.getType().getSymbol().getName();
    
    console.log(`[findImportTypeReferences] Entry : ${interfaceName}\n`+ `filePath : ${file.getFilePath()}`);
    file.forEachDescendant((node) => {
      if (node.getKind() === SyntaxKind.ImportType) {
        const importTypeNode = node.asKindOrThrow(SyntaxKind.ImportType);
        const qualifier = importTypeNode.getQualifier();
  
        const absImportPath = extractImportPathFromImportType(importTypeNode);
        
        
        if (!absImportPath || !qualifier) return;
        const typeName = qualifier.getText();

        // avoid importing recursive
        if(typeName === interfaceName){
          return;
        }
  
        // 상대 경로로 변환
        let relativePath = relative(dirname(filePath), absImportPath)
          .replace(/\\/g, "/")
          .replace(/\.ts$/, "");
  
        if (!relativePath.startsWith(".")) {
          relativePath = "./" + relativePath;
        }
  
        if (!importsToAdd[relativePath]) {
          importsToAdd[relativePath] = new Set();
        }
        importsToAdd[relativePath].add(typeName);

        console.log(`Add { ${relativePath} , ${typeName} } `);
      }
    });
  
    return importsToAdd;
};
  
  // 수집된 import 정보를 바탕으로 파일 상단에 import 구문 추가
  function addNamedImportsToFile(
    file: SourceFile,
    importsToAdd: Record<string, Set<string>>,
    existingImports: Map<string, Set<string>>
  ) {
    for (const [moduleSpecifier, typeNames] of Object.entries(importsToAdd)) {
      const alreadyImported = existingImports.get(moduleSpecifier) || new Set();
      const newImports = Array.from(typeNames).filter((name) => !alreadyImported.has(name));
  
      if (newImports.length > 0) {
        file.addImportDeclaration({
          kind: StructureKind.ImportDeclaration,
          moduleSpecifier,
          namedImports: newImports,
        });
      }
    }
  };
  
  // 하나의 파일에 대해 전체 동작 처리
function processFile (project: Project, filePath: string) {
    const sourceFile = project.getSourceFileOrThrow(filePath);
    const existingImports = getExistingImports(sourceFile);
    const importsToAdd = findImportTypeReferences(sourceFile, filePath);
    addNamedImportsToFile(sourceFile, importsToAdd, existingImports);
    simplifyImportTypesInInterface(sourceFile);
  };
  
  // 전체 glob 경로에 대해 처리
export function processFiles (inputDir: string, globPattern : string[],outDir : string) {
    const project = new Project({
        tsConfigFilePath : 'tsconfig.json',
        skipAddingFilesFromTsConfig : true,
        skipFileDependencyResolution : true,
    });  

    const resultPaths = sync(globPattern.map(p=>`${outDir}/**/${p}`),{absolute : true});

    project.addSourceFilesAtPaths(resultPaths);
    resultPaths.forEach((filePath) => {
      try {
        processFile(project, filePath);
      } catch (err) {
        console.error(`Failed to process ${filePath}:`, err);
      }
    });
  
    project.saveSync();
  };
