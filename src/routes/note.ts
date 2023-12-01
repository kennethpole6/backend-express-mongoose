import * as NoteController from "../controllers/note"
import express from "express"
import { verifyToken } from "../controllers/verifytoken"

const router = express.Router()

router.get("/", verifyToken, NoteController.getNotes)
router.post('/', verifyToken, NoteController.createNotes)
router.get("/:id", verifyToken, NoteController.getNotesId)
router.put("/:id", verifyToken, NoteController.updateNotes)
router.delete("/:id", verifyToken, NoteController.deleteNotes)

export default router