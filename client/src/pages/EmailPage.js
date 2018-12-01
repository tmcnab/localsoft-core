import {Button, Tooltip} from 'antd'
import {HelpButton, Page} from 'components'
import {Roles} from 'enums'
import EmailEditDrawer from 'drawers/EmailEditDrawer'
import EmailsInfoDrawer from 'drawers/EmailsInfoDrawer'
import React from 'react'


export default class EmailPage extends Page {

    static permissions = [
        Roles.STAFF,
        Roles.ADMINISTRATOR,
    ]

    state = {
        editVisible: false,
        identifier: null,
        infoVisible: false,
    }

    onClickCreate = () =>
        this.setState({
            editVisible: true,
            identifier: null,
        })

    onClickInfo = () =>
        this.setState({ infoVisible: true })

    onCloseEdit = () =>
        this.setState({ editVisible: false })

    onCloseInfo = () =>
        this.setState({ infoVisible: false })

    render = () =>
        <main>
            <Page.Header title='Email'>
                <Tooltip placement='right' title='Create a new email'>
                    <Button className='mr1' icon='plus' onClick={this.onClickCreate} size='large' shape='circle' type='primary' />
                </Tooltip>
                <HelpButton onClick={this.onClickInfo} />
            </Page.Header>
            <EmailEditDrawer
                identifier={this.state.identifier}
                onClose={this.onCloseEdit}
                visible={this.state.editVisible}
            />
            <EmailsInfoDrawer
                onClose={this.onCloseInfo}
                visible={this.state.infoVisible}
            />
        </main>

}
