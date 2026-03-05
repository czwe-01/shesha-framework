import { SmileOutlined } from '@ant-design/icons';
import { Form, Input, Space } from 'antd';
import React, { FC } from 'react';
import { IConfigurableTheme } from '@/providers/theme/contexts';
import { useFormComponentStyles } from '@/index';

interface FormExampleProps {
  theme?: IConfigurableTheme;
}

const FormExample: FC<FormExampleProps> = ({ theme }) => {
  const inputSettings = theme?.inputComponents;
  const formLayout = theme?.formLayout;
  const labelAlign = inputSettings?.labelAlign;

  // Build form item layout based on settings
  const formItemLayout = {
    labelCol: { span: inputSettings?.labelSpan ?? 6 },
    wrapperCol: { span: inputSettings?.contentSpan ?? 18 },
    // Label align to mean we set for layout to vertical so don't apply label align
    labelAlign: labelAlign !== 'top' ? labelAlign : null,
  };

  const { fullStyle } = useFormComponentStyles({ ...inputSettings, jsStyle: '' });
  const styles = { ...fullStyle, backgroundColor: theme?.componentBackground };


  return (
    <Form
      layout={formLayout?.layout === 'horizontal' || inputSettings?.labelAlign !== 'top' ? 'horizontal' : 'vertical'}
      {...formItemLayout}
      size="small"
      colon={inputSettings?.labelColon ?? true}
      style={{ width: '100%' }}
    >
      <Space direction="vertical" style={{ width: '100%' }}>
        <Form.Item
          label="Text Input"
          validateStatus="success"
        >
          <Input placeholder="Enter text" defaultValue="Sample text" style={styles} />
        </Form.Item>
        <Form.Item
          label="Failed"
          validateStatus="error"
          help="This field has an error"
        >
          <Input placeholder="Error input" style={styles} />
        </Form.Item>

        <Form.Item
          label="Warning"
          validateStatus="warning"
        >
          <Input placeholder="Warning input" prefix={<SmileOutlined />} style={styles} />
        </Form.Item>

        <Form.Item
          label="Validating"
          validateStatus="validating"
        >
          <Input placeholder="Warning input" prefix={<SmileOutlined />} style={styles} />
        </Form.Item>
      </Space>
    </Form>
  );
};

export default FormExample;
