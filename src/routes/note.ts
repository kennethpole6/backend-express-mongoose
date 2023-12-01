import * as NoteController from "../controllers/note"
import express from "express"
import { requiresAuth } from "../middleware/auth"

const router = express.Router()

router.get("/", requiresAuth, NoteController.getNotes)
router.post('/', requiresAuth, NoteController.createNotes)
router.get("/:id", requiresAuth, NoteController.getNotesId)
router.put("/:id", requiresAuth, NoteController.updateNotes)
router.delete("/:id", requiresAuth, NoteController.deleteNotes)

export default router