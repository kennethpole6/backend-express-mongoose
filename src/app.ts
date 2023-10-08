import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import notesRoutes from "./routes/note"
import registerRoutes from "./routes/register"
import loginRoutes from "./routes/login"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors"
import cors from "cors"
// import { checkBearerAuthorization } from "./auth/auth"

const app = express()

app.use(cors())

app.use(morgan("dev"))

// app.use(checkBearerAuthorization)

//accept json request and response
app.use(express.json())

//parse request of content-type
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/api/notes", notesRoutes)
app.use("/api/users", userRoutes)
app.use("/api/register", registerRoutes)
app.use("/api/login", loginRoutes)

//if no routes is defined
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

//error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    let statusCode = 500
    let errorMessage = "An unknown error occurred"
    if (isHttpError(error)) {
        statusCode = error.status
        errorMessage = error.message
    }
    res.status(statusCode).json({ error: errorMessage })
})

export default app