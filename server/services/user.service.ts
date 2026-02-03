import User from "../models/user.js";

export const getUserNameById = async (userId: string | string[]): Promise<string|null> => {
    const user = await User.findById(userId).select("username");

    if (!user) {
        return null;
    }

    return user.username;
}