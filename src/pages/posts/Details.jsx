import { useEffect, useCallback, Suspense, lazy } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Row, Spin, Space, theme } from 'antd';
import { fetchPostItem, updatePostItem } from './store/slice';
import BaseMessage from 'components/message';
import PageHeading from './components/page-heading';

const Form = lazy(() => import('./components/form'));

const { useToken } = theme;

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    token: { colorBgContainer },
  } = useToken();

  const { postItem, isLoading } = useSelector(state => state.postsReducer);
  const {
    alert: { type },
  } = useSelector(state => state.uiReducer);

  useEffect(() => {
    if (!postItem) {
      dispatch(fetchPostItem({ id }));
    }
  }, [postItem]);

  useEffect(() => {
    if (type === 'success') {
      navigate(-1);
    }
  }, [type]);

  const handleSubmit = useCallback(
    values => {
      dispatch(updatePostItem({ id, values }));
    },
    [dispatch]
  );
  if (isLoading) {
    return (
      <Row align={'middle'} justify="center">
        <Spin />
      </Row>
    );
  }
  return (
    <Space direction="vertical" style={{ background: colorBgContainer, width: '100%', padding: '0 15px 15px' }}>
      <PageHeading title="Post Details" hasBack={true} />
      <Suspense fallback={<Spin />}>
        <Form postItem={postItem} handleSubmit={handleSubmit} />
      </Suspense>
      {type ? <BaseMessage /> : null}
    </Space>
  );
};

export default PostDetails;
