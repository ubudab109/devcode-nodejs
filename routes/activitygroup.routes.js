module.exports = (app) => {
    const controllers = require("../controllers/activitygroup.controller");

    app.get("/activity-groups", controllers.findAll);
    app.get("/activity-groups/:id", controllers.findById);
    app.delete("/activity-groups/:id", controllers.remove);
    app.patch("/activity-groups/:id", controllers.update);
    app.post("/activity-groups", controllers.create);
}