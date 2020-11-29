import {typeDefs as users} from './users'
import {typeDefs as tenants}  from './tenants'

export default [
    `
        scalar DateTime

        type Query {
            none: String
        }
    `,
	users,
	tenants,
]