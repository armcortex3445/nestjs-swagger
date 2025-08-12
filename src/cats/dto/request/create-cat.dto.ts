import { IsIn, IsInt, IsString } from 'class-validator';
import { CAT_BREED, CatBreedValue } from '../../enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  @IsString()
  readonly name!: string;

  @IsInt()
  readonly age!: number;

  @ApiProperty({ enum : Object.values(CAT_BREED) })
  @IsIn([...Object.values(CAT_BREED)])
  readonly breed!: CatBreedValue;
}
