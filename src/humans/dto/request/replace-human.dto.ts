import { OmitType } from "@nestjs/mapped-types";
import { CreateHumanDto } from "./create-human.dto";


export class ReplaceHumanDto extends OmitType(CreateHumanDto,['name']){}