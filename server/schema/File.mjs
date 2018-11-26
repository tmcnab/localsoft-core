import {db} from '../config'


export default ({
    mutations: {

    },
    queries: {
        files: async (root, args, req) => {
            const {role} = req.session
            const filter = file => role === 'ADMINISTRATOR' || file.access.role.includes(role)
            return db.get('files')
                .filter(filter)
                .value()
        },
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
            files: [File!]!
        }
    `
})
