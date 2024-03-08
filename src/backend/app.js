import express from "express";
import path from "path";
import mealsRouter from "./api/meals.js";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const router = express.Router();

const buildPath = path.join(__dirname, "../../dist");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);

app.get("/future-meals", (req, res) => {
  res.send("How many meals are there");
});

app.get("/past-meals", (req, res) => {
  res.send("How many meals are finished");
});

app.get("/all-meals", (req, res) => {
  res.send("Total number of meals");
});

app.get("/first-meal", (req, res) => {
  res.send("First meal");
});

app.get("/last-meal", (req, res) => {
  res.send("Last meal");
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

export default app;
