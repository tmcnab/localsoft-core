import {Button, Table, Tag, Tooltip} from 'antd'
import {Formatter, InfoButton, Page} from 'components'
import EmailEditDrawer from 'drawers/EmailEditDrawer'
import EmailsInfoDrawer from 'drawers/EmailsInfoDrawer'
import gql from 'gql'
import React from 'react'


export default class EmailPage extends Page {

    columns = [{
        dataIndex: 'title',
        sorter: (a, b) => a.name.length - b.name.length,
        title: 'Title',
    }, {
        dataIndex: 'sendAt',
        render: sendAt => <Formatter format='fromNow' value={sendAt} />,
        title: 'Sending',
    }, {
        dataIndex: 'targets',
        render: (tags) => tags.map(tag => <Tag key={tag}>{tag}</Tag>),
        title: 'Targets',
    }, {
        dataIndex: 'failures',
        render: (ids) => ids.length,    // TODO: if there's non-zero should an icon be added? [@tmcnab]
        title: 'Bounced',
    }, {
        dataIndex: 'tags',
        render: (tags) => tags.map(tag => <Tag key={tag}>{tag}</Tag>),
        title: 'Tags',
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

    componentDidMount = () =>
        this.query()

    onClickCreate = () =>
        this.setState({editVisible: true, identifier: null})

    onClickInfo = () =>
        this.setState({infoVisible: true})

    onCloseEdit = (saved) =>
        this.setState({editVisible: false}, this.query)

    onCloseInfo = () =>
        this.setState({infoVisible: false})

    query = async () => {
        this.setState({loading: true})

        const {dataSource} = await gql(`
            query {
                dataSource: emails {
                    identifier
                    failures {
                        identifier
                    }
                    sendAt
                    sent
                    tags
                    targets
                    title
                }
            }
        `)

        this.setState({dataSource, loading: false})
    }

    render = () =>
        <main>
            <Page.Header title='Email'>
                <Tooltip placement='right' title='Create a new email'>
                    <Button className='mr1' icon='plus' onClick={this.onClickCreate} size='large' shape='circle' type='primary' />
                </Tooltip>
                <InfoButton onClick={this.onClickInfo} />
            </Page.Header>
            <Table
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
