import {Schema, model, Types } from "mongoose"

export interface IUser {
    username: string,
    password: string,
    games: Types.ObjectId[]
}

const userSchema = new Schema<IUser>(
    {
        username: {type: String, required: true, trim: true},
        password: {type: String, required: true, trim: true},
        games: [{type: Schema.Types.ObjectId, ref: "Game"}]
    },
    {timestamps: true}
);

export const User = model<IUser>("User", userSchema);