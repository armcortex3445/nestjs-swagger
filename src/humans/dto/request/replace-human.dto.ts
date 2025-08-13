
import { OmitType } from "@nestjs/swagger";
import { CreateHumanDto } from "./create-human.dto";


export class ReplaceHumanDto extends OmitType(CreateHumanDto,['name']){}