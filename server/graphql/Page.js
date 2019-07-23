import {Roles} from '../enums.js'
import uuid from 'uuid'

const CRUD_ROLES = [Roles.STAFF, Roles.ADMINISTRATOR]

export default {
    mutations: {
        savePage: async (root, args, req) => {
            if ([Roles.STAFF, Roles.ADMINISTRATOR].includes(req.session.role)) {
                const identifier = args.input.identifier
                const record = identifier ? db.pages.find({identifier}).value() : null

                // TODO: put posts in drafts directory if before publish date, set cronjob to move + rebuild on publish date
                // https://www.npmjs.com/package/agenda

                if (record) {
                    const replacementRecord = Object.assign({}, record, args.input, {
                        author: Array.from(new Set([record.author, req.session.identifier]))
                    })
                    db.pages
                        .find({identifier})
                        .assign(replacementRecord)
                        .write()
                } else {
                    const newRecord = Object.assign({}, args.input, {
                        author: [req.session.identifier],
                        created: new Date().toISOString(),
                        identifier: uuid()
                    })
                    db.pages.push(newRecord).write()
                }

                return true
            } else {
                return false
            }
        }
    },
    queries: {
        page: async (root, {identifier}, {session}) => {
            return session.hasRole(...CRUD_ROLES) ? db.pages.find({identifier}).value() : []
        },
        pages: async (root, args, {session}) => {
            return session.hasRole(...CRUD_ROLES) ? db.pages.value() : []
        }
    },
    resolvers: {
        author: async obj => {
            return db.people.intersectionBy(obj.author.map(identifier => ({identifier})), 'identifier').value()
        }
    },
    schema: `
        type Page {
            # People who've wrote this content.
            author: [Person!]!
            # Markdown content of the page/post.
            content: String!
            # When this content was originally written.
            created: Date!
            # Unique identifier for this record.
            identifier: ID!
            # When this content was last modified.
            modified: Date
            # What path this content is addressible as.
            path: String!
            # Whether or not this page is a blog post.
            post: Boolean!
            # The publishing date of this content.
            published: Date!
            # Metadata tags for organizational purposes.
            tags: [String!]!
            # The title of the content.
            title: String!
        }

        input PageInput {
            content: String!
            identifier: ID
            path: String!
            post: Boolean!
            published: Date!
            tags: [String!]!
            title: String!
        }

        extend type Mutation {
            savePage(input: PageInput!): Boolean!
        }

        extend type Query {
            page(identifier: ID!): Page
            pages: [Page]!
        }
    `
}
