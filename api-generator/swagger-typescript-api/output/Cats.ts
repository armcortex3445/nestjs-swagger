/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */



import { HttpClient, RequestParams, ContentType, HttpResponse } from "./http-client";
import { CreateCatDto, ShowCatResponse, PaginatedResponse, ShowDogResponse, CreateDogDto, CreateHumanDto, ShowHumanResponse, UpdateHumanDto, CatsControllerCreateData, CatsControllerFindOneData, DogsControllerFindAllData, DogsControllerCreateData, DogsControllerFindOneData, DogsControllerUpdatePayload, DogsControllerUpdateData, DogsControllerRemoveData, HumansControllerCreateData, HumansControllerFindAllData, HumansControllerFindOneData, HumansControllerUpdateData, HumansControllerRemoveData } from "./data-contracts"

export class Cats<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * @description This operation allows you to create a new cat.
 *
 * @tags cats
 * @name CatsControllerCreate
 * @summary Create a new cat
 * @request POST:/cats
 * @secure
 * @response `201` `CatsControllerCreateData`
 * @response `400` `void` Bad Request.
 * @response `500` `void` Something went wrong.
 */
catsControllerCreate: (data: CreateCatDto, params: RequestParams = {}) =>
    this.request<CatsControllerCreateData, void>({
        path: `/cats`,
        method: 'POST',
                body: data,        secure: true,        type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * @description find a cat by id
 *
 * @tags cats
 * @name CatsControllerFindOne
 * @summary find a new cat
 * @request GET:/cats/{id}
 * @secure
 * @response `200` `CatsControllerFindOneData`
 * @response `400` `void` Bad Request.
 * @response `500` `void` Something went wrong.
 */
catsControllerFindOne: (id: string, params: RequestParams = {}) =>
    this.request<CatsControllerFindOneData, void>({
        path: `/cats/${id}`,
        method: 'GET',
                        secure: true,                format: "json",        ...params,
    }),    }
