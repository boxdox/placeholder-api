/*
 * Copyright (c) 2020 MIT
 * @File: text.ts
 * @Author: boxdox
 */

import { randomNumber, titleCase } from "./utils";

// prettier-ignore
const data = ["lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore", "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud", "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo", "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate", "velit", "esse", "cillum", "eu", "fugiat", "nulla", "pariatur", "excepteur", "sint", "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia", "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde", "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque", "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo", "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta", "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit", "fugit", "consequuntur", "magni", "dolores", "eos", "ratione", "sequi", "nesciunt", "neque", "porro", "quisquam", "dolorem", "adipisci", "numquam", "eius", "modi", "tempora", "incidunt", "magnam", "aliquam", "quaerat", "minima", "nostrum", "exercitationem", "ullam", "corporis", "suscipit", "laboriosam", "aliquid", "commodi", "consequatur", "autem", "vel", "eum", "iure", "quam", "nihil", "molestiae", "illum", "quo"]

interface generalProps {
  amount?: number;
  beginWithLorem?: boolean;
}

const generateWords = ({
  amount = 3,
  beginWithLorem = false,
}: generalProps): string[] => {
  if (!beginWithLorem) {
    return [...data.sort(() => 0.5 - Math.random()).slice(0, amount)];
  } else {
    return [...data.slice(0, 3), ...data.sort(() => 0.5 - Math.random())].slice(
      0,
      amount
    );
  }
};

const generateSentences = ({
  amount = 3,
  beginWithLorem = false,
}: generalProps): string[] => {
  let sentences: string[] = [];
  for (let i: number = 0; i < amount; i++) {
    // Generate a sentence using the generateWords function
    const numberOfWords: number = randomNumber(5, 10);
    let sentence: string[] = [];
    if (beginWithLorem && i === 0) {
      sentence.push(
        ...generateWords({ amount: numberOfWords, beginWithLorem: true })
      );
    } else {
      sentence.push(...generateWords({ amount: numberOfWords }));
    }
    // Capitalize the first word
    sentence[0] = titleCase(sentence[0]);

    // Add random comma with a biased boolean generation
    const shouldAddComma: boolean = Math.random() >= 0.7;
    if (shouldAddComma) {
      // Generate a random position for comma
      const commaPosition: number = randomNumber(3, 8);
      sentence.splice(commaPosition, 0, ",");
    }

    // Add the period '.' at the end
    sentence.push(".");

    // Add this to sentence to the sentences array
    //
    // Note, joining with space causes random space
    // to appear before comma and period.
    // I am using regex to replace that, maybe I will
    // sort it out later
    sentences.push(sentence.join(" ").replace(/ +(\W)/g, "$1"));
  }
  return sentences;
};

console.log(generateSentences({ amount: 5, beginWithLorem: true }));
// const generateParagraph = (amount: number = 3): string[] => {
//   if (amount > 0) {
//     let para: string[] = [];
//     for (let i = 0; i < amount; i++) {
//       para.push(generateSentences(randomNumber(5, 8)).join(" "));
//     }
//     return para;
//   } else {
//     return [];
//   }
// };

// const generateText = (props: Text): any => {
//   const {type, amount, format} = props
//   let result: string[];
//   switch (type) {
//     case "paragraph":
//       result = generateParagraph(amount);
//     case "sentences":
//       result = generateSentences(amount);
//     case "words":
//       result = generateWords(amount);
//     default:
//       result = [];
//   }
//   return result;
//   switch (format) {
//     case "html":
//       return result.map((item) => `<p>${item}</p>`);
//     case "json":
//       return {
//         feed: result,
//         generated: text,

//       };
//     default:
//       return result;
//   }
// };

// console.log(generateText({type: "words", amount: 3, format:"json"}));

// export default generateText;
