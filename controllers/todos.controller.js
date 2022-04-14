const db = require("../models");
const todos = db.todos;

exports.make = (req, res) => {
  const { body } = req;

  if (!body["text"]) {
    res.status(422);
    res.send({ answer: "Text is required" });
  }

  todos
    .create(req.body)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(422).send({ answer: "Invalid params" });
    });
};

exports.delete = (req, res) => {
  const { id } = req.params;

  if (!id.trim()) res.status(422).send({ answer: "incorrect id!" });

  todos
    .destroy({
      where: { id },
    })
    .then((affected) => {
      if (affected > 0) {
        res.send({
          answer: `Todo with id:${id} was successfully deleted!`,
        });
      } else {
        res.status(404);
        res.send({ answer: `Todo with id:${id} wasn't found!` });
      }
    })
    .catch((err) => {
      res.status(422).send({ answer: "Invalid params" });
    });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { body } = req;

  if (!id.trim()) res.status(422).send({ answer: "incorrect id!" });

  if (!body.hasOwnProperty("text") && !body.hasOwnProperty("isCheck")) {
    res.status(422).send({ answer: "No params were send!" });
  } else {
    const { text, isCheck } = body;
    let cols = {};

    if (text) cols = { text };

    if (isCheck !== null) cols = { ...cols, isCheck };

    if (Object.keys(cols).length) {
      todos
        .update(cols, { where: { id } })
        .then((affected) => {
          if (affected > 0) {
            res.send({
              answer: `Todo with id:${id} was successfully updated!`,
            });
          } else {
            res.status(404).send({
              answer: `Todo with id:${id} wasn't found!`,
            });
          }
        })
        .catch((err) => {
          res.status(422).send({ answer: "Invalid params" });
        });
    } else {
      res.send({ answer: `None of params could be empty!` });
    }
  }
};

exports.getOne = (req, res) => {
  const { id } = req.params;

  if (!id.trim()) res.status(422).send({ answer: "incorrect id!" });
  todos
    .findByPk(id)
    .then((found) => {
      if (found) res.send(found);
      else {
        res.status(404).send({
          answer: `Todo with id:${id} wasn't found!`,
        });
      }
    })
    .catch((err) => {
      res.status(422).send({ answer: "Invalid params" });
    });
};

exports.all = (req, res) => {
  todos.findAll().then((data) => res.send(data));
};
