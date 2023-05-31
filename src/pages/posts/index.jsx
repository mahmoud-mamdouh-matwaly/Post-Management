import { useEffect, Suspense, lazy } from 'react';
import { useNavigate } from 'react-router-dom';
import { Spin, Row, Col, Typography, Space, theme } from 'antd';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { fetchPosts } from './store/slice';
import { columns } from './columns';
import BaseButton from 'components/button';
import BaseMessage from 'components/message';

const BaseTable = lazy(() => import('components/table'));

const { Title } = Typography;
const { useToken } = theme;

const PostsPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, error } = useSelector(state => state.postsReducer);
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = useToken();

  const columnActions = {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 120,
    render: row => {
      return (
        <Row justify={'space-between'}>
          <BaseButton
            className="btn"
            type="text"
            icon={<EditFilled />}
            onClick={() => navigate(`/posts-management/edit-post/${row.id}`)}
          />
          <BaseButton className="btn" type="text" icon={<DeleteFilled />} danger onClick={() => console.log(row)} />
        </Row>
      );
    },
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return (
    <Space direction="vertical" style={{ background: colorBgContainer, width: '100%' }}>
      <Row align={'middle'} justify="space-between" style={{ height: '62px' }}>
        <Col>
          <Title level={4} style={{ marginBlockEnd: 0, marginInlineStart: 10 }}>
            Posts
          </Title>
        </Col>
      </Row>

      <Suspense fallback={<Spin />}>
        <BaseTable data={data} columns={[...columns, { ...columnActions }]} loading={isLoading} rowKey="id" />
      </Suspense>
      {error ? <BaseMessage /> : null}
    </Space>
  );
};

export default PostsPage;
