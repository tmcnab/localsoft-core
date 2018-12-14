import {Roles} from '../enums'
import db from '../db'
import jekyll from '../jekyll'
import uuid from 'uuid/v4'

export default {
    mutations: {
        savePage: async (root, args, req) => {
            if ([Roles.STAFF, Roles.ADMINISTRATOR].includes(req.session.role)) {
                const {page} = args
                const record = page.identifier ? db.pages.find({ identifier: page.identifier }).value() : null

                if (record) {
                    db.pages.find({identifier}).assign({
                        ...record,
                        ...page,
                        author: Array.from(new Set([record.author, req.session.identifier ]))
                    }).write()
                } else {
                    db.pages.push({
                        ...page,
                        author: [req.session.identifier],
                        created: new Date().toISOString(),
                        identifier: uuid(),
                    }).write()
                }

                await jekyll()
                return true
            } else {
                return false
            }
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
    resolvers: {
        author: (obj, args, context, info) => {
            // TODO: implement
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
            savePage(page: PageInput!): Boolean!
        }

        extend type Query {
            page(id: ID!): Page
            pages: [Page]!
        }
    `
}
