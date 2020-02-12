const express = require("express");
const app = express();
const path = require("path");

let build = path.join(__dirname, "lol-what-react", "build");
console.log(build);
// viewed at http://localhost:8080
app.get("/", function(req, res) {
  res.sendFile(path.join(build, "index.html"));
});

app.use("/", express.static(build));

app.listen(8080);
