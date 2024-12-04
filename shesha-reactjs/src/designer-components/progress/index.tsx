import ConfigurableFormItem from '@/components/formDesigner/components/formItem';
import React from 'react';
import { IConfigurableFormComponent } from '@/providers/form/models';
import { getSettings } from './settings';
import { IToolboxComponent } from '@/interfaces';
import { LineOutlined } from '@ant-design/icons';
import { migrateCustomFunctions, migratePropertyName } from '@/designer-components/_common-migrations/migrateSettings';
import { ProgressProps } from 'antd';
import { ProgressType } from 'antd/lib/progress/progress';
import { ProgressWrapper } from './progressWrapper';
import { migrateFormApi } from '../_common-migrations/migrateFormApi1';
import { validateConfigurableComponentSettings } from '@/formDesignerUtils';

interface IProgressProps
  extends Omit<ProgressProps, 'style' | 'type' | 'size' | 'format' | 'success' | 'strokeColor'>,
  IConfigurableFormComponent {
  format?: string;
  progressType?: ProgressType;
  success?: string;
  strokeColor?: string;
  lineStrokeColor?: string;
  circleStrokeColor?: string;
}

const ProgressComponent: IToolboxComponent<IProgressProps> = {
  type: 'progress',
  name: 'Progress',
  icon: <LineOutlined />,
  isInput: true,
  isOutput: true,
  Factory: ({ model }) => {
    const {
      progressType,
      lineStrokeColor,
      circleStrokeColor,
      format,
      percent,
      status,
      showInfo,
      strokeColor,
      strokeLinecap,
      success,
      trailColor,
      steps,
      gapPosition,
      strokeWidth,
      width,
    } = model;

    if (model.hidden) return null;

    const getEvaluatedSuccessColor = () => {
      // tslint:disable-next-line:function-constructor
      return new Function(success)();
    };

    const getEvaluatedStrokeValue = () => {
      let color = strokeColor;
      let isLineOrCircle = false;

      if (progressType === 'line') {
        color = lineStrokeColor;
        isLineOrCircle = true;
      }

      if (progressType === 'circle') {
        color = circleStrokeColor;
        isLineOrCircle = true;
      }

      if (isLineOrCircle) {
        // tslint:disable-next-line:function-constructor
        return new Function(color)();
      } else {
        return color;
      }
    };

    const getEvaluatedFormat = (incomingPercent?: number, incomingSuccessPercent?: number) => {
      // tslint:disable-next-line:function-constructor
      return new Function('percent, successPercent', format)(incomingPercent, incomingSuccessPercent);
    };

    return (
      <ConfigurableFormItem model={model}>
        {(value) => {

          const perc = percent || value;

          return (
            <ProgressWrapper
              type={progressType}
              strokeColor={getEvaluatedStrokeValue()}
              format={getEvaluatedFormat}
              percent={perc}
              width={width}
              strokeWidth={strokeWidth}
              gapPosition={gapPosition}
              steps={steps}
              trailColor={trailColor}
              status={status}
              showInfo={showInfo}
              strokeLinecap={strokeLinecap}
              success={getEvaluatedSuccessColor()}
            />);
        }}
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: (data) => getSettings(data) as unknown as any,
  validateSettings: model => validateConfigurableComponentSettings(getSettings(model), model),
  migrator: (m) => m
    .add<IProgressProps>(0, (prev) => migratePropertyName(migrateCustomFunctions(prev)))
    .add<IProgressProps>(1, (prev) => ({...migrateFormApi.properties(prev)}))
  ,
};

export default ProgressComponent;
