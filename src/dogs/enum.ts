
export const DOG_BREED = {
    LOTTE: "lotte",
    SAMSUMG: "samsung",
    LG: "lg",
} as const;

export type DogBreedKey = keyof typeof DOG_BREED;
export type DogBreedValue = (typeof DOG_BREED)[DogBreedKey];
