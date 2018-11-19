import {Button, Table} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'
import uuid from 'uuid'


export default class PageListPage extends Page {

    columns = [
        { dataIndex: 'name', key: 'name', title: 'Name' },
        { dataIndex: 'url', key: 'url', title: 'URL' },
    ]

    locale = {
        emptyText: 'No Pages'
    }

    state = {
        dataSource: [],
        loading: false,
    }

    onClickCreatePageButton = () =>
        this.props.history.push(`/pages/${uuid.v4()}`)

    render = () =>
        <>
            <Page.Header title='Pages'>
                <Button className='mr1' icon='plus' onClick={this.onClickCreatePageButton} type='primary'>
                    Create New Page
                </Button>
                <ConfigButton />
                <HelpButton />
            </Page.Header>
            <Table
                bordered
                columns={this.columns}
                dataSource={this.state.dataSource}
                loading={this.state.loading}
                locale={this.locale}
                showHeader={Boolean(this.state.dataSource.length)}
            />
        </>

}
