/*
 * Copyright (c) 2020 MIT
 * @File: app.ts
 * @Author: boxdox
 */

import express, { Application, Request, Response } from "express";
import path from "path";
import generateText from "./text";
import generateImage from "./image";
import { config } from "dotenv";

// Init dot env file
config();

// Get port from file
const PORT = process.env.PORT || 3000;

const app: Application = express();

// ---------------------
// HomePage
// ---------------------
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ---------------------
// Text API
// ---------------------
app.get("/text", async (req: Request, res: Response) => {
  // const { type = "paragraph", amount = 3, format = "html" }:generateTextProps = req.query;
  const type: any = req.query.type || "paragraph";
  const amount: any = req.query.amount || 3;
  const format: any = req.query.format || "html";
  const result = await generateText({ amount, type, format });
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(400).send(
      `Wrong type specified.
         Check if:
         'type' is one of 'word', 'sentence' or 'paragraph'
         or 
         'format' is one of 'raw', 'html' or 'json'`
    );
  }
});

// ---------------------
// Image API
// ---------------------

// This route matches if there is no width specified
app.get("/image", (req: Request, res: Response) => {
  res
    .status(400)
    .json({ error: "No width specified. Use something like /image/300" });
});

app.get(
  "/image/:width(\\d+)/:height(\\d+)?/:format?",
  async (req: Request, res: Response) => {
    // const { width, height = width, format = "jpeg" } = req.params;
    const width = parseInt(req.params.width);
    const height = parseInt(req.params.height) || width;
    const format: any = req.params.format || "jpeg";
    const text: any = req.query.text;
    console.log(width, height, format);
    if (!["jpeg", "png", "bmp"].includes(format)) {
      return res
        .status(400)
        .send(
          "Wrong format specified. 'format' should be one of 'jpeg', 'png' or 'bmp'"
        );
    }
    if (width <= 0 || height <= 0) {
      return res.status(400).send("What do you mean by < 0 width or height?");
    }
    if (width > 4000 || height > 4000) {
      return res.status(400).send("Sorry, that's way too large to process :)");
    }
    const image = await generateImage({ width, height, format, text })
      .then((data) => data)
      .catch((err) => console.log(err));
    res.status(200).contentType(`image/${format}`).send(image);
  }
);

// Handle 404
app.use((req: Request, res: Response) => {
  res.status(404).send({ error: "Wrong URL" });
});

// Initiate the server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ⚡`);
});
