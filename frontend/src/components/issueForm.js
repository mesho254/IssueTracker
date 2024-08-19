import React, { useEffect } from 'react';
import { Form, Input, Modal, message, Select } from 'antd';

const { Option } = Select;

const IssueForm = ({ visible, onCreate, onCancel, issue, loading }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (issue) {
      form.setFieldsValue(issue);
    } else {
      form.resetFields();
    }
  }, [issue, form]);

  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        onCreate(values);
      })
      .catch(() => {
        message.error('Please fill out all required fields.');
      });
  };

  return (
    <Modal
      visible={visible}
      title={issue ? 'Edit Issue' : 'Create New Issue'}
      okText={issue ? 'Update' : 'Create'}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={loading}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please input the title!' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please input the description!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: 'Please select the priority level!' }]}
        >
          <Select placeholder="Select priority level">
            <Option value="Low">Low</Option>
            <Option value="Normal">Normal</Option>
            <Option value="High">High</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default IssueForm;
