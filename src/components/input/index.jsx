import { Input, Form } from 'antd';
import PropTypes from 'prop-types';

const BaseInput = props => {
  const {
    placeholder,
    label,
    message,
    isRequired = true,
    name,
    error,
    prefix,
    value,
    disabled = false,
    rule,
    inputType = 'text',
    suffix,
    ...rest
  } = props;

  return (
    <Form.Item
      name={name}
      label={label}
      rules={[
        {
          required: isRequired,
          message: message,
          ...rule,
        },
      ]}
      validateStatus={error ? 'error' : ''}
      help={error}
      {...rest}
    >
      <Input
        disabled={disabled}
        data-testid={name}
        value={value ?? ''}
        name={name}
        placeholder={placeholder}
        prefix={prefix}
        type={inputType}
        suffix={suffix}
        style={{ height: '40px' }}
      />
    </Form.Item>
  );
};

export default BaseInput;

BaseInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  message: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prefix: PropTypes.node,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  rule: PropTypes.object,
  inputType: PropTypes.string,
  suffix: PropTypes.node,
};
