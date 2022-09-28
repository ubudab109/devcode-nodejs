module.exports = (app) => {
    const controllers = require("../controllers/todoitems.controller");

    app.get("/todo-items", controllers.findAll);
    app.get("/todo-items/:id", controllers.findById);
    app.delete("/todo-items/:id", controllers.remove);
    app.patch("/todo-items/:id", controllers.update);
    app.post("/todo-items", controllers.create);
}