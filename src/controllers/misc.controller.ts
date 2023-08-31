import { NextFunction, Request, Response } from "express";
import { hashPassword } from "../utils/encrypt-helper";

export const generateHashGet = async (req:Request, res:Response, next: NextFunction) => {
    const {text} = req.params
    try {
        const hash = await hashPassword(text)
        return res.status(200).send(hash)
    } catch (error) {
        next(error)
    }
}