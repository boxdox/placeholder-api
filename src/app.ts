import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();

// ---------------------
// Text API
// ---------------------
app.get("/text", (req, res) => {
  res.json({ text: "Text" });
});

// ---------------------
// Image API
// ---------------------
app.get("/image/:width(\\d+)/:height(\\d+)?/:format?", (req, res) => {
  const { width, height = width, format = "jpeg" } = req.params;
  res.status(200).json({ width, height, format });
});

// Handle 404
app.use((req, res, next) => {
  res.status(404).send({ error: "Wrong URL" });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT} ⚡`);
});
