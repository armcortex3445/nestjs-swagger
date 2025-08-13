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

export interface CreateCatDto {
  breed: "apple" | "tesla" | "micro-soft" | "nvidia";
  name: string;
  age: number;
}

export interface ShowCatResponse {
  /**
   * The age of the Cat
   * @example 1
   */
  age: number;
  /**
   * The breed of the Cat
   * @example "tesla"
   */
  breed: "apple" | "tesla" | "micro-soft" | "nvidia";
  id: number;
  name: string;
}

export interface PaginatedResponse {
  total: number;
  limit: number;
  offset: number;
  data: string[];
}

export interface ShowDogResponse {
  /**
   * The breed of the Dog
   * @example "lg"
   */
  breed: "lotte" | "samsung" | "lg";
  id: number;
  name: string;
  age: number;
}

export interface CreateDogDto {
  breed: "lotte" | "samsung" | "lg";
  name: string;
  age: number;
}

export interface CreateHumanDto {
  pets: (CreateCatDto | CreateDogDto)[];
  name: string;
  age: number;
}

export interface ShowHumanResponse {
  pets: PaginatedResponse;
  id: number;
  name: string;
  age: number;
}

export interface UpdateHumanDto {
  pets: (CreateCatDto | CreateDogDto)[];
  age: number;
}

export type CatsControllerCreateData = ShowCatResponse;

export type CatsControllerFindOneData = ShowCatResponse;

/** PaginatedResponseOfShowDogResponse */
export type DogsControllerFindAllData = PaginatedResponse & {
  data?: ShowDogResponse[];
};

export type DogsControllerCreateData = any;

export type DogsControllerFindOneData = ShowDogResponse;

export type DogsControllerUpdatePayload = CreateDogDto[];

export type DogsControllerUpdateData = any;

export type DogsControllerRemoveData = any;

export type HumansControllerCreateData = ShowHumanResponse;

/** PaginatedResponseOfShowHumanResponse */
export type HumansControllerFindAllData = PaginatedResponse & {
  data?: ShowHumanResponse[];
};

export type HumansControllerFindOneData = any;

export type HumansControllerUpdateData = any;

export type HumansControllerRemoveData = any;
