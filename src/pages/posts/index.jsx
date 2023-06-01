import { useEffect, Suspense, lazy, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Spin, Row, Col, Typography, Space, theme } from 'antd';

import { fetchPosts, setPostItem, restActionStatus, setCurrentPage } from './store/slice';
import { columns } from './columns';
import BaseButton from 'components/button';
import BaseMessage from 'components/message';
const BaseTable = lazy(() => import('components/table'));

const { Title } = Typography;
const { useToken } = theme;

const PostsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, error, currentPage } = useSelector(state => state.postsReducer);
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
            onClick={() => {
              dispatch(setPostItem(row));
              navigate(`/posts-management/post-details/${row.id}`);
            }}
          />
          <BaseButton className="btn" type="text" icon={<DeleteFilled />} danger onClick={() => console.log(row)} />
        </Row>
      );
    },
  };

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchPosts());
    }
    return () => {
      dispatch(restActionStatus());
    };
  }, [data]);

  const handleCurrentPage = useCallback(current => {
    dispatch(setCurrentPage(current));
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
        <BaseTable
          data={data}
          columns={[...columns, { ...columnActions }]}
          loading={isLoading}
          getCurrentPage={handleCurrentPage}
          currentPage={currentPage}
          rowKey="id"
        />
      </Suspense>
      {error ? <BaseMessage /> : null}
    </Space>
  );
};

export default PostsPage;
