import { applyDecorators, Type } from "@nestjs/common";
import { ApiExtraModels, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PaginatedResponse } from "../../dto/paginated.response";

export const ApiPaginatedResponse = <TClass extends Type<any>>(
    model : TClass,) => applyDecorators(
        ApiExtraModels(PaginatedResponse, model),
        ApiOkResponse({
            schema : {
                title : `PaginatedResponseOf${model.name}`,
                allOf : [
                    {$ref: getSchemaPath(PaginatedResponse)},
                    {
                        properties :{
                            data : {
                                type : 'array',
                                items : {$ref : getSchemaPath(model)}
                            }
                        }
                    }
                ]
            }
        })
    )