export default ({
    resolvers: {
        people: () => {
            return []
        }
    },
    schema: `
        type Query {
            people: [Person]
        }
    `
})
