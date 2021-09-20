import { imageFormats, textFormats, textTypes } from './constants'

export type ImageFormat = typeof imageFormats[number]
export type TextFormat = typeof textFormats[number]
export type TextType = typeof textTypes[number]

export interface IReturnJSONOutput {
  text: string
  count: string
  credits: string
  support: string
}
export type IGenerateTextReturn = string | string[] | IReturnJSONOutput
