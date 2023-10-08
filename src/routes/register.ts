import * as RegisterController from "../controllers/register"
import express from "express"

const router = express.Router()

router.get("/", RegisterController.getRegisteredUsers)
router.post("/", RegisterController.registerUser)

export default router