import {any, string} from 'propTypes'
import moment from 'moment'
import prettyBytes from 'pretty-bytes'
import React, {Component} from 'react'


export default class Formatter extends Component {

    static propTypes = {
        format: string.isRequired,
        value: any.isRequired,
    }

    static nameFormatter = (person) => {
        const {additionalName, familyName, givenName} = person
        let str = ''
        if (familyName) {
            str += familyName
            if (givenName) {
                str += ', ' + givenName
                if (additionalName) {
                    str += ' ' + additionalName[0] + '.'
                }
            }
        } else {
            str += givenName
            if (additionalName) {
                str += ' ' + additionalName[0]
            }
        }
        return str
    }

    children = () => {
        const {format, value} = this.props
        switch (format) {
            case 'information':
                return prettyBytes(value, { locale: true })
            case 'fromNow':
                return moment(value).fromNow()
            case 'name':
                return Formatter.nameFormatter(value)
            default:
                throw new TypeError(`Unsupported format: "${format}"`)
        }
    }

    render = () =>
        <span {...this.props} children={this.children()} />
}
