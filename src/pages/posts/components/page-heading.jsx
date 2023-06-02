import { Row, Col, Typography, Input, Space } from 'antd';
import PropTypes from 'prop-types';
import { memo } from 'react';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const PageHeading = props => {
  const { handleChangeSearch = () => {}, title, hasBack = false, hasSearch = false } = props;
  const navigate = useNavigate();

  return (
    <Row align={'middle'} justify="space-between" style={{ height: '62px' }}>
      <Col>
        <Space>
          {hasBack ? <ArrowLeftOutlined onClick={() => navigate(-1)} /> : null}

          <Title level={4} style={{ marginBlockEnd: 0, marginInlineStart: 10 }}>
            {title}
          </Title>
        </Space>
      </Col>
      {hasSearch ? (
        <Col>
          <Input placeholder="Search for Posts" onChange={handleChangeSearch} />
        </Col>
      ) : null}
    </Row>
  );
};

export default memo(PageHeading);

PageHeading.propTypes = {
  handleChangeSearch: PropTypes.func,
  title: PropTypes.string,
  hasBack: PropTypes.bool,
  hasSearch: PropTypes.bool,
};
