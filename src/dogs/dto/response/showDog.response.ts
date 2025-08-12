import { DOG_BREED, DogBreedValue } from "src/dogs/enum";
import { Dog } from "../../entities/dog.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ShowDogResponse {
        readonly id : number;
        readonly name : string;
        readonly age : number;

		  @ApiProperty({
			example: 'lg',
			description: 'The breed of the Dog',
			enum : Object.values(DOG_BREED )
		  })
        readonly breed : DogBreedValue;

        constructor(dog : Dog) {
            this.id = dog.id;
			this.age = dog.age;
			this.name = dog.name;
			this.breed = dog.breed;
        }


}