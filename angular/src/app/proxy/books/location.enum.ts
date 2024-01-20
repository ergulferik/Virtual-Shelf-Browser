import { mapEnumToOptions } from '@abp/ng.core';

export enum Location {
  A1 = 0,
  A2 = 1,
  A3 = 2,
  A4 = 3,
  A5 = 4,
  A6 = 5,
  B1 = 6,
  B2 = 7,
  B3 = 8,
  B4 = 9,
  B5 = 10,
  B6 = 11,
  C1 = 12,
  C2 = 13,
  C3 = 14,
  C4 = 15,
  C5 = 16,
  C6 = 17,
  D1 = 18,
  D2 = 19,
  D3 = 20,
  D4 = 21,
  D5 = 22,
  D6 = 23,
  E1 = 24,
  E2 = 25,
  E3 = 26,
  E4 = 27,
  E5 = 28,
  E6 = 29,
}

export const locationOptions = mapEnumToOptions(Location);