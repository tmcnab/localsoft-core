import db from '../db'

export default {
    mutations: {
        savePage: async (root, args, req) => {
            // TODO: implement
        }
    },
    queries: {
        page: async (root, args, req) => {
            // TODO: implement
        },
        pages: async (root, {identifier}, {session}) => {
            // TODO: implement
        }
    },
    resolvers: {},
    schema: `
        type Page {
            author: [Person!]!
            created: Date!
            description: String
            identifier: ID!
            modified: Date
            path: String!
            published: Date!
            tags: [String!]!
            title: String!
        }

        input PageInput {
            description: String
            identifier: ID!
            path: String!
            published: Date!
            tags: [String!]!
            title: String!
        }

        extend type Mutation {
            savePage(page: PageInput!): Page!
        }

        extend type Query {
            page(id: ID!): Page
            pages: [Page]!
        }
    `
}
