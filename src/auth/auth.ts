import { Request, Response, NextFunction, RequestHandler } from "express";
import createHttpError from "http-errors";
// import { validateToken } from "../util/auth";
import env from "../util/validateEnv";
import jwt from "jsonwebtoken";

export const checkBearerAuthorization: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    const bearerToken = req.headers.authorization

    const validate = await jwt.verify(bearerToken as string, env.TOKEN_SECRET)
    console.log(validate, "validate")

    if (!validate) {
        return next(createHttpError(401, "Unauthorized"));
    }

    // Continue with the request processing
    next();
};