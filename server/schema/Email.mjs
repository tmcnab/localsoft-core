import {Roles} from '../enums'

export default {
    mutations: {
        saveEmail: async (root, args, req) => {
            if ([Roles.STAFF, Roles.ADMINISTRATOR].includes(req.session.role)) {
                // TODO: implement.
                return true
            } else {
                return false
            }
        }
    },
    queries: {
        emails: async (root, args, req) => {
            if ([Roles.STAFF, Roles.ADMINISTRATOR].includes(req.session.role)) {
                // TODO: implement.
                return []
            } else {
                return []
            }
        }
    },
    resolvers: {},
    schema: `
        type Email inherits Record {
            # The markdown content of this email.
            content: String!
            # People who the email was targeted but failed to deliver to.
            failures: [Person!]!
            # The title of the email.
            title: String!
            # The date and time the email will be sent out.
            sendAt: Date!
            # Whether or not the email was batched-out.
            sent: Boolean!
            # Tagged people will receive this email.
            targets: [String!]!
        }

        input EmailInput {
            content: String!
            identifier: ID
            title: String!
            sendAt: Date
            tags: [String!]!
            targets: [String!]!
        }

        extend type Mutation {
            saveEmail(input: EmailInput!): Boolean!
        }

        extend type Query {
            emails: [Email!]!
        }
    `
}
