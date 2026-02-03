import {Schema, model, Types } from "mongoose"

interface IUser {
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

const User = model<IUser>("User", userSchema);

export default User;