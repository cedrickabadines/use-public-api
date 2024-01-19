const express = require("express");
const router = express.Router();
const axios = require("axios");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.get("/", async (req, res) => {
  let jokeType = req.query.jokeType;
  console.log(`Joke type is: ${jokeType}`);
  try {
    const response = await axios.get(`https://v2.jokeapi.dev/joke/${jokeType}`);
    res.render("index.ejs", {
      category: response.data.category,
      setup: response.data.setup,
      delivery: response.data.delivery,
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => console.log("Listening to port: " + PORT));
