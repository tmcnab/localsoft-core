import {Button, Table, Tooltip} from 'antd'
import {InfoButton, Page} from 'components'
import {Roles} from 'enums'
import EmailEditDrawer from 'drawers/EmailEditDrawer'
import EmailsInfoDrawer from 'drawers/EmailsInfoDrawer'
import React from 'react'


export default class EmailPage extends Page {

    static permissions = [
        Roles.STAFF,
        Roles.ADMINISTRATOR,
    ]

    columns = [{
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        title: 'Name',
    }, {
        dataIndex: 'date',
        title: 'Send Date',
    }, {
        dataIndex: 'targets',
        title: 'Targets',
    }, {
        dataIndex: 'recipients',
        title: 'Recipients',
    }, {
        dataIndex: 'bounced',
        title: 'Bounced',
    }]

    locale = {
        emptyText: 'No emails.'
    }

    state = {
        dataSource: [],
        editVisible: false,
        identifier: null,
        infoVisible: false,
        loading: false,
    }

    fetchRecords = async () => {
        // TODO:
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
                <InfoButton onClick={this.onClickInfo} />
            </Page.Header>
            <Table
                bordered
                columns={this.columns}
                dataSource={this.state.dataSource}
                loading={this.state.loading}
                locale={this.locale}
                onRow={record => ({
                    onClick: () => this.setState({
                        editVisible: true,
                        identifier: record.identifier,
                    }),
                })}
                rowKey='identifier'
                showHeader={Boolean(this.state.dataSource.length)}
            />
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
