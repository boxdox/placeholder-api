/*
 * Copyright (c) 2021 MIT
 * @File: app.ts
 * @Author: boxdox
 */

import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import path from 'path'

import generateText from './text'
import generateImage from './image'
import { TextType, TextFormat, ImageFormat } from './utils/types'
import { imageFormats } from './utils/constants'
import { joinArrayWith } from './utils/utils'

export const app: Express = express()

// setup middleware
app.use(cors())
app.use(helmet())
app.use(compression())

// root route
app.get('/', (_, res: Response) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// text api route
interface ITextAPIQuery {
  type: TextType
  format: TextFormat
  amount: number
}
app.get('/text', (req: Request<{}, {}, {}, ITextAPIQuery>, res: Response) => {
  let { amount = 3, type = 'paragraph', format = 'html' } = req.query

  amount = +amount
  if (amount <= 0) amount = 3

  if (amount > 1000) {
    res.status(400).json({
      error:
        "That's way too large to process for a free service like me. If you need to fulfill these kinds of requests, consider self hosting this API",
    })
  }

  try {
    const result = generateText({ amount, type, format })
    res.status(200).send(result)
  } catch {
    res.status(400).json(
      `Wrong type specified.
      Check if:
      'type' is one of 'word', 'sentence' or 'paragraph'
      or 
      'format' is one of 'raw', 'html' or 'json'`
    )
  }
})

// image api route
// This route matches if there is no width specified
app.get('/image', (_, res: Response) => {
  res
    .status(400)
    .json({ error: 'No width specified. Use something like /image/300' })
})

interface IImageParams {
  width: number
  height: number
  format: ImageFormat
}

interface IImageQuery {
  text: string
}

app.get(
  '/image/:width(\\d+)/:height(\\d+)?/:format?',
  async (req: Request<IImageParams, {}, {}, IImageQuery>, res: Response) => {
    let { width, height = width, format = 'jpeg' } = req.params
    width = +width
    height = +height
    const { text } = req.query

    if (!imageFormats.includes(format)) {
      return res.status(400).json({
        error: `Wrong format specified. 'format' should be one of ${joinArrayWith(
          imageFormats.slice(),
          'or'
        )}`,
      })
    }
    if (width <= 0 || height <= 0) {
      return res.status(400).json({
        error: 'What do you mean by zero or negative width or height?',
      })
    }
    if (width > 4000 || height > 4000) {
      return res.status(400).json({
        error:
          "Sorry, that's way too large to process. Reduce the offending value to < 4000",
      })
    }

    try {
      const image = await generateImage({ width, height, format, text })
      res.status(200).contentType(`image/${format}`).send(image)
    } catch (e) {
      console.error(e)
      res.status(500).json({
        error:
          "An error has ocurred while processing your request. We're sorry.",
      })
    }
  }
)

// Handle 404
app.use((_, res: Response) => {
  res.status(404).json({ error: 'Wrong URL' })
})
