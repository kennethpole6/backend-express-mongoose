import "dotenv/config"
import express, {  Request, Response, NextFunction } from "express"
import notesRoutes from "./routes/note"
import loginRoutes from "./routes/login"
import userRoutes from "./routes/user"
import logoutRoutes from "./routes/logout"
import morgan from "morgan"
import createHttpError, { isHttpError } from "http-errors"
import cors from "cors"
import session from "express-session"
import env from "./util/validateEnv"
import MongoStore from "connect-mongo"
const app = express()
app.use(cors())
app.use(morgan("dev"))

//accept json request and response
app.use(express.json())

//connect session to mongodb
app.use(session({
    secret: env.TOKEN_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 15
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    }),
}))

//parse request of content-type
app.use(express.urlencoded({ extended: true }))



//routes
app.use("/api/login", loginRoutes)
app.use("/api/logout", logoutRoutes)
app.use("/api/notes", notesRoutes)
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