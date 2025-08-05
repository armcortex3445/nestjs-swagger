import { Project } from "ts-morph";
import { processFiles } from "./typeMapper";
import { transformToInterface } from "./transformer";



function main() {

    const outDir = "types";
    const dtoGlob = ["src/**/*.response.ts" , "src/**/*dto.ts"];

    //1. transform
    console.log(`Running transformer.`);
    transformToInterface(dtoGlob,outDir);

    const args : string[] = [`types/**/*{.response.ts,.dto.ts}`];
    console.log(`Running typeMapper. ${args.join(" , ")}`);

    processFiles(args[0])
    
}

main();