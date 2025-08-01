import { ShowCatResponse } from "../../../cats/dto/response/showCat.response";
import { PaginatedResponse } from "../../../common/dto/paginated.response";
import { ShowDogResponse } from "../../../dogs/dto/response/showDog.response";

export class ShowHumanResponse{
    readonly name : string;
    readonly age : string;
    readonly pets : PaginatedResponse<ShowCatResponse|ShowDogResponse>;

}