/*
 * Copyright (c) 2020 MIT
 * @File: image.ts
 * @Author: boxdox
 */

import sharp from "sharp";
import colorList, { Color } from "./colors";

enum Format {
  "jpeg",
  "png",
  "bmp",
}
interface imageArgs {
  width: number;
  height?: number;
  format?: Format;
  text?: string;
}

const generateImage = (args: imageArgs) => {
  const {
    width,
    height = width,
    format = "jpeg",
    text = `${width} x ${height}`,
  } = args;

  //
  // Generate Image
  //

  // Select color from random
  const index: number = Math.trunc(Math.random() * colorList.length);
  const { color, backgroundColor }: Color = colorList[index];

  // Calculate font size using width of text
  const fontSize: number =
    width >= height
      ? width / height >= 10
        ? width * 0.06
        : width * 0.075
      : width * 0.15;

  // Create a svg buffer to composite on the image
  const Text: Buffer = Buffer.from(`
  <svg width="${width}" height="${height}">
    <text x="${width / 2}" y="${
    height / 2 + fontSize / 3
  }" fill="${color}" font-family="sans-serif" font-size="${fontSize}" text-anchor="middle">
      ${text.trim()}
    </text>
  </svg>
`);

  sharp({
    create: {
      width,
      height,
      channels: 4,
      background: backgroundColor,
    },
  })
    .composite([{ input: Text, gravity: "center" }])
    .toFormat("jpeg")
    .toFile("test.jpg");
};

generateImage({ width: 1000, height: 400 });
