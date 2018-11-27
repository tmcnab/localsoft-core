import config from '../config'
import fsUtils from 'nodejs-fs-utils'


export default ({
    mutations: {},
    queries: {
        account: async (root, args, req) => {
            if (['STAFF', 'ADMINISTRATOR'].includes(req.session.role)) {
                return {
                    storage: {
                        total: config.STORAGE_QUOTA.toString(),
                        usage: fsUtils.fsizeSync(config.DATA_DIR).toString(),
                    }
                }
            }

            throw new Error('Unauthorized')
        },
    },
    resolvers: {},
    schema: `
        type Quota<T> {
            total: T!
            usage: T!
        }

        type Account {
            storage: Quota<String>!
        }

        extend type Query {
            account: Account!
        }
    `
})
