import { useEffect, Suspense, lazy, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { DeleteFilled, EditFilled } from '@ant-design/icons';
import { Spin, Row, Space, theme } from 'antd';

import { fetchPosts, setPostItem, setCurrentPage, setSearchTerm } from './store/slice';
import { columns } from './columns';
import BaseButton from 'components/button';
import BaseMessage from 'components/message';
import PageHeading from './components/page-heading';
const BaseTable = lazy(() => import('components/table'));

const { useToken } = theme;

const PostsPage = () => {
  const navigate = useNavigate();
  const { data, isLoading, currentPage, searchTerm } = useSelector(state => state.postsReducer);
  const {
    alert: { type },
  } = useSelector(state => state.uiReducer);
  const dispatch = useDispatch();

  const {
    token: { colorBgContainer },
  } = useToken();

  const handleClickEdit = useCallback(row => {
    dispatch(setPostItem(row));
    navigate(`/posts-management/post-details/${row.id}`);
  }, []);

  const memoColumns = useMemo(() => {
    const columnActions = {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: 120,
      render: row => {
        return (
          <Row justify={'space-between'}>
            <BaseButton className="btn" type="text" icon={<EditFilled />} onClick={() => handleClickEdit(row)} />
            <BaseButton className="btn" type="text" icon={<DeleteFilled />} danger onClick={() => console.log(row)} />
          </Row>
        );
      },
    };
    return [...columns, { ...columnActions }];
  }, []);

  useEffect(() => {
    if (!data?.length) {
      dispatch(fetchPosts());
    }
  }, [data]);

  const handleCurrentPage = useCallback(
    current => {
      dispatch(setCurrentPage(current));
    },
    [dispatch]
  );

  const handleChangeSearch = useCallback(
    event => {
      dispatch(setSearchTerm(event.target.value));
    },
    [dispatch]
  );

  const filteredPosts = useMemo(() => {
    return data.filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, data]);

  return (
    <Space direction="vertical" style={{ background: colorBgContainer, width: '100%' }}>
      <PageHeading title="Posts" hasSearch={true} handleChangeSearch={handleChangeSearch} />
      <Suspense fallback={<Spin />}>
        <BaseTable
          data={filteredPosts}
          columns={memoColumns}
          loading={isLoading}
          getCurrentPage={handleCurrentPage}
          currentPage={currentPage}
          rowKey="id"
        />
      </Suspense>
      {type ? <BaseMessage /> : null}
    </Space>
  );
};

export default PostsPage;
