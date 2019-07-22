import config from '../config.js'
import db from '../db.js'
import fsUtils from 'nodejs-fs-utils'
import {Roles} from '../enums.js'

export default {
    mutations: {
        saveAccount: async (root, args, req) => {
            if (req.session.hasRole(Roles.ADMINISTRATOR)) {
                db.account.merge(args.input).write()
                return true
            }
            return false
        }
    },
    queries: {
        account: async (root, args, req) => {
            const account = db.account.pick(['site_description', 'site_title', 'twitter_username']).value()
            const query = Object.assign(account, {site_url: config.SITE_URL})

            if (['STAFF', 'ADMINISTRATOR'].includes(req.session.role)) {
                query.storage = {
                    total: config.STORAGE_QUOTA.toString(),
                    usage: fsUtils.fsizeSync(config.DATA_DIR).toString()
                }
            }

            return query
        }
    },
    resolvers: {},
    schema: `
        type Quota<T> {
            total: T!
            usage: T!
        }

        type Account {
            name: String!
            site_description: String
            site_title: String!
            storage: Quota<String>!
            twitter_username: String
        }

        input AccountInput {
            site_description: String
            site_title: String!
            twitter_username: String
        }

        extend type Mutation {
            saveAccount(input: AccountInput!): Boolean!
        }

        extend type Query {
            account: Account!
        }
    `
}
