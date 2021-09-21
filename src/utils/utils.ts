/*
 * Copyright (c) 2021 MIT
 * @File: utils.ts
 * @Author: boxdox
 */
import { imageSize } from 'image-size'

export const randomNumber = (min: number, max: number): number => {
  return Math.trunc(Math.random() * (max - min) + min)
}

export const titleCase = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

type JoinArrayWithType = (arr: string[], sep: 'and' | 'or') => string
export const joinArrayWith: JoinArrayWithType = (
  arr: string[],
  sep = 'and'
) => {
  return arr.reduce((acc, val, index, arr) => {
    if (index == arr.length - 1) acc += val
    else if (index == arr.length - 2) acc += val + ` ${sep} `
    else acc += val + ', '
    return acc
  }, '')
}

export const getImageSizeFromBuffer = (
  imageBuffer: Buffer
): { width: number; height: number } => {
  const dimensions = imageSize(imageBuffer)
  return { width: dimensions.width || 0, height: dimensions.height || 0 }
}
