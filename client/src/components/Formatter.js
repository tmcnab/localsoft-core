import {any, string} from 'propTypes'
import moment from 'moment'
import prettyBytes from 'pretty-bytes'
import React, {Component} from 'react'


export default class Formatter extends Component {

    static propTypes = {
        format: string.isRequired,
        value: any.isRequired,
    }

    children = () => {
        const {format, value} = this.props
        switch (format) {
            case 'information':
                return prettyBytes(value, { locale: true })
            case 'fromNow':
                return moment(value).fromNow()
            default:
                throw new TypeError(`Unsupported format: "${format}"`)
        }
    }

    render = () =>
        <span {...this.props} children={this.children()} />
}
