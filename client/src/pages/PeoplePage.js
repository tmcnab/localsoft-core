import {Button, Table} from 'antd'
import {ConfigButton, HelpButton, Page} from 'components'
import React from 'react'
import uuid from 'uuid'


export default class PeoplePage extends Page {

    columns = []

    locale = {
        emptyText: 'No-one on record. Perhaps try adding one?'
    }

    state = {
        dataSource: [],
        loading: false,
    }

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
                    showHeader={Boolean(this.state.dataSource.length)}
                />
            </main>
        </>

}
