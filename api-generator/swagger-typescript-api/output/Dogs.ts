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

export class Dogs<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * @description this operation find all dogs
 *
 * @tags Dogs
 * @name DogsControllerFindAll
 * @summary find all dog
 * @request GET:/dogs
 * @secure
 * @response `200` `DogsControllerFindAllData`
 * @response `400` `void` Bad Request.
 * @response `500` `void` Something went wrong.
 */
dogsControllerFindAll: (params: RequestParams = {}) =>
    this.request<DogsControllerFindAllData, void>({
        path: `/dogs`,
        method: 'GET',
                        secure: true,                format: "json",        ...params,
    }),            /**
 * No description
 *
 * @tags Dogs, tag
 * @name DogsControllerCreate
 * @request POST:/dogs
 * @secure
 * @response `201` `DogsControllerCreateData` create dog
 * @response `300` `void` request is ambiguous
 */
dogsControllerCreate: (data: CreateDogDto, params: RequestParams = {}) =>
    this.request<DogsControllerCreateData, void>({
        path: `/dogs`,
        method: 'POST',
                body: data,        secure: true,        type: ContentType.Json,                ...params,
    }),            /**
 * No description
 *
 * @tags Dogs
 * @name DogsControllerFindOne
 * @request GET:/dogs/{id}
 * @secure
 * @response `200` `DogsControllerFindOneData`
 */
dogsControllerFindOne: (id: string, params: RequestParams = {}) =>
    this.request<DogsControllerFindOneData, any>({
        path: `/dogs/${id}`,
        method: 'GET',
                        secure: true,                format: "json",        ...params,
    }),            /**
 * No description
 *
 * @tags Dogs
 * @name DogsControllerUpdate
 * @request PUT:/dogs/{id}
 * @secure
 * @response `200` `DogsControllerUpdateData`
 */
dogsControllerUpdate: (id: string, data: DogsControllerUpdatePayload, params: RequestParams = {}) =>
    this.request<DogsControllerUpdateData, any>({
        path: `/dogs/${id}`,
        method: 'PUT',
                body: data,        secure: true,        type: ContentType.Json,                ...params,
    }),            /**
 * No description
 *
 * @tags Dogs
 * @name DogsControllerRemove
 * @request DELETE:/dogs/{id}
 * @secure
 * @response `200` `DogsControllerRemoveData`
 */
dogsControllerRemove: (id: string, params: RequestParams = {}) =>
    this.request<DogsControllerRemoveData, any>({
        path: `/dogs/${id}`,
        method: 'DELETE',
                        secure: true,                        ...params,
    }),    }
