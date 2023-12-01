import  * as SignUpController  from "../controllers/users";
import express from "express";
import { verifyToken } from "../controllers/verifytoken";

const router = express.Router();

router.get("/", verifyToken, SignUpController.getUsers);
router.get("/:id", verifyToken, SignUpController.getUserId);
router.post("/", verifyToken, SignUpController.signUp);
router.patch("/:id", verifyToken, SignUpController.updateUser);
router.delete("/:id", verifyToken, SignUpController.deleteUsers);


export default router;