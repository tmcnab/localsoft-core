import {bool, func, string} from 'propTypes'
import {Drawer} from 'antd'
import React, {Component} from 'react'
import gql from 'gql'


export default class FilesHelpDrawer extends Component {

    static propTypes = {
        identifier: string,
        onClose: func.isRequired,
        visible: bool.isRequired,
    }

    state = {
        file: null,
    }

    componentDidMount = async () => {
        const {identifier} = this.props
        if (identifier) {
            const {file} = await gql(`
                query {
                    file (identifier:"${identifier}") {
                        access
                        description
                        mimeType
                        name
                        size
                        tags
                        uploaded
                    }
                }
            `)
            this.setState({file})
        }
    }

    render = () =>
        <Drawer onClose={this.props.onClose} placement='right' title='Editing File' visible={this.props.visible} width={768}>
            <p>Editing File here!</p>
        </Drawer>

}
