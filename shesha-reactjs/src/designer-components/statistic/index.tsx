import { ValidationErrors } from '@/components';
import ConfigurableFormItem from '@/components/formDesigner/components/formItem';
import ShaIcon from '@/components/shaIcon';
import ShaStatistic from '@/components/statistic';
import { migrateCustomFunctions, migratePropertyName } from '@/designer-components/_common-migrations/migrateSettings';
import { IToolboxComponent } from '@/interfaces';
import { IInputStyles, useFormData, useSheshaApplication } from '@/providers';
import { IConfigurableFormComponent } from '@/providers/form/models';
import { evaluateString, getStyle, pickStyleFromModel, useAvailableConstantsData, validateConfigurableComponentSettings } from '@/providers/form/utils';
import { toSizeCssProp } from '@/utils/form';
import { removeUndefinedProps } from '@/utils/object';
import { BarChartOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import { CSSProperties } from 'styled-components';
import { migrateFormApi } from '../_common-migrations/migrateFormApi1';
import { getBackgroundStyle } from '../_settings/utils/background/utils';
import { getBorderStyle } from '../_settings/utils/border/utils';
import { getSizeStyle } from '../_settings/utils/dimensions/utils';
import { getFontStyle } from '../_settings/utils/font/utils';
import { getShadowStyle } from '../_settings/utils/shadow/utils';
import { getSettings } from './settingsForm';
import { isValidGuid } from '@/components/formDesigner/components/utils';

interface IStatisticComponentProps extends IInputStyles, IConfigurableFormComponent {
  value?: string | number;
  title?: string | number;
  valueStyle?: string;
  titleStyle?: string;
  prefixIcon?: string;
  suffixIcon?: string;
}

const StatisticComponent: IToolboxComponent<IStatisticComponentProps> = {
  type: 'statistic',
  name: 'Statistic',
  icon: <BarChartOutlined />,
  isInput: true,
  isOutput: true,
  Factory: ({ model: passedModel }) => {
    const allData = useAvailableConstantsData();
    
    const { data: formData } = useFormData();
    const { style, valueStyle, titleStyle, prefixIcon, suffixIcon, ...model } = passedModel;
    const { backendUrl, httpHeaders } = useSheshaApplication();

    const dimensions = model?.dimensions;
    const border = model?.border;
    const font = model?.font;
    const shadow = model?.shadow;
    const background = model?.background;
    const jsStyle = getStyle(passedModel.style, model);

    const dimensionsStyles = useMemo(() => getSizeStyle(dimensions), [dimensions]);
    const borderStyles = useMemo(() => getBorderStyle(border, jsStyle), [model.border]);
    const fontStyles = useMemo(() => getFontStyle(font), [font]);
    const [backgroundStyles, setBackgroundStyles] = useState({});
    const shadowStyles = useMemo(() => getShadowStyle(shadow), [shadow]);

    useEffect(() => {
      const fetchStyles = async () => {
        const storedImageUrl = background?.storedFile?.id && background?.type === 'storedFile'
          ? await fetch(`${backendUrl}/api/StoredFile/Download?id=${background?.storedFile?.id}`,
            { headers: { ...httpHeaders, "Content-Type": "application/octet-stream" } })
            .then((response) => {
              return response.blob();
            })
            .then((blob) => {
              return URL.createObjectURL(blob);
            }) : '';

        const style = await getBackgroundStyle(background, jsStyle, storedImageUrl);
        setBackgroundStyles(style);
      };

      fetchStyles();
    }, [background, background?.gradient?.colors, backendUrl, httpHeaders]);

    if (model?.background?.type === 'storedFile' && model?.background.storedFile?.id && !isValidGuid(model?.background.storedFile.id)) {
      return <ValidationErrors error="The provided StoredFileId is invalid" />;
    }

    const styling = JSON.parse(model.stylingBox || '{}');
    const stylingBoxAsCSS = pickStyleFromModel(styling);

    const additionalStyles: CSSProperties = removeUndefinedProps({
      height: toSizeCssProp(model.height),
      width: toSizeCssProp(model.width),
      borderWidth: model.hideBorder ? 0 : model.borderSize,
      borderRadius: model.borderRadius,
      borderStyle: model.borderType,
      borderColor: model.borderColor,
      backgroundColor: model.backgroundColor,
      color: model.fontColor,
      fontWeight: model.fontWeight,
      fontSize: model.font?.size,
      textAlign: model.font?.align,
      ...stylingBoxAsCSS,
      ...dimensionsStyles,
      ...borderStyles,
      ...fontStyles,
      ...backgroundStyles,
      ...shadowStyles
    });

    return (
          <ConfigProvider
            theme={{
              components: {
                Statistic: {
                  fontFamily: model?.font?.type,
                  contentFontSize: model?.font?.size,
                  fontSize: model?.font?.size,
                  colorText: model?.font?.color,
                },
              },
              token: {
                colorText: model?.font?.color,
                colorTextDescription: model?.font?.color,
                fontSize: model?.font?.size,
              }
            }}
          >
            <ShaStatistic
              value={passedModel.value}
              title={<div style={{textAlign: model.font.align, ...getStyle(titleStyle, formData)}}>{passedModel.title}</div>}
              prefix={prefixIcon ? <ShaIcon iconName={prefixIcon as any} /> : null}
              suffix={suffixIcon ? <ShaIcon iconName={suffixIcon as any} /> : null}
              style={{...getStyle(style, formData), ...additionalStyles}}
              valueStyle={{textAlign: model.font.align, fontSize: model.font.size, ...getStyle(valueStyle, formData)}}
            />
        </ConfigProvider>
    );
  },
  settingsFormMarkup: (data) => getSettings(data),
  validateSettings: (model) => validateConfigurableComponentSettings(getSettings(model), model),
  migrator: (m) => m
    .add<IStatisticComponentProps>(1, (prev) => ({ ...migrateFormApi.properties(prev) }))
    .add<IStatisticComponentProps>(2, (prev) => {
      const styles = {
        style: prev.style,
        valueStyle: prev.valueStyle,
        titleStyle: prev?.titleStyle,
        hideBorder: prev.hideBorder,
      };

      return { ...prev, desktop: { ...styles }, tablet: { ...styles }, mobile: { ...styles } };
    })
  ,
};

export default StatisticComponent;