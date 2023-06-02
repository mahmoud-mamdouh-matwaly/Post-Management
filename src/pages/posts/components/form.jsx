import { useEffect, memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row, Input } from 'antd';
import BaseButton from 'components/button';
import BaseInput from 'components/input';
const { TextArea } = Input;

const PostForm = props => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const { postItem, handleSubmit = () => {} } = props;

  useEffect(() => {
    if (postItem) {
      form.setFieldsValue(postItem);
    }
  }, [postItem]);

  const onFieldsChange = useCallback(() => {
    setDisabled(false);
  }, []);

  const onFinish = useCallback(() => {
    form
      .validateFields()
      .then(values => {
        let item = {
          ...values,
        };
        handleSubmit(item);
      })
      .catch(error => {
        const errors = error.errorFields.filter(field => {
          return field.errors.length;
        });
        if (errors.length) return;
      });
  }, []);

  return (
    <Form form={form} name="form" layout="vertical" onFinish={onFinish} onFieldsChange={onFieldsChange}>
      <Row gutter={[10, 10]} wrap={true}>
        <Col span={12}>
          <BaseInput placeholder="title" name="title" label="Title" message="Title is required" />
        </Col>
        <Col span={12}>
          <Form.Item
            name="body"
            label="Descriptions"
            rules={[
              {
                required: true,
                message: 'Descriptions is required',
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={[10, 10]} align={'end'}>
        <BaseButton type="primary" htmlType="submit" text="Submit" isDisabled={disabled} />
      </Row>
    </Form>
  );
};

export default memo(PostForm);

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  postItem: PropTypes.object,
};
