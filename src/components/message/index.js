import React, { useEffect } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';

const BaseMessage = () => {
  const {
    alert: { type, message: text },
  } = useSelector(state => state.uiReducer);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (type === 'error' || type === 'networkError') {
      messageApi.open({
        type: 'error',
        content: text,
      });
    }
    if (type === 'success') {
      messageApi.open({
        type: 'success',
        content: text,
      });
    }
  }, [alert]);

  return <>{contextHolder}</>;
};

export default BaseMessage;
