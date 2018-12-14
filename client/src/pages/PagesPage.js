import {Button, Table, Tooltip} from 'antd'
import {InfoButton, Page} from 'components'
import PageEditDrawer from 'drawers/PageEditDrawer'
import PageInfoDrawer from 'drawers/PageInfoDrawer'
import React from 'react'


export default class FilesPage extends Page {

    columns = [
        // TODO: name, url, edited?
    ]

    state = {
        dataSource: [],
        editVisible: false,
        infoVisible: false,
        loading: false,
    }

    componentDidMount = () =>
        this.listPages()

    listPages = async () => {
        this.setState({
            loading: true,
        })

        this.setState({
            dataSource: [], // TODO
            loading: false,
        })
    }

    onClickAdd = () =>
        this.setState({ editVisible: true, indentifier: null })

    onClickHelp = () =>
        this.setState({ infoVisible: true })

    onCloseEdit = () =>
        this.setState({ editVisible: false })

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
