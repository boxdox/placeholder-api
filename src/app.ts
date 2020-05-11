/*
 * Copyright (c) 2020 MIT
 * @File: app.ts
 * @Author: boxdox
 */

import express, { Application, Request, Response } from "express";
import path from "path";

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
app.get("/text", (req: Request, res: Response) => {
  const { type = "paragraph", amount = 3, format = "html" } = req.query;
  res.status(200).json({ type, amount, format });
});

// ---------------------
// Image API
// ---------------------
app.get("/image", (req: Request, res: Response) => {
  res
    .status(400)
    .json({ error: "No width specified. Use something like /image/300" });
});

app.get(
  "/image/:width(\\d+)/:height(\\d+)?/:format?",
  (req: Request, res: Response) => {
    const { width, height = width, format = "jpeg" } = req.params;
    res.status(200).json({ width, height, format });
  }
);

// Handle 404
app.use((req, res, next) => {
  res.status(404).send({ error: "Wrong URL" });
});

// Initiate the server
app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ⚡`);
});
