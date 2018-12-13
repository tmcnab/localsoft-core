import db from '../db'

const hasAccess = (role, minimum) => {
    const roles = ['ANONYMOUS', 'MEMBER', 'STAFF', 'ADMINISTRATOR']
    const minimumIndex = roles.indexOf(minimum)
    const roleIndex = roles.indexOf(role)
    return roleIndex >= minimumIndex
}

export default {
    mutations: {},
    queries: {
        file: async (root, args, req) => {
            const {identifier} = args
            const {role} = req.session
            const file = db
                .get('files')
                .find({identifier})
                .value()

            if (hasAccess(role, file.access)) {
                return file
            }

            throw new Error('Not Found')
        },
        files: async (root, args, req) => {
            const {role} = req.session
            const filter = file => role === 'ADMINISTRATOR' || file.access.role.includes(role)
            return db
                .get('files')
                .filter(filter)
                .value()
        }
    },
    resolvers: {},
    schema: `
        type File {
            access: Role!
            description: String!
            identifier: ID!
            mimeType: String!
            name: String!
            size: Int!
            tags: [String!]!
            uploaded: Date!
        }

        extend type Query {
            file (identifier:ID!): File
            files: [File!]!
        }
    `
}
