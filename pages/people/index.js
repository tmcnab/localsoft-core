import { Button, PageHeader, Table, Tooltip } from 'antd'
import { PlusOutlined, QuestionOutlined, UploadOutlined } from '@ant-design/icons'
import PrivateLayout from '../../components/PrivateLayout'

export default function PeopleIndex () {

    const dataSource = []

    const columns = [{
        title: 'Name',
    }, {
        title: 'Status',
    }, {
        title: 'Actions',
    }]
    
    const extra = [
        <Tooltip key='add' placement='left' title='Add'>
            <Button icon={<PlusOutlined />} shape='circle' />
        </Tooltip>,
        <Tooltip key='upload' placement='bottomRight' title='Upload'>
            <Button disabled icon={<UploadOutlined />} shape='circle' />
        </Tooltip>,
        <Tooltip key='help' placement='bottomRight' title='Help'>
            <Button icon={<QuestionOutlined />} shape='circle' />
        </Tooltip>,
    ]

    const showHeader = Boolean(dataSource.length)

    return (
        <PrivateLayout>
            <PageHeader extra={extra} title='People' />
            <Table 
                columns={columns} 
                dataSource={dataSource}
                showHeader={showHeader}
            />
        </PrivateLayout>
    )

}