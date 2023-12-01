import  * as SignUpController  from "../controllers/users";
import express from "express";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/", requiresAuth, SignUpController.getUsers);
router.get("/:id", requiresAuth, SignUpController.getUserId);
router.post("/", requiresAuth, SignUpController.signUp);
router.patch("/:id", requiresAuth, SignUpController.updateUser);
router.delete("/:id", requiresAuth, SignUpController.deleteUsers);


export default router;