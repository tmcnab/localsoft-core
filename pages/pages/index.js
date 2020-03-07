import {} from 'prop-types'
import {Button, PageHeader, Tooltip} from 'antd'
import {Component} from 'react'
import DashboardLayout from 'components/layouts/DashboardLayout'
import {PlusOutlined, QuestionOutlined} from '@ant-design/icons'
import Router from 'next/router'
import PageTable from 'components/pages/PageTable'

export default class PagesIndexPage extends Component {

	static defaultProps = {
		dataSource: [],
	}

	static propTypes = {
		dataSource: PageTable.propTypes.dataSource,
	}

	extra =
		<>
			<Tooltip title='New Page/Post'>
				<Button icon={<PlusOutlined />} onClick={() => Router.push('/pages/new')} shape='circle' />
			</Tooltip>
			<Tooltip title='Help'>
				<Button disabled icon={<QuestionOutlined />} shape='circle' />
			</Tooltip>
		</>

	footer =
		<PageTable dataSource={this.props.dataSource} />

	render = () =>
		<DashboardLayout path='/pages' title='Pages'>
			<PageHeader extra={this.extra} footer={this.footer} title='Pages & Posts' />
		</DashboardLayout>

}
