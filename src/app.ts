import "dotenv/config"
import express, { NextFunction, Request, Response } from "express"
import notesRoutes from "./routes/note"
import morgan from "morgan"
const app = express()

app.use(morgan("dev"))

//accept json request and response
app.use(express.json())

app.use("/api/notes", notesRoutes)

//if no routes is defined
app.use((req, res, next) => {
    next(Error("Endpoint not found"))
})

//error handler
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error)
    if(error instanceof Error) {
        res.status(500).json({ error: error.message })
    }
})

export default app