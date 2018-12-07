import {db} from '../config'


export default ({
    mutations: {},
    queries: {
        emails: async (root, args, req) => {
            // Only Staff and Administrators can view emails.
            if (!['ADMINISTRATOR', 'STAFF'].includes(req.session.role)) {
                return []
            }

            return db.get('emails').value()
        },
    },
    resolvers: {},
    schema: `
        type Email {
            # The markdown content of this email.
            content: String!
            # A unique identifier for this record.
            identifier: ID!
            # A user-provided name for the email.
            name: String!
            # Tags of People who are intended to receive this email.
            recipients: [String!]!
            # The date and time the email will be sent out.
            sendAt: Date!
            # Tags associated with this email.
            tags: [String!]!
        }

        extend type Query {
            emails: [Email!]!
        }
    `
})
