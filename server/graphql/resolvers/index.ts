import userProfileResolvers from "./userProfile.resolvers.js";

const resolvers = {
    Query: {
        ...userProfileResolvers.Query
    },
    Mutation: {
        ...userProfileResolvers.Mutation
    }
}

export default resolvers;