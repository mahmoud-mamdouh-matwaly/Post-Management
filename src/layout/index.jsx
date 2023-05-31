import { useCallback, useState } from 'react';
import { Layout } from 'antd';
import BaseSidebar from './sidebar';
import BaseHeader from './header/header';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const BaseLayOut = () => {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapsed = useCallback(() => {
    setCollapsed(prev => !prev);
  }, []);

  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <BaseSidebar collapsed={collapsed} />
      <Layout>
        <BaseHeader setCollapsed={handleCollapsed} collapsed={collapsed} />

        <Content
          style={{
            margin: '24px 16px 0',
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BaseLayOut;
