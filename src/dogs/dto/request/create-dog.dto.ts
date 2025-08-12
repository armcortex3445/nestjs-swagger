import { ApiProperty } from "@nestjs/swagger";
import { DOG_BREED, DogBreedValue } from "src/dogs/enum";
import { IsIn, IsNumber, IsString } from "class-validator";

export class CreateDogDto {
    @IsString()
    name! : string;

    @IsNumber()
    age! : number;

    @IsIn([...Object.values(DOG_BREED)])
    @ApiProperty({enum : [...Object.values(DOG_BREED)] })
    breed! : DogBreedValue;
}
