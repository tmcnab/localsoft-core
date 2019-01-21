import fs from 'fs'

export const fileDestroy = async ({db}, {identifier}, {session}) =>
{
    const file = await db.get('files').get(identifier).value()
    if (file) {
        if (session.hasAccess(file.access)) {
            await db.get('files').files.delete(identifier)
            return true
        }
    }

    return false
}
