import {Schema, model, Types } from "mongoose"

export interface IUserProfile {
    userId: Types.ObjectId,
    level: number,
    avatar: string,
}

const userProfileSchema = new Schema<IUserProfile> (
    {
        userId: {type: Schema.Types.ObjectId, required: true, trim: true},
        level: {type: Number, required: true, default: 1},
        avatar: {type: String, required: true, trim: true, default: "pawn"}
    },
    {timestamps:true}
)

export const UserProfile = model<IUserProfile>("UserProfile",userProfileSchema);

