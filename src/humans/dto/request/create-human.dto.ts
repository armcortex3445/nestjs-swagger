import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { CreateCatDto } from "../../../cats/dto/request/create-cat.dto";
import { CreateDogDto } from "../../../dogs/dto/request/create-dog.dto";

export class CreateHumanDto {
    name! : string;
    age! : number;

    @ApiProperty({
       oneOf: [ { $ref: getSchemaPath(CreateCatDto)}, { $ref: getSchemaPath(CreateDogDto)}] 
    })
    pets! : (CreateCatDto|CreateDogDto)[];
}
