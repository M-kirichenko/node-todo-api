module.exports = (app) => {
  const todosController = require("./controllers/todos.controller.js");
  const router = require("express").Router();

  // //check if id is integer
  // router.route('/:id(\\d+)')
  // .delete(todosController.delete)
  // .patch(todosController.update);

  router
    .route("/:id")
    .get(todosController.getOne)
    .delete(todosController.delete)
    .patch(todosController.update);

  router.route("/").get(todosController.all).post(todosController.make);

  app.use("/api/todos", router);
};
