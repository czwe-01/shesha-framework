import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { IToolboxComponent } from '@/interfaces';
import { FormMarkup } from '@/providers/form/models';
import { HomeOutlined } from '@ant-design/icons';
import ConfigurableFormItem from '@/components/formDesigner/components/formItem';
import settingsFormJson from './settingsForm.json';
import { EditableTagGroup, ValidationErrors } from '@/components';
import { getStyle, pickStyleFromModel, validateConfigurableComponentSettings } from '@/providers/form/utils';
import { DataTypes } from '@/interfaces/dataTypes';
import { IEditableTagGroupComponentProps } from './interfaces';
import { migrateCustomFunctions, migratePropertyName, migrateReadOnly } from '@/designer-components/_common-migrations/migrateSettings';
import { migrateVisibility } from '@/designer-components/_common-migrations/migrateVisibility';
import { migrateFormApi } from '../_common-migrations/migrateFormApi1';
import { useSheshaApplication } from '@/providers';
import { getSizeStyle } from '../_settings/utils/dimensions/utils';
import { getBorderStyle } from '../_settings/utils/border/utils';
import { getFontStyle } from '../_settings/utils/font/utils';
import { getShadowStyle } from '../_settings/utils/shadow/utils';
import { getBackgroundStyle } from '../_settings/utils/background/utils';
import { isValidGuid } from '@/components/formDesigner/components/utils';
import { removeUndefinedProps } from '@/utils/object';
import { get } from 'nested-property';
import { getSettings } from './settingsForm';

const settingsForm = settingsFormJson as FormMarkup;

const EditableTagGroupComponent: IToolboxComponent<IEditableTagGroupComponentProps> = {
  type: 'editableTagGroup',
  name: 'Tags Outlined',
  icon: <HomeOutlined />,
  isInput: true,
  isOutput: true,
  dataTypeSupported: ({ dataType }) => dataType === DataTypes.array,
  Factory: ({ model }) => {
    const { backendUrl, httpHeaders } = useSheshaApplication();

    // const { styles } = useStyles({ fontFamily: model?.font?.type, fontWeight: model?.font?.weight, textAlign: model?.font?.align });
    const dimensions = model?.dimensions;
    const border = model?.border;
    const font = model?.font;
    const shadow = model?.shadow;
    const background = model?.background;
    const jsStyle = getStyle(model.style);

    const dimensionsStyles = useMemo(() => getSizeStyle(dimensions), [dimensions]);
    const borderStyles = useMemo(() => getBorderStyle(border, jsStyle), [border]);
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
      ...stylingBoxAsCSS,
      ...dimensionsStyles,
      ...borderStyles,
      ...fontStyles,
      ...backgroundStyles,
      ...shadowStyles
    });


    const finalStyle = removeUndefinedProps({ ...additionalStyles, fontWeight: Number(model?.font?.weight?.split(' - ')[0]) || 400 });

    return (
      <ConfigurableFormItem model={model}>
        {(value, onChange) => (<EditableTagGroup value={value} defaultValue={model?.defaultValue} onChange={onChange} readOnly={model.readOnly} styles={{ prefix: finalStyle }} />)}
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: (data) => getSettings(data),
  migrator: (m) => m
    .add<IEditableTagGroupComponentProps>(0, (prev) => migratePropertyName(migrateCustomFunctions(prev)))
    .add<IEditableTagGroupComponentProps>(1, (prev) => migrateVisibility(prev))
    .add<IEditableTagGroupComponentProps>(2, (prev) => migrateReadOnly(prev))
    .add<IEditableTagGroupComponentProps>(3, (prev) => ({ ...migrateFormApi.eventsAndProperties(prev) }))
  ,
  validateSettings: model => validateConfigurableComponentSettings(settingsForm, model),
};

export default EditableTagGroupComponent;
