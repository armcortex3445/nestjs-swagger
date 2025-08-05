export const COUNTRY = {
    KR : 'kr',
    US : 'us',
    JP : 'jpn',
    CN : 'chn'
} as const;

export type Country = (typeof COUNTRY)[keyof typeof COUNTRY];

export enum GENDER {
    MALE = "male",
    FEMALE = "female",
    HALF_MALE = "half-male",
}