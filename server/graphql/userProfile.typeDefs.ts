const userProfileTypeDefs = `#graphql
    type UserProfile {
        _id: ID!
        userId: ID!
        level: Int!
        avatar: String!
    }

    type Query {
        userProfiles: [UserProfile]
        userProfile(userId: ID!): UserProfile
    }

    type Mutation {
        createUserProfile(
            userId: ID!
            level: Int
            avatar: String
        ): UserProfile

        updateUserProfile(
            userId: ID!
            level: Int
            avatar: String
        ): UserProfile
    }
`;

export default userProfileTypeDefs;