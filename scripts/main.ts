import { Project } from "ts-morph";
import { processFiles } from "./typeMapper";
import { transformToInterface } from "./transformer";



function main() {

    const inputDir = "src";
    const outDir = "types";
    const dtoGlob = ["*.response.ts" , "*.dto.ts"];

    //1. transform
    console.log(`Running transformer.`);
    transformToInterface(inputDir,dtoGlob,outDir);

    console.log(`Running typeMapper.`);

    processFiles(inputDir,dtoGlob,outDir)
    
}

main();