import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Usermodel from "../model/user";
import { compare } from "bcrypt";
import { generateToken } from "../util/auth";
import { UserRequestBody } from "./users";

export const login: RequestHandler<unknown, unknown, UserRequestBody, unknown> = async (req, res, next) => {
    const { username, password } = req.body

    try {
        if (!username) {
            throw createHttpError(400, "Email is required")
        }
        const user = await Usermodel.findOne({ username })
        //check if the user is not found
        if(!user){
            throw createHttpError(400, "User not found")
        }

        const hashPassword = await compare(password, user.password)
        
        if(!hashPassword){
            throw createHttpError(400, "Invalid password.")
        }
        
        const payload = {
            id: user?.id,
            email: user?.email,
            username: user?.username
        }
        //generate a token if the user is found
        const accessToken = generateToken(payload)

        //setting a cookie to the browser
        res.cookie("token", accessToken, {
            httpOnly: true,
            maxAge: 1000 * 60 * 15,
            signed: true,
        })
        return res.status(200).json({ message: "Login successful" })
    } catch (error) {
        next(error)
    }
}