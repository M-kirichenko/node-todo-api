const db = require("../models");
const Todos = db.todos;

exports.make = (req, res) => {
  if(!req.body.hasOwnProperty("text")) {
    res.status(422);
    res.send({answer: "No data was send"});
  }

  Todos.create(req.body).then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(422).send({answer: "Invalid params"});
    console.log(err);
  });
}

exports.all = (req, res) => {
  Todos.findAll().then(data => res.send(data));
}

exports.delete = (req, res) => {
  const {id} = req.params;

  Todos.destroy({
    where: {id}
  })
  .then(affected => {
    if(affected > 0) {
      res.send({
        answer: `Task with id:${id} was successfully deleted!`
      });
    } else {
      res.status(404);
      res.send({answer: `Task with id:${id} wasn't found!`});
    }
  })
  .catch(err => {
    res.status(422).send({answer: "Invalid params"});
    console.log(err);
  });
}

exports.update = (req, res) => {
  const {id} = req.params;
  const {body} = req;
  const {text, isCheck} = body;
  let cols = {};

  if(text) cols = {text};

  if(isCheck!==undefined) cols = {...cols, isCheck};

  if(
    !cols.hasOwnProperty("text") && 
    !cols.hasOwnProperty("isCheck")
    ) {
    res.status(422).send({answer: "No params were send!"});
  } else{
    Todos.update(
      cols,
      {where: {id}}
    )
    .then(affected => {
      if(affected > 0) {
          res.send({answer: `Task with id:${id} was successfully updated!`});
      } else {
        res.status(404).send({
          answer: `Task with id:${id} wasn't found!`
        });
      }
    })
    .catch(err => {
      res.status(422).send({answer: "Invalid params"});
      console.log(err);
    });
  }
}