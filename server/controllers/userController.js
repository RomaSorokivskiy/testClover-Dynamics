const User = require("../models/User")

const createUser = async (req,res) => {
    const {username} = req.body;

    if(!username) {
        return res.status(400).json({message:"User filed is required"})
    }
    const duplicate = await User.findOne({username}).collation({locale:"en", strength:2}).lean().exec();

    if(duplicate) {
        return res.status(409).json({message:"Duplicate User"});
    }

    const userObject = {username};

    const user = await User.create(userObject);

    if(user) {
        res.status(201).json({message: `New user ${username} created`});
    } else {
        res.status(400).json({message:"Invalid user data received"});
    }
}

module.exports = createUser;