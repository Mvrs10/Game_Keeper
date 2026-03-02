const userProfileTypeDefs = `#graphql
    type UserProfile {
        id: ID!
        userId: ID!
        level: Int!
        avatar: String!
    }

    type Query {
        userProfiles: [UserProfile]
        userProfile(userId: ID!): UserProfile
    }

    type Mutation {
        id: ID!
        userId: ID!
        level: Int
        avatar: String
    } : UserProfile
`;

export default userProfileTypeDefs;