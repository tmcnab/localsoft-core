import {Button, Table, Tag, Tooltip} from 'antd'
import {Formatter, InfoButton, Page} from 'components'
import {lowerCase, startCase} from 'lodash'
import gql from 'gql'
import PersonEditDrawer from 'drawers/PersonEditDrawer'
import PeopleInfoDrawer from 'drawers/PeopleInfoDrawer'
import React from 'react'


export default class PeoplePage extends Page {

    locale = {
        emptyText: 'No-one on record. Perhaps try adding one?'
    }

    // recordIncludesTerm = (record, term) => {
    //     const fullName = `${record.additionalName} ${record.familyName} ${record.givenName}`.toLowerCase()
    //     const lowerCaseTerm = term.toLowerCase().trim()
    //     return fullName.includes(lowerCaseTerm)
    // }

    state = {
        dataSource: [],
        editVisible: false,
        infoVisible: false,
        identifier: null,
        loading: false,
        tags: [],
    }

    columns = () => [{
        key: 'name',
        render: (record) => <Formatter format='name' value={record} />,
        sorter: (recordA, recordB) => {
            const nameA = Formatter.nameFormatter(recordA)
            const nameB = Formatter.nameFormatter(recordB)
            if (nameA < nameB) return -1
            if (nameA > nameB) return +1
            return 0
        },
        title: 'Name',
    }, {
        dataIndex: 'email',
        title: 'Email',
    }, {
        dataIndex: 'role',
        render: role => startCase(lowerCase(role)),
        title: 'Role',
    }, {
        dataIndex: 'tags',
        filterMultiple: true,
        filters: this.state.tags,
        onFilter: (value, record) => record.tags.includes(value),
        render: (tags) => tags.map(tag => <Tag key={tag}>{tag}</Tag>),
        title: 'Tags',
    }]

    query = async () => {
        this.setState({loading: true})

        const {dataSource, tags} = await gql(`
            query {
                dataSource: people {
                    additionalName
                    email
                    identifier
                    familyName
                    givenName
                    role
                    tags
                }
                tags: peopleTags
            }
        `)

        this.setState({
            dataSource,
            loading: false,
            tags: tags.map(value => ({ text: value, value })),
        })
    }

    componentDidMount = () =>
        this.query()

    onClickAdd = () =>
        this.setState({editVisible: true, identifier: null})

    onClickHelp = () =>
        this.setState({infoVisible: true})

    onCloseEdit = (saved) =>
        this.setState({editVisible: false}, () => {
            if (saved) {
                this.query()
            }
        })

    onCloseInfo = () =>
        this.setState({infoVisible: false})

    render = () =>
        <main>
            <Page.Header title='People'>
                <Tooltip placement='left' title='Add a person'>
                    <Button className='mr1' icon='user-add' onClick={this.onClickAdd} shape='circle' size='large' type='primary' />
                </Tooltip>
                <InfoButton onClick={this.onClickHelp} />
            </Page.Header>
            <Table
                columns={this.columns()}
                dataSource={this.state.dataSource}
                loading={this.state.loading}
                locale={this.locale}
                onRow={(record) => ({
                    onClick: () => this.setState({
                        editVisible: true,
                        identifier: record.identifier,
                    })
                })}
                rowKey='identifier'
                showHeader={Boolean(this.state.dataSource.length)}
            />
            <PersonEditDrawer
                identifier={this.state.identifier}
                onClose={this.onCloseEdit}
                visible={this.state.editVisible}
            />
            <PeopleInfoDrawer
                onClose={this.onCloseInfo}
                visible={this.state.infoVisible}
            />
        </main>

}
