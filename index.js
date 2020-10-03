const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());

const courses = [
  {
    id: 1,
    name: "ReactJS for Developers",
    category: "Web development",
    certification: true,
    fee: 120,
  },
  {
    id: 2,
    name: "Github for Everyone",
    category: "Git VCS",
    certification: false,
    fee: 10,
  },
  {
    id: 3,
    name: "NodeJS for MasterMinds",
    category: "Web development",
    certification: true,
    fee: 320,
  },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.post("/api/courses", (req, res) => {
  const { error } = validateCourse(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name,
    category: req.body.category,
    certification: req.body.certification,
    fee: req.body.fee,
  };

  courses.push(course);
  res.send(course);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Not Found!");

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  course.name = req.body.name;
  course.category = req.body.category;
  course.certification = req.body.certification;
  course.fee = req.body.fee;

  res.send(course);
});

app.delete("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course Not Found!");

  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course) return res.status(404).send("Course Not Found!");
  res.send(course);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port} ....`));

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    category: Joi.string().min(5).required(),
    certification: Joi.boolean().required(),
    fee: Joi.number().greater(0).required(),
  });

  return schema.validate(course);
};
