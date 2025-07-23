import { ApiProperty } from "@nestjs/swagger";

export const DOG_BREED = {
    LOTTE : "lotte",
    SAMSUMG : "samsung",
    LG : "lg",
} as const;

export type DogBreedKey = keyof typeof DOG_BREED;
export type DogBreedValue = typeof DOG_BREED[DogBreedKey]

export class Dog {

    private readonly _brand = 'dog';
    id : number;
    name : string;
    age : number;
    @ApiProperty({enum : [...Object.values(DOG_BREED)] })
    breed : DogBreedValue;

    constructor(id : number, name : string, age : number, breed : DogBreedValue){
        this.id = id;
        this.name = name;
        this.age = age;
        this.breed = breed;
    }
}
