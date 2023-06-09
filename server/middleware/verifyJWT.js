const jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        process.env.ACCECTOKEN,
        (e, decoded) => {
            if (e) return res.status(403).json({ message: 'Forbidden' });
            req.user = decoded.UserInfo;
            next();
        }
    )
}

module.exports = verifyJWT;