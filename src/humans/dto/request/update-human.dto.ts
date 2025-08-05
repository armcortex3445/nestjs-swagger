import { PartialType, PickType } from '@nestjs/swagger';
import { CreateHumanDto } from './create-human.dto';
import { ReplaceHumanDto } from './replace-human.dto';

export class UpdateHumanDto extends PickType(ReplaceHumanDto,['age','petId']) {}