const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(["Panda", "Tidbits", "Candy", "Didu", "Sujata"]);
});

app.get("/api/courses/:courseID", (req, res) => {
  res.send(req.params.courseID);
});

app.get("/api/posts/:year/:month", (req, res) => {
  res.send(req.params);
});

// URL - http://localhost:5000/api/comments?latest=time
app.get("/api/comments", (req, res) => {
  res.send(req.query);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening to port ${port} ...`));
