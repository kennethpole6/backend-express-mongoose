import { RequestHandler } from "express";
import createHttpError from "http-errors";
import Usermodel from "../model/user";
import { compare } from "bcrypt";
import { generateToken } from "../util/auth";
import { UserRequestBody } from "./users";

export const login: RequestHandler<unknown, unknown, UserRequestBody, unknown> = async (req, res, next) => {
    const { username, password } = req.body

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters missing")
        }
        const user = await Usermodel.findOne({ username })
        //check if the user is not found
        if(!user){
            throw createHttpError(400, "User not found")
        }

        const hashPassword = await compare(password, user.password)
        
        if(!hashPassword){
            throw createHttpError(400, "Invalid credentials.")
        }
        
        // const payload = {
        //     id: user?.id,
        //     email: user?.email,
        //     username: user?.username
        // }
        //setting a cookie in the browser
        // const accessToken = generateToken(payload)
        // res.cookie("token", accessToken, {
        //     httpOnly: true,
        //     maxAge: 1000 * 60 * 15,
        //     signed: true,
        // })

        //setting a cookie in session
        req.session.userId = user?._id
        return res.status(200).json({ message: "Login successful" })
    } catch (error) {
        next(error)
    }
}