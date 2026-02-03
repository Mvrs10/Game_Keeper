import {Schema, model, Model } from "mongoose"

export interface IGame {
    title: string,
    genre: string,
    platform: string,
    releaseYear: number,
    developer: string,
    rating: number,
    description: string
}

const gameSchema = new Schema<IGame> (
    {
        title: {type: String, required: true, trim: true},
        genre: {type: String, required: true, trim: true},
        platform: {type: String, required: true, trim: true},
        releaseYear: {type: Number, required: true, default: 2026},
        developer: {type: String, required: true, trim: true},
        rating: {type: Number, required: true, trim: true, default: 5},
        description: {type: String, required: true, trim: true, default: "Description is not available."},
    },
    { timestamps: true }
);

const Game = model<IGame>("Game", gameSchema);
export default Game;