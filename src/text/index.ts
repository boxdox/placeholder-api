/*
 * Copyright (c) 2021 MIT
 * @File: text.ts
 * @Author: boxdox
 */

import { randomNumber, titleCase } from '../utils/utils'
import data from './wordList'
import { TextFormat, TextType, IGenerateTextReturn } from '../utils/types'

interface generalProps {
  amount?: number
  beginWithLorem?: boolean
}

const generateWords = ({
  amount = 3,
  beginWithLorem = false,
}: generalProps): string[] => {
  // Create a new array (using spread), sort it using a randomizer function,
  // slice the required amount.
  if (!beginWithLorem) {
    return [...data.sort(() => 0.5 - Math.random()).slice(0, amount)]
  }
  // If we want to begin with lorem ipsum, grab the first three words,
  // create and sort a new array and slice the required amount.
  else {
    return [...data.slice(0, 3), ...data.sort(() => 0.5 - Math.random())].slice(
      0,
      amount
    )
  }
}

const generateSentences = ({
  amount = 3,
  beginWithLorem = false,
}: generalProps): string[] => {
  let sentences: string[] = []
  for (let i: number = 0; i < amount; i++) {
    // Generate a sentence using the generateWords function
    const numberOfWords: number = randomNumber(5, 10)
    let sentence: string[] = []
    // If specified, first sentence should begin with Lorem Ipsum.
    if (beginWithLorem && i === 0) {
      sentence.push(
        ...generateWords({ amount: numberOfWords, beginWithLorem: true })
      )
    } else {
      sentence.push(...generateWords({ amount: numberOfWords }))
    }
    // Capitalize the first word
    sentence[0] = titleCase(sentence[0])

    // Add random comma with a biased boolean generation
    const shouldAddComma: boolean = Math.random() >= 0.7
    if (shouldAddComma) {
      // Generate a random position for comma between 2 and length of sentence
      const commaPosition: number = randomNumber(3, numberOfWords)
      sentence.splice(commaPosition, 0, ',')
    }

    // Add the period '.' at the end
    sentence.push('.')

    // Add this to sentence to the sentences array
    //
    // Note, joining with space causes random space to appear before
    // comma and period. I am using regex to replace that, maybe I
    // will sort it out later
    sentences.push(sentence.join(' ').replace(/ +(\W)/g, '$1'))
  }
  return sentences
}

const generateParagraph = (amount: number = 3): string[] => {
  let paragraphs: string[] = []
  for (let i: number = 0; i < amount; i++) {
    const numberOfSentences = randomNumber(5, 10)
    // First paragraph's first sentence should begin with Lorem
    if (i === 0) {
      const paragraph = generateSentences({
        amount: numberOfSentences,
        beginWithLorem: true,
      })
      paragraphs.push(paragraph.join(' '))
    } else {
      const paragraph = generateSentences({ amount: numberOfSentences })
      paragraphs.push(paragraph.join(' '))
    }
  }
  return paragraphs
}
interface IGenerateText {
  amount?: number
  type: TextType
  format: TextFormat
}

const generateText = ({
  amount = 3,
  type,
  format,
}: IGenerateText): IGenerateTextReturn => {
  let result
  switch (type) {
    case 'word':
      result = generateWords({ amount })
      break
    case 'sentence':
      result = generateSentences({ amount })
      break
    case 'paragraph':
      result = generateParagraph(amount)
      break
    default:
      throw new Error()
  }

  switch (format) {
    case 'raw':
      return result
    case 'html':
      switch (type) {
        case 'word':
          return `<p>${result.join(' ')}</p>`
        case 'sentence':
          return `<p>${result.join(' ')}</p>`
        case 'paragraph':
          return result
            .map(item => {
              return `<p>${item}</p>\n`
            })
            .join('')
            .trim()
      }
    case 'json':
      const text: string =
        type === 'paragraph' ? result.join('\n') : result.join(' ')
      const wordCount: number =
        type === 'word' ? amount : text.replace(/[.,\\n]/, '').split(' ').length
      const paraCount: number = result.length
      return {
        text,
        count:
          type === 'paragraph'
            ? `${paraCount} paragraphs, ${wordCount} words generated`
            : `${wordCount} words generated`,
        credits: 'https://github.com/boxdox/placeholder-api',
        support: 'https://www.buymeacoffee.com/boxdox',
      }
    default:
      throw new Error()
  }
}

export default generateText
