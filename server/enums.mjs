const toEnumObject = (...args) => {
    const object = args.reduce((object, name) => {
        object[name] = name
        return object
    }, {})
    return Object.freeze(object)
}

export const Features = toEnumObject(
    'CONVERSATIONS',
    'EMAIL',
    'EVENTS',
    'FILES',
    'FORUMS',
    'PAGES',
    'PEOPLE',
    'SETTINGS'
)

export const FeaturePaths = {
    [Features.EMAIL]: '/email',
    [Features.FILES]: '/files',
    [Features.PAGES]: '/pages',
    [Features.PEOPLE]: '/people'
}

export const Roles = toEnumObject('ANONYMOUS', 'MEMBER', 'STAFF', 'ADMINISTRATOR')