import { ShowCatResponse } from "../../../cats/dto/response/showCat.response";
import { PaginatedResponse } from "../../../common/dto/paginated.response";
import { ShowDogResponse } from "../../../dogs/dto/response/showDog.response";
import { Human } from "../../entities/human.entity";
import { Country, GENDER } from "../../enum";
import { ApiProperty, PickType } from "@nestjs/swagger";

export class ShowHumanResponse extends PickType(Human,['id','age','name']) {
    readonly id : number;
    readonly name : string;
    readonly age : number;
    
    @ApiProperty({type : ()=>PaginatedResponse<ShowCatResponse|ShowDogResponse>})
    readonly pets : PaginatedResponse<ShowCatResponse|ShowDogResponse>;

    constructor(human : Human){
        super();
        this.id = human.id;
        this.age = human.age;
        this.name = human.name;
        this.pets = new PaginatedResponse(human.pets);

    }
}