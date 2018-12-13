import config from './config'
import db from './db'
import {exec} from 'child_process'
import fs from 'fs'
import grayMatter from 'gray-matter'
import path from 'path'

const build = () =>
    new Promise((resolve, reject) =>
        exec('cd ../.jekyll && jekyll build', error => error ? reject(error) : resolve())
    )

const deleteExisting = () =>
    new Promise((resolve, reject) =>
        exec('cd ../.jekyll && rm -rf *.md _posts _site && mkdir -p _posts', error =>
            error ? reject(error) : resolve()
        )
    )

const postFileName = (published, name) => `_posts/${published.split('T')[0]}-${name}.md`

// https://www.npmjs.com/package/gray-matter
const writePages = async () => {
    db.get('pages')
        .value()
        .map(page => ({
            content: page.content,
            data: {
                date: page.published,
                layout: page.post ? 'post' : page.path === '/' ? 'home' : 'page',
                permalink: page.path,
                title: page.title
            },
            name: page.name,
            post: page.post
        }))
        .map(object => ({
            content: grayMatter.stringify(object.content, object.data),
            name: object.post ? postFileName(object.data.date, object.name) : `${object.name}.md`
        }))
        .forEach(file => {
            try {
                fs.writeFileSync(path.join(config.JEKYLL_DIR, '..', file.name), file.content)
            } catch (error) {
                console.error(error)
            }
        })
}

export default async (themeFile = null) => {
    await deleteExisting()
    await writePages()
    await build()
}
