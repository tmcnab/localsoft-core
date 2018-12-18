import db from '../db'
import {Roles} from '../enums'

export default {
    mutations: {
        saveEmail: async (root, args, req) => {
            if ([Roles.STAFF, Roles.ADMINISTRATOR].includes(req.session.role)) {
                const identifier = args.input.identifier
                const record = identifier ? db.emails.find({identifier}).value() : null

                if (record) {
                    db.emails
                        .find({identifier})
                        .assign(record, args.input, {
                            author: Array.from(new Set([record.author, req.session.identifier]))
                        })
                        .write()
                } else {
                    const newRecord = Object.assign({}, args.input, {
                        author: [req.session.identifier],
                        created: new Date().toISOString(),
                        identifier: uuid()
                    })
                    db.emails.push(newRecord).write()
                }

                return true
            } else {
                return false
            }
        }
    },
    queries: {
        emails: async (root, args, req) => {
            if ([Roles.STAFF, Roles.ADMINISTRATOR].includes(req.session.role)) {
                return db.emails.value()
            } else {
                return []
            }
        }
    },
    resolvers: {
        failures: async obj => {
            return db.people.intersectionBy(obj.failures.map(identifier => ({identifier})), 'identifier').value()
        }
    },
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
