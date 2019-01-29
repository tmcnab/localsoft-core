// import {emailPreview, emailRender, emailUnsubscribe} from './emails'
import {fileDownload, fileUpload} from './files'
import pages from './pages'

export default {
    registerWith: app => {
        // app.get('/email/:identifier', emailRender)
        // app.get('/email/unsubscribe', emailUnsubscribe)
        // app.post('/email/', emailPreview)

        app.get('/files/:identifier', fileDownload)
        app.post('/upload/', fileUpload) // TODO: should this be different? [@tmcnab]

        pages(app)
    }
}
