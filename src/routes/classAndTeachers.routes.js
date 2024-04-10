const { Router } = require("express")
const ClassAndTeachersController = require("../Controllers/ClassAndTeachersController");
const classAndTeachersController = new ClassAndTeachersController()
const classAndTeachersRoutes = Router()

classAndTeachersRoutes.post("/", classAndTeachersController.create)
classAndTeachersRoutes.get("/:id", classAndTeachersController.show)
classAndTeachersRoutes.delete("/:id", classAndTeachersController.delete)

module.exports = classAndTeachersRoutes