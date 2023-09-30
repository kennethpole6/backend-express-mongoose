import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import notesRoutes from "./routes/note"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors"
const app = express()

app.use(morgan("dev"))

//accept json request and response
app.use(express.json())

app.use("/api/notes", notesRoutes)

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