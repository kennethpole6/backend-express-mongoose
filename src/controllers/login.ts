import { RequestHandler } from "express";
import createHttpError from "http-errors";
import RegisterModel from "../model/register";
import { compare } from "bcrypt";
import { generateToken } from "../util/auth";
export const login: RequestHandler = async (req, res, next) => {
    const { email, password } = req.body

    try {
        if (!email) {
            throw createHttpError(400, "Email is required")
        }
        const user = await RegisterModel.findOne({ email })
        const hashPassword = await compare(password, `${user?.password}`)

        if(!hashPassword){
            throw createHttpError(400, "Invalid username or password.")
        }
        
        const payload = {
            id: user?.id,
            email: user?.email,
            role: user?.role,
        }
        const accessToken = generateToken(payload)
        return res.status(200).json({
            accessToken
        })
    } catch (error) {
        next(error)
    }
}