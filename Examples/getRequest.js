const express = require("express");
const app = express();

const courses = [
  { id: 1, name: "ReactJS for Developers", category: "Web development" },
  {
    id: 2,
    name: "Machine Learning for Everyone",
    category: "Machine Learning",
  },
  { id: 3, name: "NodeJS for MasterMinds", category: "Web development" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) res.status(404).send("Course Not found!");
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port} ....`));
