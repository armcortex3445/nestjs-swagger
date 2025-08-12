export const CAT_BREED = {
    APPLE: "apple",
    TESLA: "tesla",
    MS: "micro-soft",
    NVIDIA : "nvidia"
} as const;

export type CatBreedKey = keyof typeof CAT_BREED;
export type CatBreedValue = (typeof CAT_BREED)[CatBreedKey];