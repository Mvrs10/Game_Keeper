import AppError from "../../errors/AppError.js";
import { UserProfile, IUserProfile } from "../../models/userProfile.js";

type UserProfileDTO = Omit<IUserProfile, "userId">;
const userProfileResolvers = {
    Query: {
        userProfiles: async(): Promise<IUserProfile[]> => {
            return await UserProfile.find().lean<IUserProfile[]>().exec();
        },
        userProfile: async(_: any, {userId} : {userId: string}): Promise<IUserProfile | null> => {
            const userProfile = await UserProfile.findOne({userId}).lean<IUserProfile>().exec();

            if (!userProfile) return null;
            return userProfile;
        }
    },

    Mutation: {
        createUserProfile: async (_: any, args: IUserProfile) => {
            try {
                const newUserProfile = new UserProfile(args);
                return await newUserProfile.save();
            } catch (err: any) {
                throw new AppError(400, err.message || "Could not create profile");
            }
        },
        
        updateUserProfile: async (_: any, { userId, ...updateData }: { userId: string } & UserProfileDTO, context: any): Promise<IUserProfile | null> => {
            if (!context.user || context.user._id !== userId) {
                throw new AppError(403, "Not authorized to update this profile");
            }
            const updated = await UserProfile.findOneAndUpdate(
                { userId },
                {$set: updateData},
                {new: true}
            );
            if (!updated) throw new AppError(404, "User not found");
            return updated;
        }
    }
}

export default userProfileResolvers;