const { Router } = require("express")
const StudentsController = require("../Controllers/StudentsController")
const studentsController = new StudentsController()
const studentsRoutes = Router()
//const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

//favoritesDrinksRoutes.use(ensureAuthenticated)
studentsRoutes.post("/", studentsController.create)
studentsRoutes.put("/:id", studentsController.update)
studentsRoutes.get("/", studentsController.show)
studentsRoutes.get("/:id", studentsController.getStudent)
studentsRoutes.delete("/:id", studentsController.delete)

module.exports = studentsRoutes 