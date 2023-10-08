import * as LoginController from "../controllers/login"
import express from "express"

const router = express.Router()

router.post("/", LoginController.login)

export default router
