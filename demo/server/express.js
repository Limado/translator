const express = require("express");
const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");
var app = express();

const port = 3000;
app.get("/*", (req, res) => {
  try {
    console.log("Received: " + req.path);
    let realPath = path.join(__dirname, "../dist/" + req.path);
    console.log("Sent: " + realPath);
    res.sendFile(realPath);
  } catch (ex) {
    console.log(exception);
    res.send({ error: true, message: "Invalid path" });
  }
});

/** Server https */
var server = http.createServer(app);
server.listen(port, () => {
  console.log("server starting on port : " + port);
});
