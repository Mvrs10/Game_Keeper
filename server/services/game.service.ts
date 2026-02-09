import Game, { IGame } from "../models/game.js";
import AppError from "../errors/AppError.js";

const getGames = async (): Promise<IGame[]> => {
    const games = Game.find().lean<IGame[]>().exec();
    return games;
};

const searchGames = async (query: string): Promise<IGame[]> => {
    if (!query) return [];

    try {
        const games = Game.find({
            $or: [
                { title: { $regex: query, $options: "i" } },
                { genre: { $regex: query, $options: "i" } },
                { developer: { $regex: query, $options: "i" } },
            ]
        }).lean().exec();

        return games;
    } catch (err) {
        throw new AppError(500, "Server search failure")
    }

}

export default { getGames, searchGames };