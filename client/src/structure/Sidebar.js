import {Col, Icon, Layout, Menu, Row} from 'antd'
import {Link} from 'react-router-dom'
import React, {Component} from 'react';
import {role} from 'propTypes'
import {Roles} from 'enums'

// NOTE: in the future these permissions will be more granular.
// NOTE: some of these features will be reenabled in V2
const MENU_ITEMS = [
    { key: 'people', icon: 'team',  label: 'People', viewers: [Roles.STAFF], },
]

class MenuItem extends Component {

	static propTypes = {

	}

	get canView () {
		const {data, role} = this.props
		return role === Roles.ADMINISTRATOR || data.viewers.includes(role)
	}

	render = () => {
		const {icon, key, label} = this.props.data
		return this.canView ? (
			<Menu.Item key={key}>
				<Link to={`/${key}/`}>
					<Icon type={icon} /> {label}
				</Link>
			</Menu.Item>
		) : null
	}
}

export default class Sidebar extends Component {

    static propTypes = {
        role: role.isRequired,
    }

	state = {
		collapsed: false,
	}

	onCollapse = (collapsed) =>
		this.setState({collapsed})

    render = () =>
        <Layout.Sider className='border-right' collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse} theme='light'>
            <header className='font-large p1'>
                <Row>
                    <Col span={3}>
                        <Icon type='ant-design' />
                    </Col>
                    <Col span={21}>
                        <strong>localsoft</strong>
                    </Col>
                </Row>
            </header>
            <Menu mode='vertical'>
	            {MENU_ITEMS.map(data => <MenuItem collapsed={this.state.collapsed} data={data} role={this.props.role} />)}
            </Menu>
        </Layout.Sider>

}
