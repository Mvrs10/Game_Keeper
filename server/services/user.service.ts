import { Types } from "mongoose";
import bcrypt from "bcrypt";
import { IUser, User } from "../models/user.js";
import Game, { IGame } from "../models/game.js";
import AppError from "../errors/AppError.js";


type UserDTO = Pick<IUser, "username"> & { password: string };
const createUser = async (payload: UserDTO): Promise<Types.ObjectId> => {
    try {
        const passwordHash = await bcrypt.hash(payload.password, 12);
        const newUser = new User({
            username: payload.username,
            passwordHash,
        });
        const saved = await newUser.save();

        return saved._id;
    }
    catch (err: any) {
        if (err.code === 11000) {
            throw new AppError(409, "Username already existed");
        }
        throw new AppError(500, "Failed to create user")
    }
}

const getUsers = async (): Promise<Partial<IUser[]>> => {
    const users = await User.find().select("_id username games").lean().exec();

    return users;
}

const getUserById = async (userId: string): Promise<IUser | null> => {
    const user = await User.findById(userId).lean<IUser>().exec();

    if (!user) return null;

    return user;
}

const deleteUser = async (userId: string): Promise<IUser> => {
    const deletedUser = await User.findByIdAndDelete(userId).lean<IUser>().exec();

    if (!deletedUser) {
        throw new AppError(404, "User not found");
    }
    deletedUser.passwordHash = "";
    return deletedUser;
}

const getUserGamesById = async (userId: string): Promise<IGame[]> => {
    const user = await User.findById(userId)
        .populate<{ games: IGame[] }>("games")
        .lean<{ games: IGame[] }>()
        .exec();

    if (!user) {
        throw new AppError(404, "User not found");
    }

    return user.games;
}

const addGameToCollection = async (userId: string, gameId: string): Promise<string> => {
    if (!Types.ObjectId.isValid(gameId)) {
        throw new AppError(400, "Invalid game");
    }

    const isFound = await Game.exists({ _id: gameId });
    if (!isFound) {
        throw new AppError(400, "Game is not found");
    }

    const updated = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { games: gameId } },
        { new: true }
    ).exec();

    if (!updated) {
        throw new AppError(404, "User not found");
    }

    return gameId;
}

const removeGameFromCollection = async (userId: string, gameId: string): Promise<string> => {
    const updated = await User.findByIdAndUpdate(
        userId,
        { $pull: { games: gameId } },
    ).exec();

        if (!updated) {
        throw new AppError(404, "User not found");
    }

    return gameId;
}

export default { getUserById, createUser, getUsers, deleteUser, getUserGamesById, addGameToCollection, removeGameFromCollection }