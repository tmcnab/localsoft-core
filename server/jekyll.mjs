import {exec} from 'child_process'

export default async () => {
    return await new Promise((resolve, reject) => {
        exec('cd ../.jekyll && jekyll build', error =>
            error ? reject(error) : resolve()
        )
    })
}
