import { Cat } from "../../cats/entities/cat.entity";
import { Dog } from "../../dogs/entities/dog.entity";

export class Human {
    private static _id_generator : number;

    id : number
    name : string;
    age : number;


    pets : (Cat | Dog)[];

    constructor(name : string, age : number, pets : (Cat|Dog)[]){
        this.id = Human._id_generator++;
        this.name = name;
        this.age = age;
        this.pets = pets;

    }

}
