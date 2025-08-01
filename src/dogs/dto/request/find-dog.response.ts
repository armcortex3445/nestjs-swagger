import { Dog } from "../../entities/dog.entity";

export class FindDogResponse{

    count : number;
    data : Dog[];
}