import "dotenv/config"
import express, {  Request, Response, NextFunction } from "express"
import notesRoutes from "./routes/note"
import loginRoutes from "./routes/login"
import userRoutes from "./routes/user"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors"
import cors from "cors"

const app = express()
app.use(cors())
app.use(morgan("dev"))

//accept json request and response
app.use(express.json())

//parse request of content-type
app.use(express.urlencoded({ extended: true }))

//routes
app.use("/api/notes", notesRoutes)
app.use("/api/login", loginRoutes)
app.use("/api/user", userRoutes)


//if no routes is defined
app.use((req, res, next) => {
    next(createHttpError(404, "Endpoint not found"))
})

//error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app