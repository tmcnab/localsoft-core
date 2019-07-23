import {Roles} from '../enums.js'

class User {
    constructor(request) {
        Object.defineProperties(this, {
            _identifier: {
                get: () => request.session.identifier || null
            },
            _people: {
                get: () => request.data.people.records
            },
            _role: {
                get: () => request.session.role || Roles.ANONYMOUS
            }
        })
        Object.freeze(this)
    }

    doesNotHaveRole(...roles) {
        return !roles.includes(this._role)
    }

    async get() {
        const identifier = this._identifier
        return identifier ? this._people.find({identifier}).value() : null
    }

    hasRole(...roles) {
        return roles.includes(this._role)
    }
}

export default () => {
    return (request, response, next) => {
        if (!request.user) {
            request.user = new User(request)
        }

        next()
    }
}
