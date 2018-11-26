import {Button, Popconfirm, Table} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'
import uuid from 'uuid'
import gql from 'gql'


export default class PeoplePage extends Page {

    columns = [{
        dataIndex: 'givenName',
        title: 'Given Name',
    }, {
        dataIndex: 'familyName',
        title: 'Family Name',
    }, {
        dataIndex: 'email',
        title: 'Email',
    }, {
        dataIndex: 'role',
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
        loading: false,
    }

    personDestroy = async (identifier) => {
        console.info('destroying Person', identifier)
        // TODO
    }

    personList = async () => {
        const {data} = await gql(`
            query {
                people {
                    identifier
                    givenName
                    familyName
                    email
                    role
                }
            }
        `)

        this.setState({ dataSource: data.people })
    }

    componentDidMount = () =>
        this.personList()

    onAddPerson = () =>
        this.props.history.push(`/people/${uuid.v4()}`)

    render = () =>
        <>
            <Page.Header title='People'>
                <Button className='mr1' icon='user-add' onClick={this.onAddPerson} type='primary'>
                    Add
                </Button>
                <ConfigButton />
                <HelpButton />
            </Page.Header>
            <main>
                <Table
                    bordered
                    columns={this.columns}
                    dataSource={this.state.dataSource}
                    loading={this.state.loading}
                    locale={this.locale}
                    rowKey='identifier'
                    showHeader={Boolean(this.state.dataSource.length)}
                />
            </main>
        </>

}
