import { gql } from 'apollo-server-micro'

// https://www.prisma.io/docs/concepts/components/prisma-client/crud#findmany
async function users (parent, args, { data }, info) {
    return await data.user.findMany()
}

export const resolvers = {
    Query: {
        users,
    },
}

export const typeDefs = gql`

    type User {
        createdAt: DateTime!
        email: String!
        id: ID!
    }

    extend type Query {
        users: [User!]!
    }

`