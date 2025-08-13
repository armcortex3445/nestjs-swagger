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

export class Humans<SecurityDataType = unknown> extends HttpClient<SecurityDataType>  {

            /**
 * No description
 *
 * @tags Humans
 * @name HumansControllerCreate
 * @request POST:/humans
 * @response `201` `HumansControllerCreateData`
 */
humansControllerCreate: (data: CreateHumanDto, params: RequestParams = {}) =>
    this.request<HumansControllerCreateData, any>({
        path: `/humans`,
        method: 'POST',
                body: data,                type: ContentType.Json,        format: "json",        ...params,
    }),            /**
 * No description
 *
 * @tags Humans
 * @name HumansControllerFindAll
 * @request GET:/humans
 * @response `200` `HumansControllerFindAllData`
 */
humansControllerFindAll: (params: RequestParams = {}) =>
    this.request<HumansControllerFindAllData, any>({
        path: `/humans`,
        method: 'GET',
                                        format: "json",        ...params,
    }),            /**
 * No description
 *
 * @tags Humans
 * @name HumansControllerFindOne
 * @request GET:/humans/{id}
 * @response `200` `HumansControllerFindOneData`
 * @response `default` `ShowHumanResponse`
 */
humansControllerFindOne: (id: string, params: RequestParams = {}) =>
    this.request<HumansControllerFindOneData, any>({
        path: `/humans/${id}`,
        method: 'GET',
                                                ...params,
    }),            /**
 * No description
 *
 * @tags Humans
 * @name HumansControllerUpdate
 * @request PATCH:/humans/{id}
 * @response `200` `HumansControllerUpdateData`
 */
humansControllerUpdate: (id: string, data: UpdateHumanDto, params: RequestParams = {}) =>
    this.request<HumansControllerUpdateData, any>({
        path: `/humans/${id}`,
        method: 'PATCH',
                body: data,                type: ContentType.Json,                ...params,
    }),            /**
 * No description
 *
 * @tags Humans
 * @name HumansControllerRemove
 * @request DELETE:/humans/{id}
 * @response `200` `HumansControllerRemoveData`
 */
humansControllerRemove: (id: string, params: RequestParams = {}) =>
    this.request<HumansControllerRemoveData, any>({
        path: `/humans/${id}`,
        method: 'DELETE',
                                                ...params,
    }),    }
