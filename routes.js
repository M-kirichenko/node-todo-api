module.exports = app => {
  const todosController = require("./controllers/todos.controller.js")
  const router = require('express').Router();

  router.route('/:id(\\d+)')
  .delete(todosController.delete)
  // .patch(todosController.update);

  router.route('/')
  .get(todosController.all)
  .post(todosController.make);
  
  app.use('/api/todos', router);
}