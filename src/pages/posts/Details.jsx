import { Suspense, lazy, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { Spin, Row, Col, Typography, Space, message } from 'antd';
import { fetchPostItem, updatePostItem } from './store/slice';
import BaseMessage from 'components/message';
const Form = lazy(() => import('./components/form'));

const { Title } = Typography;

const PostDetails = () => {
  const { id } = useParams();
  const { postItem, isLoading, error, actionStatus } = useSelector(state => state.postsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!postItem) {
      dispatch(fetchPostItem({ id }));
    }
  }, [postItem]);

  useEffect(() => {
    if (actionStatus === 'success') {
      message.success('This operation is Successfully');
      navigate(-1);
    }
  }, [actionStatus]);

  const handleSubmit = useCallback(values => {
    dispatch(updatePostItem({ id, values }));
  }, []);

  return (
    <Row style={{ padding: '0 24px 24px', margin: '10px 24px', backgroundColor: '#fff', flexDirection: 'column' }}>
      <Row align={'middle'} justify="space-between" style={{ height: '62px' }}>
        <Col>
          <Space>
            <ArrowLeftOutlined onClick={() => navigate(-1)} />
            <Title level={4} style={{ marginBlockEnd: 0 }}>
              Post Details
            </Title>
          </Space>
        </Col>
      </Row>
      {isLoading ? (
        <Row align={'middle'} justify="center">
          <Spin />
        </Row>
      ) : null}
      <Suspense fallback={<Spin />}>
        <Form postItem={postItem} handleSubmit={handleSubmit} />
      </Suspense>
      {error ? <BaseMessage /> : null}
    </Row>
  );
};

export default PostDetails;
