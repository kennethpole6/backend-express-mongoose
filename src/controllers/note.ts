import { RequestHandler } from "express"
import note from "../model/note"
import createHttpError from "http-errors"
import mongoose from "mongoose"

interface Note {
    title?: string
    text?: string
}

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
        //check if the id is objectId
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        const data = await note.findById(id).exec()
        if (!data) {
            throw createHttpError(404, "Note not found")
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

//create notes
export const createNotes: RequestHandler<unknown, unknown, Note, unknown> = async (req, res, next) => {
    const title = req.body.title
    const text = req.body.text
    try {
        if (!title) {
            //no title is request in the body
            throw createHttpError(400, "Title is required")
        }
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
        if(!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        
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
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        await note.findByIdAndDelete(id).exec()

        res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}