import React from 'react';
import { validateConfigurableComponentSettings } from '@/formDesignerUtils';
import {  IToolboxComponent } from '@/interfaces/formDesigner';
import { IConfigurableFormComponent } from '@/providers/form/models';
import { ConfigurableFormItem, useFormData } from '@/index';
import {getSettings} from './settings';
import { LineHeightOutlined } from '@ant-design/icons';
import MaskedText from '@/components/maskedText';
import { Variant } from 'antd/lib/form/hooks/useVariants';

export interface IMaskedTextComponetProps extends IConfigurableFormComponent {
    startMask: number;
    endMask: number;
    mask: string;
    value: string;
    disabled: boolean;
    placeholder: string;
    hideBorder: boolean;
    variant: Variant;
}

const MaskedTextComponent: IToolboxComponent<IMaskedTextComponetProps> = {
  type: 'maskedText',
  name: 'MaskedText',
   icon: <LineHeightOutlined />,
  isInput: true,
  tooltip: 'Complete Typography component that combines Text, Paragraph and Title',
  Factory: ({ model }) => {

      const { data: formData } = useFormData();

      const inputProps = {
      className: 'sha-input',
      placeholder: model.placeholder,
      maxLength: model.validate?.maxLength,
      size: model.size,
      disabled: model.readOnly,
      readOnly: model.readOnly,
    };

    return <ConfigurableFormItem model={{ ...model, hideLabel: model.hideLabel }}>
      {
      () => <MaskedText {...model} formData={formData} {...inputProps} value={model.value} disabled={model.disabled || model.readOnly} mask={model.mask} readOnly={model.readOnly}/>
      }
    </ConfigurableFormItem>
},
   settingsFormMarkup: getSettings(),
  validateSettings: model => validateConfigurableComponentSettings(getSettings(), model)
};

export default MaskedTextComponent;
