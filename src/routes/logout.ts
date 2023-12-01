import * as LogoutController from "../controllers/logout"
import express from "express"

const router = express.Router()

router.post("/", LogoutController.logoutUser)

export default router