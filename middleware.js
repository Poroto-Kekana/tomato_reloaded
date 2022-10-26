import jsonwebtoken from "jsonwebtoken";
const config = process.env
export const verrifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers ['x-access-token']
    if(!token) {
        return res.status(403).send('token required')
    }
    const decoded = jsonwebtoken.verify(token, config.TOKEN_KEY)
    req.user = decoded
    return next()
}

// export = verrifyToken