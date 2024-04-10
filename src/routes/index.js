const { Router } = require("express")
const sessionsRouter = require("./sessions.routes")
const usersRouter = require("./users.routes")
const teachersRouter = require("./teachers.routes")
const studentsRouter = require("./students.routes")
const classRouter = require("./class.routes")
const subjectsRouter = require("./subjects.routes")
const classAndTeachersRouter = require("./classAndTeachers.routes")
const studentsAndClassRouter = require("./studentsAndClass.routes")

const routes = Router()

routes.use("/users", usersRouter)
routes.use("/sessions", sessionsRouter)
routes.use("/teachers", teachersRouter)
routes.use("/students", studentsRouter)
routes.use("/class", classRouter)
routes.use("/subjects", subjectsRouter)
routes.use("/classAndTeachers", classAndTeachersRouter)
routes.use("/studentsAndClass", studentsAndClassRouter)

module.exports = routes