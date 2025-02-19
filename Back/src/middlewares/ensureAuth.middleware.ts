import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const ensureAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization

    if (!token) {
        return res.status(401).json({
            message: "token inválido"
        })
    }

    const splitToken = token.split(" ")[1]

    verify(splitToken, process.env.SECRET_KEY!, (error: any, decoded: any) => {
        if (error) {
            return res.status(401).json({
                message: "token inválido"
            })
        }

        res.locals.clientId = decoded.sub

        return next()
    })
}