import { useEffect, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Spin, Row, Col, Typography } from 'antd';

import { fetchPosts } from './store/slice';
import { columns } from './columns';
const BaseTable = lazy(() => import('components/table'));

const { Title } = Typography;

const PostsPage = props => {
  const { fetchPosts, data, isLoading } = props;

  const columnActions = {
    title: 'Action',
    key: 'operation',
    fixed: 'right',
    width: 120,
    render: row => {
      return (
        <Row justify={'space-between'}>
          <Link to={`/bundles/bundle-details/${row.id}`} state={{ row }} onClick={e => e.stopPropagation()}>
            View
          </Link>
        </Row>
      );
    },
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Row style={{ padding: '0 24px 24px', margin: '10px 24px', backgroundColor: '#fff', flexDirection: 'column' }}>
      <Row align={'middle'} justify="space-between" style={{ height: '62px' }}>
        <Col>
          <Title level={4} style={{ marginBlockEnd: 0 }}>
            Posts
          </Title>
        </Col>
      </Row>
      {isLoading ? (
        <Row align={'middle'} justify="center">
          <Spin />
        </Row>
      ) : null}
      {!isLoading ? (
        <Suspense fallback={<Spin />}>
          <BaseTable data={data} columns={[...columns, { ...columnActions }]} rowKey="id" />
        </Suspense>
      ) : null}
    </Row>
  );
};

const mapStateToProps = state => {
  return {
    isLoading: state.postsReducer.isLoading,
    data: state.postsReducer.data,
  };
};

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostsPage);

PostsPage.propTypes = {
  fetchPosts: PropTypes.func,
  data: PropTypes.array,
  isLoading: PropTypes.bool,
};
