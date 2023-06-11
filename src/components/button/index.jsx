import { Button } from 'antd';
import { memo } from 'react';
import PropTypes from 'prop-types';

const BaseButton = props => {
  const { text = '', onClick, isDisabled = false, type = 'primary', loading = false, testId, ...rest } = props;

  return (
    <Button type={type} loading={loading} onClick={onClick} disabled={isDisabled} data-testid={testId} {...rest}>
      {text}
    </Button>
  );
};

export default memo(BaseButton);

BaseButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
  testId: PropTypes.string,
};
