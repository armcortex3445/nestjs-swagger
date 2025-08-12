import { CatBreedValue } from "../enum";


export class Cat {
  private static _id_generator : number;
  id : number;
  name: string;

  age: number;

  breed: CatBreedValue;

  constructor(name : string,age : number ,breed : CatBreedValue){
    this.id = Cat._id_generator++;
    this.name = name;
    this.age = age;
    this.breed = breed;
  }

  
}
