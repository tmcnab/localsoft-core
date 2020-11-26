import { ApolloServer, gql, makeExecutableSchema } from "apollo-server-micro"

const resolvers = {
    Query: {
        async person (parnt, args, context, info) {
            return []
        },
    }
}

const typeDefs = gql`

    type Person {
        familyName: String
        givenName: String
        id: ID!
    }

    type Query {
        person(id: ID!): Person
    }

`

const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
})

const context = (ctx) {
    return ctx
}

const apollo = new ApolloServer({
    context,
    schema,
})