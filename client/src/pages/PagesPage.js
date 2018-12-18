import {Button, Table, Tag, Tooltip} from 'antd'
import {Formatter, InfoButton, Page} from 'components'
import PageEditDrawer from 'drawers/PageEditDrawer'
import PageInfoDrawer from 'drawers/PageInfoDrawer'
import React from 'react'
import gql from 'gql'


export default class PagesPage extends Page {

    columns = [{
        dataIndex: 'title',
        title: 'Title',
    }, {
        dataIndex: 'author',
        render: (author) => author.map(person => person.email),
        title: 'Author(s)',
    }, {
        dataIndex: 'published',
        render: (published) => <Formatter format='fromNow' value={published} />,
        title: 'Publish Date',
    }, {
        dataIndex: 'post',
        title: 'Post',
    }, {
        dataIndex: 'path',
        title: 'Path',
    }, {
        dataIndex: 'tags',
        render: (tags) => tags.map(tag => <Tag key={tag}>{tag}</Tag>),
        title: 'Tags',
    }]

    state = {
        dataSource: [],
        editVisible: false,
        identifier: null,
        infoVisible: false,
        loading: false,
    }

    componentDidMount = () =>
        this.query()

    query = async () => {
        this.setState({loading: true})

        const {dataSource} = await gql(`
            query {
                dataSource: pages {
                    author {
                        email
                    }
                    identifier
                    path
                    post
                    published
                    tags
                    title
                }
            }
        `)

        this.setState({dataSource, loading: false})
    }

    onClickAdd = () =>
        this.setState({ editVisible: true, indentifier: null })

    onClickHelp = () =>
        this.setState({ infoVisible: true })

    onCloseEdit = (saved) =>
        this.setState({editVisible: false}, () => {
            if (saved) {
                this.query()
            }
        })

    onCloseInfo = () =>
        this.setState({ infoVisible: false })

    render = () =>
        <main>
            <Page.Header title='Pages'>
                <Tooltip placement='left' title='Create a Page'>
                    <Button className='mr1' icon='plus' onClick={this.onClickAdd} shape='circle' size='large' type='primary' />
                </Tooltip>
                <InfoButton onClick={this.onClickHelp} />
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
            <PageEditDrawer
                identifier={this.state.identifier}
                onClose={this.onCloseEdit}
                visible={this.state.editVisible}
            />
            <PageInfoDrawer
                onClose={this.onCloseInfo}
                visible={this.state.infoVisible}
            />
        </main>

}
