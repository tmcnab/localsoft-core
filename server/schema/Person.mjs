export default ({
    resolvers: {},
    schema: `
        type Person inherits Thing {
            _role: String

            additionalName: String
            email: String
            givenName: String
            familyName: String
            memberOf: [String]
            telephone: String
        }
    `
})
