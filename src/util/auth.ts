
import jwt, { VerifyErrors, Secret } from "jsonwebtoken"
import env from "../util/validateEnv"
import { RequestHandler } from "express"
export const generateToken = (payload: any) => {
    return jwt.sign(payload, env.TOKEN_SECRET, {
        expiresIn: "12h"
    })
}

