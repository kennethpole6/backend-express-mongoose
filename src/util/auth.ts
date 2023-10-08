
import jwt from "jsonwebtoken"
import env from "../util/validateEnv"
export const generateToken = (payload: any) => {
    return jwt.sign(payload, env.TOKEN_SECRET, {
        expiresIn: "12h"
    })
}

// export const validateToken = (token: string) => {
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, env.TOKEN_SECRET, (err, payload) => {
//             if(err) return reject("Invalid token")
//             resolve(payload)
//         })
//     }).catch(err => {
//         return reject("Invalid token")
//     })
// }