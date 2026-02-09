import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import AppError from "../errors/AppError.js";
import config from "../config/config.js";

const JWT_SECRET = config.JWT_SECRET;

const login = async(username: string, password: string): Promise<string> => {
    const user = await User.findOne({username})
    if (!user) throw new AppError(401, "Invalid username");

    const match: boolean = await bcrypt.compare(password, user.passwordHash); 
    if (!match) throw new AppError(401, "Invalid password");

    const token = jwt.sign(
        {_id: user._id.toString(), username: user.username},
        JWT_SECRET,
        {expiresIn: "2h"}
    )

    return token;
}

export default { login }
