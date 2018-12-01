import {Button, message, Table, Tooltip, Upload} from 'antd'
import {HelpButton, Page, RoleTag} from 'components'
import FileEditDrawer from 'drawers/FileEditDrawer'
import FilesHelpDrawer from 'drawers/FilesHelpDrawer'
import prettyBytes from 'pretty-bytes'
import React from 'react'
import gql from 'gql'


export default class FilesPage extends Page {

    columns = [{
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        title: 'Filename',
    }, {
        dataIndex: 'mimeType',
        render: (mimeType) => mimeType === 'application/octet-stream' ? 'file' : mimeType,
        title: 'Type',
    }, {
        dataIndex: 'size',
        render: (input) => prettyBytes(input, {locale: true}),
        sorter: (a, b) => a.size - b.size,
        title: 'Size',
    }, {
        dataIndex: 'access',
        render: (role) =>  <RoleTag role={role} />,
        title: 'Access',
    }]

    locale = {
        emptyText: 'No files'
    }

    state = {
        dataSource: [],
        editVisible: false,
        helpVisible: false,
        loading: false,
        uploading: false,
    }

    componentDidMount = () =>
        this.listFiles()

    listFiles = async () => {
        this.setState({
            loading: true,
        })

        const {files} = await gql(`
            query {
                files {
                    access
                    description
                    identifier
                    mimeType
                    name
                    size
                    tags
                    uploaded
                }
            }
        `)

        this.setState({
            dataSource: files,
            loading: false,
        })
    }

    onClickHelp = () =>
        this.setState({ helpVisible: true })

    onCloseEdit = () =>
        this.setState({ editVisible: false })

    onCloseHelp = () =>
        this.setState({ helpVisible: false })



    // SEE: https://ant.design/components/upload/#onChange
    onUploadChange = ({event, file, fileList}) => {
        switch (file.status) {
            case 'uploading':
                this.setState({uploading: true})
                break;
            case 'done':
                message.success(`${file.name} successfully uploaded`)
                this.setState({uploading: false})
                this.listFiles()
                break
            case 'error':
                message.error(`${file.name} failed to upload`)
                this.setState({uploading: false})
                break
            default:
                console.error('unknown status:', file.status)
        }
    }

    render = () =>
        <>
            <Page.Header title='Files'>
                <Tooltip placement='right' title='Upload one or more files'>
                    <div className='inline-block mr1'>
                        <Upload action='/upload' multiple onChange={this.onUploadChange} showUploadList={false} withCredentials >
                            <Button icon='upload' loading={this.state.uploading} size='large' shape='circle' type='primary' />
                        </Upload>
                    </div>
                </Tooltip>
                <HelpButton onClick={this.onClickHelp} />
            </Page.Header>
            <main>
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
            </main>
            <FileEditDrawer identifier={this.state.identifier} onClose={this.onCloseEdit} visible={this.state.editVisible} />
            <FilesHelpDrawer onClose={this.onCloseHelp} visible={this.state.helpVisible} />
        </>

}
