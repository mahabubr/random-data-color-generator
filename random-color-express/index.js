import express from "express";

const app = express();

const PORT = 5000;

const generateColor = () => {
  const red = Math.floor(Math.random() * 256);
  const green = Math.floor(Math.random() * 256);
  const blue = Math.floor(Math.random() * 256);

  return `rgb(${red}, ${green}, ${blue})`;
};

const generatePalette = () => {
  const primary = generateColor();
  let secondary = generateColor();
  let accent = generateColor();

  while (Math.abs(colorDifference(primary, secondary)) < 100) {
    secondary = generateColor();
  }

  while (
    Math.abs(colorDifference(primary, accent)) < 100 ||
    Math.abs(colorDifference(secondary, accent)) < 100
  ) {
    accent = generateColor();
  }

  return { primary, secondary, accent };
};

const colorDifference = (color1, color2) => {
  const rgb1 = color1.substring(4, color1.length - 1).split(",");
  const rgb2 = color2.substring(4, color2.length - 1).split(",");

  const rDiff = parseInt(rgb1[0], 10) - parseInt(rgb2[0], 10);
  const gDiff = parseInt(rgb1[1], 10) - parseInt(rgb2[1], 10);
  const bDiff = parseInt(rgb1[2], 10) - parseInt(rgb2[2], 10);

  return Math.sqrt(rDiff * rDiff + gDiff * gDiff + bDiff * bDiff);
};

app.post("/api/random/colors", (req, res) => {
  try {
    const palette = generatePalette();

    res.status(200).send(palette);
  } catch (error) {
    res.status(400).send({ err: "Server Not Working" });
  }
});

app.listen(PORT, () => console.log("Server Running"));
