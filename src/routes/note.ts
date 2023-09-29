import * as NoteController from "../controllers/note"
import express from "express"

const router = express.Router()

router.get("/", NoteController.getNotes)
router.post('/', NoteController.createNotes)
router.get("/:id", NoteController.getNotesId)
router.put("/:id", NoteController.updateNotes)
router.delete("/:id", NoteController.deleteNotes)

export default router