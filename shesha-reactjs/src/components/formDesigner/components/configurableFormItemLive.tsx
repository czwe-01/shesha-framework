import React, { FC, useMemo } from 'react';
import { Form, FormItemProps } from 'antd';
import { getFieldNameFromExpression, getValidationRules } from '@/providers/form/utils';
import classNames from 'classnames';
import { useCanvas, useFormItem, useShaFormInstance } from '@/providers';
import { IConfigurableFormItemProps } from './model';
import { ConfigurableFormItemContext } from './configurableFormItemContext';
import { ConfigurableFormItemForm } from './configurableFormItemForm';
import { useFormDesignerComponentGetter } from '@/providers/form/hooks';
import { useStyles } from './styles';
import { useFormComponentStyles } from '@/hooks/formComponentHooks';

export const ConfigurableFormItemLive: FC<IConfigurableFormItemProps> = ({
  children,
  model,
  valuePropName,
  initialValue,
  className,
  labelCol,
  wrapperCol,
}) => {
  const { getPublicFormApi, formMode, form } = useShaFormInstance();
  const getFormData = getPublicFormApi().getFormData;
  const formItem = useFormItem();
  const { namePrefix, wrapperCol: formItemWrapperCol, labelCol: formItemlabelCol } = formItem;
  const getToolboxComponent = useFormDesignerComponentGetter();
  const { activeDevice } = useCanvas();
  const { styles } = useStyles(form.settings.layout);

  const { dimensionsStyles, stylingBoxAsCSS } = useFormComponentStyles(model?.[activeDevice] || model);

  const layout = useMemo(() => {
    // Make sure the `wrapperCol` and `labelCol` from `FormItemProver` override the ones from the main form
    return { labelCol: formItemlabelCol || labelCol, wrapperCol: formItemWrapperCol || wrapperCol };
  }, [formItemlabelCol, formItemWrapperCol]);

  const { hideLabel, hidden } = model;
  if (hidden) return null;

  const propName = namePrefix && !model.initialContext
    ? namePrefix + '.' + model.propertyName
    : model.propertyName;

    const component = getToolboxComponent(model.type) as any;
  const isDataTableContext = component?.type === 'datatableContext';
  const isFileList = component?.type === 'attachmentsEditor';
  const isFileUpload = component?.type === 'fileUpload';
  const isInput = component?.isInput;
  const isPasswordCombo = component?.type === 'passwordCombo';

  const {
    marginLeft,
    marginRight,
    marginBottom = 5,
    marginTop,
  } = stylingBoxAsCSS;

  const formItemProps: FormItemProps = {
    className: classNames(className, styles.formItem, form.settings.layout),
    label: hideLabel ? null : model.label,
    labelAlign: model.labelAlign,
    hidden: model.hidden,
    style: {
      ...(formMode !== 'designer' && {
        marginLeft,
        marginRight,
        marginBottom,
        marginTop,
      }),
      ...dimensionsStyles,
      flexBasis: 'auto',
      width: isDataTableContext ? '100%' : isFileList || isFileUpload ? model[activeDevice]?.container?.dimensions?.width : dimensionsStyles?.width || 'auto',
      height: isDataTableContext ? '100%' : isFileList || isFileUpload ? model[activeDevice]?.container?.dimensions?.height : isPasswordCombo || isInput ? '' : dimensionsStyles?.height,
    },
    valuePropName: valuePropName,
    initialValue: initialValue,
    tooltip: model.description,
    rules: model.hidden ? [] : getValidationRules(model, { getFormData }),
    labelCol: layout?.labelCol,
    wrapperCol: hideLabel ? { span: 24 } : layout?.wrapperCol,
    //layout: model.layout, this property appears to have been removed from the Ant component
    name: model.context ? undefined : getFieldNameFromExpression(propName),
  };

  if (typeof children === 'function') {
    if (model.context) {
      return (
        <ConfigurableFormItemContext
          componentId={model.id}
          formItemProps={formItemProps}
          valuePropName={valuePropName}
          propertyName={propName}
          contextName={model.context}
        >
          {children}
        </ConfigurableFormItemContext>
      );
    } else {
      return (
        <ConfigurableFormItemForm
          formItemProps={formItemProps}
          valuePropName={valuePropName}
        >
          {children}
        </ConfigurableFormItemForm>
      );
    }
  } else {
    // Use standard Form.Item for components without binding support
    return (
      <Form.Item {...formItemProps}>{children}</Form.Item>
    );
  }
};