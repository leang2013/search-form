const express = require("express");
const http = require("http");
const cors = require('cors');

const app = express();
app.use(cors());

const port = 3000;
const autocompleteBaseUrl =
  "http://gd.geobytes.com/AutoCompleteCity?callback=?&filter=DE&q=";

const categories = [
  { id: 12, attributes: { results: 4440, name: "IT and telecommunication", level: 0,  } },
  { id: 13, attributes: { results: 1979, name: "Finance and accounting", level: 0, } },
  { id: 15, attributes: { results: 2130, name: "Health, medical and social", level: 0, } },
  { id: 17, attributes: { results: 3262, name: "Sales and commerce", level: 0, } },
  {
    id: 18,
    attributes: { results: 2586, name: "Production, construction and trade", level: 0, },
  },
  {
    id: 19,
    attributes: {
      results: 1982,
      name: "Management / executive and strategic management",
      level: 0,
    },
  },
  { id: 21, attributes: { results: 1468, name: "Not categorized" , level: 1, } },
  { id: 22, attributes: { results: 2652, name: "Engineering / technical", level: 0, } },
  {
    id: 23,
    attributes: {
      results: 1432,
      name: "Banking, insurance and financial services",
      level: 1,
    },
  },
  {
    id: 25,
    attributes: { results: 719, name: "Purchasing, transport and logistics", level: 1, },
  },
  { id: 26, attributes: { results: 1304, name: "Marketing and advertising", level: 1, } },
  { id: 27, attributes: { results: 547, name: "Training / instruction", level: 1, } },
  { id: 39, attributes: { results: 1439, name: "Administration", level: 1, } },
  { id: 48, attributes: { results: 3440, name: "IT consulting", level: 1, } },
  { id: 49, attributes: { results: 1934, name: "Government consulting", level: 1, } },
  { id: 51, attributes: { results: 2842, name: "Textile industry", level: 1, } },
  { id: 54, attributes: { results: 986, name: "Public services administration", level: 1, } },
  { id: 1999, attributes: { results: 3636, name: "Other", level: 0, } },
];

// option A we leave the categories like this and see if they reorder them and how to match the picture or on any other criteria
// option B we nest with different levels/attribute names the `name` of the category to see how they traverse a complex object to standardize the information within it to display it

app.get("/categories", (req, res) => {
  console.log("Starting request to categories service");

  res.json(categories);
});

app.param("query", (req, res, next, query) => {
  req.params.query = query;

  next();
});

app.get("/autocomplete/city/:query", async (req, res) => {
  console.log("Starting request to autocompletion service");
  const query = req.params.query;

  const autocompletePromise = new Promise((resolve, reject) => {
    const autocompleteRequest = http.get(
      `${autocompleteBaseUrl}${query}`,
      (autocompleteResponse) => {
        autocompleteResponse.on("data", (data) => {
          console.log("Request done!");
          resolve(data.toString());
        });

        autocompleteRequest.on("error", (error) => {
          reject();
        });

        autocompleteRequest.end();
      }
    );
  });

  const result = await autocompletePromise;

  res.send(result);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
