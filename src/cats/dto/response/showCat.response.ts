import { ApiProperty } from "@nestjs/swagger";
import { Cat } from "../../entities/cat.entity";
import { CAT_BREED, CatBreedValue } from "../../enum";

export class ShowCatResponse {

  readonly id : number;
  readonly name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  readonly age: number;

  @ApiProperty({
    example: 'tesla',
    description: 'The breed of the Cat',
    enum : Object.values(CAT_BREED )
  })
  readonly breed: CatBreedValue;

  constructor(cat : Cat){
    this.id = cat.id;
    this.name = cat.name;
    this.age = cat.age;
    this.breed = cat.breed;
  }
}
