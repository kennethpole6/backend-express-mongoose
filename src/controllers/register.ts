import { RequestHandler } from "express";
import createHttpError from "http-errors";
import registerModel from "../model/register";
import { hashSync } from "bcrypt";

export const getRegisteredUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await registerModel.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

export const registerUser: RequestHandler = (req, res, next) => {
    const { email, password, role } = req.body

    try {
        if (!email) {
            throw createHttpError(400, "Email is required")
        }
        const hashPassword = hashSync(password, 12)
        const user = registerModel.create({ email, password: hashPassword, role })
        res.status(201).json(user)
    } catch (error) {
        next(error)
    }
}