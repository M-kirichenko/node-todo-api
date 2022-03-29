module.exports = (sequelize, Sequelize) =>{
 const todos =  sequelize.define("todos", {
  text: {
    type: Sequelize.STRING
  },
  isCheck: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
 });
 
 return todos;
}