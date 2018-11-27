import config from '../config'
import fsUtils from 'nodejs-fs-utils'


export default ({
    mutations: {},
    queries: {
        account: async (root, args, req) => {
            const result = {
                name: config.INSTANCE_NAME,
            }

            if (['STAFF', 'ADMINISTRATOR'].includes(req.session.role)) {
                result.storage = {
                    total: config.STORAGE_QUOTA.toString(),
                    usage: fsUtils.fsizeSync(config.DATA_DIR).toString(),
                }
            }

            return result
        },
    },
    resolvers: {},
    schema: `
        type Quota<T> {
            total: T!
            usage: T!
        }

        type Account {
            name: String!
            storage: Quota<String>!
        }

        extend type Query {
            account: Account!
        }
    `
})
