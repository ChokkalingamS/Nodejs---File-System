import express from "express";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config(); // It returns all the key in process.env

const app = express();
const PORT = process.env.PORT;

// Homepage
app.get("/", (request, response) => {
  response.send({ msg: "Nodejs File System" });
});

// Creating files
app.get("/createfile", (request, response) => {
  let date = new Date();
  date = date.toISOString().replace(/\:/g, "-");
  console.log(date);
  fs.writeFile(`Files/${date}.txt`, date, () => {
    console.log("File created");
  });
  response.send({ msg: "File Created" });
});

// Geting Files
app.get("/getfiles", (request, response) => {
  fs.readdir("Files", (err, files) => {
    if (err) {
      console.log(err);
      return response.status(404).send(err);
    } else {
      return response.send(files);
    }
  });
});

// Server Port
app.listen(PORT, () => {
  console.log("Server Started in", PORT);
});
