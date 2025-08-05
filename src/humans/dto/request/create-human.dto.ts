import { CreateCatDto } from "../../../cats/dto/request/create-cat.dto";
import { CreateDogDto } from "../../../dogs/dto/request/create-dog.dto";

export class CreateHumanDto {
    name : string;
    age : number;
    petId? : string;
    createPetDto? : CreateCatDto | CreateDogDto;
}
