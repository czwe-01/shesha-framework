import React from 'react';
import { validateConfigurableComponentSettings } from '@/formDesignerUtils';
import {  IToolboxComponent } from '@/interfaces/formDesigner';
import { IConfigurableFormComponent } from '@/providers/form/models';
import { ConfigurableFormItem } from '@/index';
import {getSettings} from './settings';
import { LineHeightOutlined } from '@ant-design/icons';
import MaskedText from '@/components/maskedText';

export interface IMaskedTextComponetProps extends IConfigurableFormComponent {
    startMask: number;
    endMask: number;
    mask: string;
    value: string;
    disabled: boolean;
}


const MaskedTextComponent: IToolboxComponent<IMaskedTextComponetProps> = {
  type: 'maskedText',
  name: 'MaskedText',
   icon: <LineHeightOutlined />,
  isInput: true,
  tooltip: 'Complete Typography component that combines Text, Paragraph and Title',
  Factory: ({ model }) => (
    <ConfigurableFormItem model={{ ...model, hideLabel: model.hideLabel }}>
      {
      (value) => <MaskedText {...model} value={value? value : "Phumudzo"} disabled={model.disabled || model.readOnly} mask={model.mask} readOnly={model.readOnly}/>
      }
    </ConfigurableFormItem>
  ),
   settingsFormMarkup: getSettings(),
  validateSettings: model => validateConfigurableComponentSettings(getSettings(), model)
};

export default MaskedTextComponent;
