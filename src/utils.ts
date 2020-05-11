/*
 * Copyright (c) 2020 MIT
 * @File: utils.ts
 * @Author: boxdox
 */

export const randomNumber = (min: number, max: number): number => {
  return Math.trunc(Math.random() * (max - min) + min);
};

export const titleCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
