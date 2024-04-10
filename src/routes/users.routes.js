const { Router } = require("express")
const usersRoutes = Router()
const UsersController = require("../Controllers/UsersController")
const usersController = new UsersController()

usersRoutes.post("/", usersController.create)
usersRoutes.put("/:id", usersController.update)
usersRoutes.get("/", usersController.show)
usersRoutes.get("/:id", usersController.getUser)
usersRoutes.delete("/:id", usersController.delete)

module.exports = usersRoutes
