import { RequestHandler } from "express";
import userModel from "../model/user"
import { hashSync } from "bcrypt";
import createHttpError from "http-errors";
import mongoose from "mongoose";

export type UserRequestBody = {
    email: string
    username: string
    password: string
}
//sign up users
export const signUp: RequestHandler<unknown, unknown, UserRequestBody, unknown> = async  (req, res, next) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    try {
        if(!email || !username || !password) {
            throw createHttpError(400, "All fields are required")
        }
        //check if the username exists
        const existedUser = await userModel.findOne({ username }).exec()

        if(existedUser) {
            throw createHttpError(409, "Username already in use.")
        }
        //check if the username exists
        const existedEmail = await userModel.findOne({ email }).exec()

        if(existedEmail) {
            throw createHttpError(409, "Email already in use.")
        }
            
        const hashPasword = hashSync(password, 8)
        const user = await userModel.create({ username, email, password: hashPasword })

        res.status(201).json(user)
    } catch (error) {
        next(error)        
    }
}
//get users
export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await userModel.find().exec()
        res.status(200).json(users)
    } catch (error) {
        next(error)
    }
}
//get user by id
export const getUserId: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        const data = await userModel.findById(id).exec()
        if (!data) {
            throw createHttpError(404, "User not found")
        }
        res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}

//update user
export const updateUser: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        //update the user 
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true }).exec()
        res.status(200).json(updatedUser)
    } catch (error) {
        next(error)
    }
}

//delete users
export const deleteUsers: RequestHandler = async (req, res, next) => {
    const id = req.params.id
    try {
        if (!mongoose.isValidObjectId(id)) {
            throw createHttpError(400, "Invalid Id")
        }
        await userModel.findByIdAndDelete(id).exec()
        res.status(200).json({ message: "Deleted Successfully" })
    } catch (error) {
        next(error)
    }
}
