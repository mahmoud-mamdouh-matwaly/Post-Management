import { MoneyCollectOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import './sidebar.css';

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(
    <NavLink to="/posts-management">
      <span>Posts</span>
    </NavLink>,
    'Posts',
    <MoneyCollectOutlined />
  ),
];
const BaseSidebar = ({ collapsed }) => {
  return (
    <Sider collapsible collapsed={collapsed} trigger={null}>
      <Menu
        mode="inline"
        theme="dark"
        defaultSelectedKeys={['Posts']}
        defaultOpenKeys={['Posts']}
        className="menu"
        items={items}
      />
    </Sider>
  );
};

export default BaseSidebar;

BaseSidebar.propTypes = {
  collapsed: PropTypes.bool,
};
