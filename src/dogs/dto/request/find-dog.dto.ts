import { Dog } from "../../entities/dog.entity";
import { ShowDogResponse } from "../response/showDog.response";

export class FindDogResponse{

    count : number;
    prop : Record<keyof ShowDogResponse,string>
}