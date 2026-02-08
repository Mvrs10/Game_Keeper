import {Schema, model, Types } from "mongoose"

export interface IUser {
    username: string,
    passwordHash: string,
    games: Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
    {
        username: {type: String, required: true, unique: true, trim: true},
        passwordHash: {type: String, required: true, trim: true},
        games: [{type: Schema.Types.ObjectId, ref: "Game", default: []}]
    },
    {timestamps: true}
);

export const User = model<IUser>("User", userSchema);