import { Button } from 'antd';
import PropTypes from 'prop-types';

const BaseButton = props => {
  const { text = '', onClick, isDisabled = false, type = 'primary', loading = false, ...rest } = props;

  return (
    <Button type={type} loading={loading} onClick={onClick} disabled={isDisabled} {...rest}>
      {text}
    </Button>
  );
};

export default BaseButton;

BaseButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
  type: PropTypes.string,
  loading: PropTypes.bool,
};
