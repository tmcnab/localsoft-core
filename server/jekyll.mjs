import {exec} from 'child_process'

/**
 *  Regenerates the jekyll
 *
 *  @param  {String} zipFileName the ID of the file containing a jekyll theme to install.
 */
export default (themeFile = null) => {
    // TODO: check for zipFileName
    new Promise((resolve, reject) => {
        exec('cd ../.jekyll && jekyll build', error => error ? reject(error) : resolve())
    })
}
