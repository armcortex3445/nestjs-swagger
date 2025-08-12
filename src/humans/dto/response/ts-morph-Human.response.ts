import { Project } from "ts-morph";
import { ShowCatResponse } from "../../../cats/dto/response/showCat.response";
import { PaginatedResponse } from "../../../common/dto/paginated.response";
import { ShowDogResponse } from "../../../dogs/dto/response/showDog.response";
import { Country, GENDER } from "../../enum";

export class TsMorphHumanResponse {
    readonly stringType! : string;
    readonly numberType! : number;
    readonly genericUnionType! : PaginatedResponse<ShowCatResponse|ShowDogResponse>;
    readonly intersectionType! : ShowCatResponse & ShowDogResponse;
    readonly arrayPickType! : Array<Pick<ShowDogResponse,'name'>>;
    readonly recursiveType? : TsMorphHumanResponse;
    arrayUnionType! : Array<string | number>;
    externalType! : Project;
    unionStringType! : 'A'|'B'|'C';
    enumType! : GENDER;
    constObjectType! : Country
}