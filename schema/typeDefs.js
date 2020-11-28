import {typeDefs as users} from './users'

export default [
    `
        scalar DateTime

        type Query {
            none: String
        }
    `,
    users
]