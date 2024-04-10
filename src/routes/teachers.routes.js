const { Router } = require("express")
const TeachersController = require("../Controllers/TeachersController")
const teachersController = new TeachersController()
const teachersRoutes = Router()
// const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

// teachersRoutes.use(ensureAuthenticated)
teachersRoutes.post("/", teachersController.create)
teachersRoutes.put("/:id", teachersController.update)
teachersRoutes.get("/", teachersController.show)
teachersRoutes.get("/:id", teachersController.getTeacher)
teachersRoutes.delete("/:id", teachersController.delete)

module.exports = teachersRoutes 