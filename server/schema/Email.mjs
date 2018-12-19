import db from '../db'
import {Roles} from '../enums'
import uuid from 'uuid/v4'

export default {
    mutations: {
        saveEmail: async (root, args, req) => {
            if ([Roles.STAFF, Roles.ADMINISTRATOR].includes(req.session.role)) {
                const identifier = args.input.identifier
                const record = identifier ? db.emails.find({identifier}).value() : null

                if (record) {
                    db.emails
                        .find({identifier})
                        .assign(record, args.input)
                        .write()
                } else {
                    const newRecord = Object.assign({}, args.input, {
                        created: new Date().toISOString(),
                        failures: [],
                        identifier: uuid(),
                        sent: false
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
        email: async (root, {identifier}, {session}) => {
            if (session.hasRole(Roles.ADMINISTRATOR, Roles.STAFF)) {
                return db.emails.find({identifier}).value()
            }
            return null
        },
        emails: async (root, args, {session}) => {
            if (session.hasRole(Roles.ADMINISTRATOR, Roles.STAFF)) {
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
            # The date and time the email will be sent out.
            sendAt: Date!
            # Whether or not the email was batched-out.
            sent: Boolean!
            # Tagged people will receive this email.
            targets: [String!]!
            # The title of the email.
            title: String!
        }

        input EmailInput {
            content: String!
            identifier: ID
            sendAt: Date
            tags: [String!]!
            targets: [String!]!
            title: String!
        }

        extend type Mutation {
            saveEmail(input: EmailInput!): Boolean!
        }

        extend type Query {
            email(identifier: ID!): Email
            emails: [Email!]!
        }
    `
}
