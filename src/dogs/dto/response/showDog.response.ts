import { DogBreedValue } from "../../entities/dog.entity";

export class ShowDogResponse {

        readonly name! : string;
        readonly age! : number;
        readonly breed! : DogBreedValue;
}