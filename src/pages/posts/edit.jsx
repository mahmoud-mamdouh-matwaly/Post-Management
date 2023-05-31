import { Suspense } from 'react';
import { Spin, Row, Col, Typography } from 'antd';

const { Title } = Typography;

const EditPost = () => {
  return (
    <Row style={{ padding: '0 24px 24px', margin: '10px 24px', backgroundColor: '#fff', flexDirection: 'column' }}>
      <Row align={'middle'} justify="space-between" style={{ height: '62px' }}>
        <Col>
          <Title level={4} style={{ marginBlockEnd: 0 }}>
            edit
          </Title>
        </Col>
      </Row>

      <Suspense fallback={<Spin />}></Suspense>
    </Row>
  );
};

export default EditPost;

EditPost.propTypes = {};
