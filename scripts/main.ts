import { ClassMigration } from "./transformer";
import { processFiles } from "./typeMapper";



function main() {

    ClassMigration();

    const args : string[] = [`types/**/*{.response.ts,.dto.ts}`];
    console.log(`Running typeMapper. ${args.join(" , ")}`);

    processFiles(args[0])
    
}

main();