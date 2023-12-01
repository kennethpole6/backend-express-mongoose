import { RequestHandler } from "express";

export const logoutUser: RequestHandler = async (req, res, next) => {
    req.session.destroy((error) => {
        if (error) {
            next(error)
        } else {
            res.sendStatus(200)
        }
    });
}