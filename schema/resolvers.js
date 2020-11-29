import {resolvers as users} from './users'
import { resolvers as tenants}  from './tenants'

export default Object.assign(
	{},
    users,
	tenants,
)