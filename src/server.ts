
import mongoose from "mongoose"
import "dotenv/config"
import env from "./util/validateEnv"
import app from "./app"
const port = env.PORT

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
    console.log("Connected to MongoDB")
    app.listen(port, () => {
    console.log("Server running on port " + port)
})
}).catch((err) => {
    console.error(err)
})

