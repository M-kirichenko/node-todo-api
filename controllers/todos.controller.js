const db = require("../models");

const Todos = db.todos;

exports.make = (req, res) => {
  const {text, isCheck = false} = req.body;
  const todo = {text, isCheck};
  Todos.create(todo).then(data => {
    res.send(data);
  })
}

exports.all = (req, res) => {
  Todos.findAll().then(data => {
    if(data.length) res.send(data);
    else res.status("204").send()
  });
}

exports.delete = (req, res) => {
  const {params} = req;
  const ans = {};
  
  if (params.hasOwnProperty("id") && parseInt(params.id)) {
    const {id} = params;
    
    Todos.findByPk(id).then(found => {
      if(found) {
        Todos.destroy({
          where: {id}
        });
        ans.answer = `Task: ${found.text} was successfully deleted`;
      } else {
        res.status("404");
        ans.answer = `Task with id: ${id} not found`
      }
      res.send(ans);
    });
  } else {
    ans.answer = "Invalid argument";
    res.status("422").send(ans);
  }
}