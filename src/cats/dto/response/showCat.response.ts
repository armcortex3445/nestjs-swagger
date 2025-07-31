import { ApiProperty } from "@nestjs/swagger";
import { Cat } from "../../entities/cat.entity";

export class ShowCatResponse {

  readonly name: string;

  @ApiProperty({ example: 1, description: 'The age of the Cat' })
  readonly age: number;

  @ApiProperty({
    example: 'Maine Coon',
    description: 'The breed of the Cat',
  })
  readonly breed: string;

  constructor(cat : Cat){

    this.name = cat.name;
    this.age = cat.age;
    this.breed = cat.breed;
  }
}
