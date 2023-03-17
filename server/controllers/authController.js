const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req,res) => {
    const {username} = req.body;

    const foundUser = await User.findOne({username}).exec();

    if(!foundUser){
        return res.status(401).json({ message: 'Unauthorized' })
    };

    const accessToken = jwt.sign(
        {
            "UserInfo": {
                "username" : foundUser.username
            }
        },
        process.env.ACCECTOKEN, {expiresIn: "15m"}
    );
    const refreshToken = jwt.sign(
        {
            "username": foundUser.username
        },
        process.env.REFRESHTOKEN, {expiresIn: "7d"}
    );
    res.cookie('jwt', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'None',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({accessToken});
}

const refresh = async (req,res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.status(401).json({ message: 'Unauthorized' });
    const refreshToken = cookies.jwt;
    jwt.verify(
        refreshToken,
        process.env.REFRESHTOKEN,
        async (e,decoded) => {
            if(e) return res.status(403).json({message:"Forbidden"});
            const foundUser = await User.findOne({username:decoded.username}).exec();
            if (!foundUser) return res.status(401).json({ message: 'Unauthorized' })

            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "username": foundUser.username,
                    }
                },
                process.env.ACCECTOKEN, {expiresIn: "15m"}
            )
            res.json({accessToken});
        }
    )
}

module.exports = {login,refresh}