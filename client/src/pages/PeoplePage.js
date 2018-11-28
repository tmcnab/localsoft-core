import {Button, Popconfirm, Table, Tooltip} from 'antd'
import {HelpButton, Page} from 'components'
import {RoleTag} from 'components'
import gql from 'gql'
import PersonEditDrawer from 'drawers/PersonEditDrawer'
import React from 'react'


export default class PeoplePage extends Page {

    columns = [{
        dataIndex: 'name.given',
        title: 'Given Name',
    }, {
        dataIndex: 'name.family',
        title: 'Family Name',
    }, {
        dataIndex: 'email',
        title: 'Email',
    }, {
        dataIndex: 'role',
        render: (role) => <RoleTag role={role} />,
        title: 'Role',
    }, {
        render: (item) =>
            <Popconfirm cancelText='No' okText='Yes' onConfirm={() => this.personDestroy(item.identifier)} title='Are you sure?'>
                Delete
            </Popconfirm>
    }]

    locale = {
        emptyText: 'No-one on record. Perhaps try adding one?'
    }

    state = {
        dataSource: [],
        editDrawerVisible: false,
        identifier: null,
        loading: false,
    }

    personDestroy = async (identifier) => {
        console.info('destroying Person', identifier)
        // TODO
    }

    personList = async () => {
        const {people} = await gql(`
            query {
                people {
                    name {
                        family
                        given
                    }
                    identifier
                    email
                    role
                }
            }
        `)

        this.setState({ dataSource: people })
    }

    componentDidMount = () =>
        this.personList()

    onCloseAdd = () =>
        this.setState({ editDrawerVisible: true })

    onDrawerClose = (didSaveRecord) => {
        this.personList()
        this.setState({
            editDrawerVisible: false,
        })
    }

    render = () =>
        <>
            <Page.Header title='People'>
                <Tooltip placement='left' title='Add a person'>
                    <Button className='mr1' icon='user-add' onClick={this.onCloseAdd} shape='circle' size='large' type='primary' />
                </Tooltip>
                <HelpButton />
            </Page.Header>
            <main>
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={this.state.dataSource}
                    loading={this.state.loading}
                    locale={this.locale}
                    onRow={(record) => ({
                        onClick: () => this.setState({
                            editDrawerVisible: true,
                            identifier: record.identifier,
                        })
                    })}
                    rowKey='identifier'
                    showHeader={Boolean(this.state.dataSource.length)}
                />
            </main>
            <PersonEditDrawer
                identifier={this.state.identifier}
                onClose={this.onDrawerClose}
                visible={this.state.editDrawerVisible}
            />
        </>

}
