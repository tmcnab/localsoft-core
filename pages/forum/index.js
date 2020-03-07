import {} from 'prop-types'
import {Button, PageHeader, Tooltip} from 'antd'
import {Component} from 'react'
import DashboardLayout from 'components/layouts/DashboardLayout'
import {PlusOutlined, QuestionOutlined} from '@ant-design/icons'
import TopicsTable from 'components/forums/TopicsTable'

export default class ForumIndexPage extends Component {

	static defaultProps = {
		dataSource: [],
	}

	extra =
		<>
			<Tooltip title='New Topic'>
				<Button disabled icon={<PlusOutlined />} shape='circle' type='primary' />
			</Tooltip>
			<Tooltip title='Help'>
				<Button disabled icon={<QuestionOutlined />} shape='circle' />
			</Tooltip>
		</>

	footer =
		<TopicsTable dataSource={this.props.dataSource} />

	render = () =>
		<DashboardLayout title='Forum'>
			<PageHeader extra={this.extra} footer={this.footer} title='Forum' />
		</DashboardLayout>

}
