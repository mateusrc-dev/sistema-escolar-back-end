const { Router } = require("express")
const ClassController = require("../Controllers/ClassController")
const classController = new ClassController()
const classRoutes = Router()

classRoutes.post("/", classController.create)
classRoutes.put("/:id", classController.update)
classRoutes.get("/", classController.show)
classRoutes.get("/:id", classController.getClass)
classRoutes.delete("/:id", classController.delete)

module.exports = classRoutes