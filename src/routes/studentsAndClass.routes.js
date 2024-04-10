const { Router } = require("express")
const StudentsAndClassController = require("../Controllers/StudentsClassController");
const studentsAndClassController = new StudentsAndClassController()
const studentsAndClassRoutes = Router()

studentsAndClassRoutes.post("/", studentsAndClassController.create)
studentsAndClassRoutes.get("/:id", studentsAndClassController.show)
studentsAndClassRoutes.delete("/:id", studentsAndClassController.delete)

module.exports = studentsAndClassRoutes