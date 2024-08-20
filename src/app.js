import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import extractRoute from "./routes/extract.js";

import { syncDatabase } from "./models/index.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "public")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

syncDatabase();

app.get("/", (req, res) => {
  res.send("Home");
});

app.use("/extract", extractRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
