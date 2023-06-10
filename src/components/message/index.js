import React, { useEffect } from 'react';
import { message } from 'antd';
import PropTypes from 'prop-types';

const BaseMessage = props => {
  const { message: text, type } = props;
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (type.includes('error')) {
      messageApi.open({
        type: 'error',
        content: text,
      });
    }
    if (type.includes('success')) {
      messageApi.open({
        type: 'success',
        content: text,
      });
    }
  }, [alert]);

  return <>{contextHolder}</>;
};

export default BaseMessage;

BaseMessage.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};
