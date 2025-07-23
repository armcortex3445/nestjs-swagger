import { ApiProperty } from "@nestjs/swagger";
import { DOG_BREED, DogBreedValue } from "../entities/dog.entity";

export class CreateDogDto {
    name! : string;
    age! : number;

    @ApiProperty({enum : [...Object.values(DOG_BREED)] })
    breed! : DogBreedValue;
}
