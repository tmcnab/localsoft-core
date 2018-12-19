import {Button, message, Table, Tooltip, Upload} from 'antd'
import {InfoButton, Page, RoleTag} from 'components'
import FileEditDrawer from 'drawers/FileEditDrawer'
import FilesInfoDrawer from 'drawers/FilesInfoDrawer'
import gql from 'gql'
import prettyBytes from 'pretty-bytes'
import React from 'react'


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
        infoVisible: false,
        loading: false,
        uploading: false,
    }

    componentDidMount = () =>
        this.query()

    query = async () => {
        this.setState({loading: true})

        const {dataSource} = await gql(`
            query {
                dataSource: files {
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

        this.setState({dataSource, loading: false})
    }

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

    // SEE: https://ant.design/components/upload/#onChange
    onUploadChange = ({event, file, fileList}) => {
        switch (file.status) {
            case 'uploading':
                this.setState({uploading: true})
                break;
            case 'done':
                message.success(`${file.name} successfully uploaded`)
                this.setState({uploading: false})
                this.query()
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
        <main>
            <Page.Header title='Files'>
                <Tooltip placement='right' title='Upload one or more files'>
                    <div className='inline-block mr1'>
                        <Upload action='/upload' multiple onChange={this.onUploadChange} showUploadList={false} withCredentials >
                            <Button icon='upload' loading={this.state.uploading} size='large' shape='circle' type='primary' />
                        </Upload>
                    </div>
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
            <FileEditDrawer
                identifier={this.state.identifier}
                onClose={this.onCloseEdit}
                visible={this.state.editVisible}
            />
            <FilesInfoDrawer
                onClose={this.onCloseInfo}
                visible={this.state.infoVisible}
            />
        </main>

}
