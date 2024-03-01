import express from "express";

const app = express();
const PORT = 5000;

const generateRandom = (data) => {
  if (data.length === 0) {
    throw new Error("No more unique data available");
  }
  const randomData = data[Math.floor(Math.random() * data.length)];

  return randomData;
};

const data = [
  {
    name: "name 1",
    email: "email 1",
    number: 1,
  },
  {
    name: "name 2",
    email: "email 2",
    number: 2,
  },
  {
    name: "name 3",
    email: "email 3",
    number: 3,
  },
  {
    name: "name 4",
    email: "email 4",
    number: 4,
  },
  {
    name: "name 5",
    email: "email 5",
    number: 5,
  },
];

app.post("/api/random/data", (req, res, next) => {
  try {
    const randomData = generateRandom(data);
    res.status(200).send(randomData);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log(`Server Running on Port ${PORT}`));
