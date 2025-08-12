import { ApiProperty } from "@nestjs/swagger";
import { DOG_BREED, DogBreedValue } from "../enum";

export class Dog {
    private static  _id_generator : number
    id : number;
    name : string;
    age : number;
    breed : DogBreedValue;

    constructor(name : string, age : number, breed : DogBreedValue){
        this.id = Dog._id_generator++;
        this.name = name;
        this.age = age;
        this.breed = breed;
    }
}
