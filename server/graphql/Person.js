import authenticate from './mutations/authenticate.js'
import deauthenticate from './mutations/deauthenticate.js'
import destroyPerson from './mutations/destroyPerson.js'
import people from './queries/people.js'
import peopleTags from './queries/peopleTags.js'
import person from './queries/person.js'
import savePerson from './mutations/savePerson.js'
import user from './queries/user.js'

export default {
    mutations: {
        authenticate,
        deauthenticate,
        destroyPerson,
        savePerson
    },
    queries: {
        people,
        peopleTags,
        person,
		user,
    },
    resolvers: {},
    schema: `
        type Preferences {
            email: Boolean
            telephone: Boolean
        }

        input PreferencesInput {
            email: Boolean
            telephone: Boolean
        }

        type Person inherits Record {
            additionalName: String
            address: PostalAddress
            email: String
            familyName: String
            givenName: String
            preferences: Preferences!
            role: Role!
            telephone: String
        }

        input PersonInput {
            additionalName: String
            address: PostalAddressInput
            email: String
            familyName: String
            givenName: String
            identifier: ID
            initializeAccount: Boolean
            preferences: PreferencesInput!
            role: Role!
            tags: [String!]!
            telephone: String
        }

        extend type Mutation {
            # Generate credentials/session for the current user if successfully authenticated.
            authenticate (email: String!, password: String!): Boolean!

            # Revoke credentials/session for the current user.
            deauthenticate: Boolean

            # Destroy a Person record.
            destroyPerson(identifier: ID!): Boolean!

            # Save a Person record.
            savePerson(input: PersonInput): Boolean!
        }

        extend type Query {
            # All Person records.
            people: [Person]

            # Unique list of tags that have been applied to all Person records.
            peopleTags: [String!]!

            # Retrieve a single Person record.
            person(identifier: ID!): Person

			# The current, logged-in Person.
			user: Person
        }
    `
}
