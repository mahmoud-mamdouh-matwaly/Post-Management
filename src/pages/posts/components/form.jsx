import { useEffect, memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row, Input, Space } from 'antd';
import BaseButton from 'components/button';
import BaseInput from 'components/input';
const { TextArea } = Input;

const PostForm = props => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState(true);
  const { postItem, handleSubmit = () => {}, isView = false } = props;

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
    <Form
      form={form}
      name="form"
      layout={'vertical'}
      onFinish={onFinish}
      onFieldsChange={onFieldsChange}
      data-testid="postForm"
    >
      <Space.Compact direction={isView ? 'vertical' : 'horizontal'} block>
        <Col flex={'0 1 100%'} style={{ marginInline: 5 }}>
          <BaseInput placeholder="title" name="title" label="Title" message="Title is required" disabled={isView} />
        </Col>
        <Col flex={'0 1 100%'} style={{ marginInline: 5 }}>
          <Form.Item
            name="body"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Description is required',
              },
            ]}
          >
            <TextArea rows={4} disabled={isView} name="body" data-testid="body" />
          </Form.Item>
        </Col>
      </Space.Compact>
      {!isView ? (
        <Row gutter={[10, 10]} align={'end'}>
          <BaseButton type="primary" htmlType="submit" text="Submit" isDisabled={disabled} />
        </Row>
      ) : null}
    </Form>
  );
};

export default memo(PostForm);

PostForm.propTypes = {
  handleSubmit: PropTypes.func,
  postItem: PropTypes.object,
  isView: PropTypes.bool,
};
