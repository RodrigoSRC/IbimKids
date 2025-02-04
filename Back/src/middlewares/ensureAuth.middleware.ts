import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

export const ensureAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization
    console.log(req.headers.authorization + "é isso kray")
    // console.log(req)
    

    if (!token) {
        return res.status(401).json({
            message: "token inválido 1"
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

// import { NextFunction, Request, Response } from "express";
// import { verify } from "jsonwebtoken";

// export const ensureAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
//     console.log("authmiddle")
//     const token = req.headers.authorization
//     console.log(token)
//     console.log("Token recebido no middleware:", token);


//     if (!token) {
//         return res.status(401).json({
//             message: "Token Inválido"
//         })
//     }

//     const splitToken = token.split(" ")[1]

//     verify(splitToken, process.env.SECRET_KEY!, (error: any, decoded: any) => {
//         if (error) {
//             return res.status(401).json({
//                 message: "Token Inválido"
//             })
//         }

//         res.locals.clientId = decoded.sub

//         return next()
//     })
// }