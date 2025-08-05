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

    const args : string[] = [`types/**/*{.response.ts,.dto.ts}`];
    console.log(`Running typeMapper. ${args.join(" , ")}`);

    processFiles(args[0])
    
}

main();