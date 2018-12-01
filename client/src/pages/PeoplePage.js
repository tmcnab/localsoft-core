import {Button, Table, Tooltip} from 'antd'
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
        sorter: (a, b) => a.name.family.length - b.name.family.length,
        title: 'Family Name',
    }, {
        dataIndex: 'email',
        sorter: (a, b) => a.email.length - b.email.length,
        title: 'Email',
    }, {
        dataIndex: 'telephone',
        title: 'Phone',
    }, {
        dataIndex: 'role',
        render: (role) => <RoleTag role={role} />,
        sorter: (a, b) => a.role.length - b.role.length,
        title: 'Role',
    }, {
        dataIndex: 'tags',
        title: 'Tags',
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

    personList = async () => {
        this.setState({
            loading: true
        })

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
                    tags
                }
            }
        `)

        this.setState({
            dataSource: people,
            loading: false,
        })
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
        <main>
            <Page.Header title='People'>
                <Tooltip placement='left' title='Add a person'>
                    <Button className='mr1' icon='user-add' onClick={this.onCloseAdd} shape='circle' size='large' type='primary' />
                </Tooltip>
                <HelpButton />
            </Page.Header>
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
            <PersonEditDrawer
                identifier={this.state.identifier}
                onClose={this.onDrawerClose}
                visible={this.state.editDrawerVisible}
            />
        </main>

}
