// Create web server to handle comments
// 1. Create a web server
// 2. Handle a route for GET /comments
//  - Read all comments from file
//  - Write all comments as JSON response
// 3. Handle a route for POST /comments
//  - Read body from request
//  - Convert body to JSON
//  - Read all comments from file
//  - Add new comment to array
//  - Write all comments to file
//  - Write success message as JSON response
// 4. Start server on port 4001
// 5. Test routes using Postman
const express = require("express");
const fs = require("fs");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 4001;

app.use(bodyParser.json());
app.use(cors());

app.get("/comments", (req, res) => {
  fs.readFile("./comments.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.json({ message: "Error reading file" });
    } else {
      console.log(data);
      res.json(JSON.parse(data));
    }
  });
});

app.post("/comments", (req, res) => {
  fs.readFile("./comments.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      res.json({ message: "Error reading file" });
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile("./comments.json", JSON.stringify(comments), (err) => {
        if (err) {
          console.log(err);
          res.json({ message: "Error writing file" });
        } else {
          res.json({ message: "Comment saved" });
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
