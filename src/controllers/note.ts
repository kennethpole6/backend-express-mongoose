import { RequestHandler,  } from "express"
import note from "../model/note"
//get notes
 export const getNotes: RequestHandler = async (req, res, next) => {
    try { 
    const notes = await note.find().exec()
    res.status(200).json(notes)
    } catch (error) {
        next(error)
    }
}

//get notes by id
export const getNotesId: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {  
        const data = await note.findById(id).exec()
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}
//create notes
export const createNotes: RequestHandler = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text
    try {
        const newNote = await note.create({ title, text })
        res.status(201).json(newNote)
    } catch (error) {
        next(error)
    }
}

//update notes
export const updateNotes: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        const updatedNote = await note.findByIdAndUpdate(id, req.body, { new: true }).exec()
        res.status(200).json(updatedNote)
    } catch (error) {
        next(error)
    }
}

//delete notes
export const deleteNotes: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        await note.findByIdAndDelete(id).exec()
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}