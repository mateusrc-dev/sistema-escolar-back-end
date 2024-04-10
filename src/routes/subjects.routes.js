const { Router } = require("express")
const SubjectsController = require("../Controllers/SubjectsController")
const subjectsController = new SubjectsController()
const subjectsRoutes = Router()

subjectsRoutes.post("/", subjectsController.create)
subjectsRoutes.put("/:id", subjectsController.update)
subjectsRoutes.get("/", subjectsController.show)
subjectsRoutes.get("/:id", subjectsController.getSubject)
subjectsRoutes.delete("/:id", subjectsController.delete)

module.exports = subjectsRoutes