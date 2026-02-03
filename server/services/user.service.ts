import { IUser, User } from "../models/user.js";

const getUserById = async (userId: string): Promise<IUser | null> => {
    const user = await User.findById(userId).lean<IUser>().exec();

    if (!user) return null;

    return user;
}

export default { getUserById }




// const getUserNameById = async (userId: string | string[]): Promise<string | null> => {
//     const user = await User.findById(userId).select("username");

//     if (!user) {
//         return null;
//     }

//     return user.username;
// }