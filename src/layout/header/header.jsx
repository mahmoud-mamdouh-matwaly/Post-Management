import { Layout, Avatar, Typography, Col, theme, Row, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import BaseButton from 'components/button';
import './header.css';
const { useToken } = theme;

const { Header } = Layout;
const { Text } = Typography;

const BaseHeader = ({ collapsed, setCollapsed }) => {
  const {
    token: { colorBgContainer },
  } = useToken();
  return (
    <Header
      className="header"
      style={{
        background: colorBgContainer,
      }}
    >
      <Row justify="space-between" gutter={[0, 20]}>
        <Col>
          <BaseButton
            className="btn"
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
          />
        </Col>
        <Col>
          <Space align="center">
            <Avatar icon={<UserOutlined />} />
            <Text>user name</Text>
          </Space>
        </Col>
      </Row>
    </Header>
  );
};

export default BaseHeader;

BaseHeader.propTypes = {
  setCollapsed: PropTypes.func,
  collapsed: PropTypes.bool,
};
