import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const ensureAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
   console.log("ue")
    const token = req.headers.authorization
    console.log("Token recebido no middleware:", token);


    if (!token) {
        return res.status(401).json({
            message: "Token Inválido"
        })
    }

    const splitToken = token.split(" ")[1]

    verify(splitToken, process.env.SECRET_KEY!, (error: any, decoded: any) => {
        if (error) {
            return res.status(401).json({
                message: "Token Inválido"
            })
        }

        res.locals.clientId = decoded.sub

        return next()
    })
}