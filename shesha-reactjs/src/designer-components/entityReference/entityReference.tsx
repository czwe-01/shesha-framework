import React from 'react';
import { EntityReference, IEntityReferenceProps } from '@/components/entityReference';
import ConfigurableFormItem from '@/components/formDesigner/components/formItem';
import { LinkExternalOutlined } from '@/icons/linkExternalOutlined';
import { IToolboxComponent } from '@/interfaces';
import { IConfigurableFormComponent } from '@/providers/form/models';
import {
  migratePropertyName,
  migrateCustomFunctions,
  migrateReadOnly,
} from '@/designer-components/_common-migrations/migrateSettings';
import { isEntityReferencePropertyMetadata } from '@/interfaces/metadata';
import { migrateVisibility } from '@/designer-components/_common-migrations/migrateVisibility';
import { migrateNavigateAction } from '../_common-migrations/migrate-navigate-action';
import { migrateFormApi } from '../_common-migrations/migrateFormApi1';
import { getSettings } from './settingsForm';
import { validateConfigurableComponentSettings } from '@/formDesignerUtils';
import { migratePrevStyles } from '../_common-migrations/migrateStyles';
import { removeUndefinedProps } from '@/utils/object';
import { getStyle, pickStyleFromModel } from '@/index';
import { ShaIconTypes } from '@/components/iconPicker';

export type IActionParameters = [{ key: string; value: string }];

export interface IEntityReferenceControlProps extends IEntityReferenceProps, IConfigurableFormComponent {
  /** @deprecated Use iconName instead */
  icon?: string;
}

const EntityReferenceComponent: IToolboxComponent<IEntityReferenceControlProps> = {
  type: 'entityReference',
  name: 'Entity Reference',
  isInput: true,
  isOutput: true,
  icon: <LinkExternalOutlined />,
  Factory: ({ model: passedModel }) => {
    const { style, hidden, readOnly, ...model } = passedModel;

    if (hidden) return null;

    const jsStyle = getStyle(passedModel.style, passedModel);
    const styling = JSON.parse(model.stylingBox || '{}');
    const stylingBoxAsCSS = pickStyleFromModel(styling);

    var allStylesJS: React.CSSProperties = removeUndefinedProps({
      ...jsStyle,
      ...stylingBoxAsCSS,
    });
    const paddingStyles = removeUndefinedProps({
      paddingTop: allStylesJS.paddingTop,
      paddingRight: allStylesJS.paddingRight,
      paddingBottom: allStylesJS.paddingBottom,
      paddingLeft: allStylesJS.paddingLeft,
      padding: allStylesJS.padding,
    });
    allStylesJS = Object.keys(allStylesJS)
      .filter((key) => !paddingStyles[key])
      .reduce((obj, key) => {
        obj[key] = allStylesJS[key];
        return obj;
      }, {});
    const marginStyles = removeUndefinedProps({
      marginTop: allStylesJS.marginTop,
      marginRight: allStylesJS.marginRight,
      marginBottom: allStylesJS.marginBottom,
      marginLeft: allStylesJS.marginLeft,
      margin: allStylesJS.margin,
    });
    allStylesJS = Object.keys(allStylesJS)
      .filter((key) => !marginStyles[key])
      .reduce((obj, key) => {
        obj[key] = allStylesJS[key];
        return obj;
      }, {});
    const borderStyles = removeUndefinedProps({
      borderTop: allStylesJS.borderTop,
      borderRight: allStylesJS.borderRight,
      borderBottom: allStylesJS.borderBottom,
      borderLeft: allStylesJS.borderLeft,
      border: allStylesJS.border,
      borderRadius: allStylesJS.borderRadius,
      borderColor: allStylesJS.borderColor,
      borderWidth: allStylesJS.borderWidth,
      borderStyle: allStylesJS.borderStyle,
    });
    allStylesJS = Object.keys(allStylesJS)
      .filter((key) => !borderStyles[key])
      .reduce((obj, key) => {
        obj[key] = allStylesJS[key];
        return obj;
      }, {});
    const background = removeUndefinedProps({
      backgroundColor: allStylesJS.backgroundColor,
      background: allStylesJS.background,
    });
    allStylesJS = Object.keys(allStylesJS)
      .filter((key) => !background[key])
      .reduce((obj, key) => {
        obj[key] = allStylesJS[key];
        return obj;
      }, {});
    const dimensionStyles = removeUndefinedProps({
      width: allStylesJS.width,
      minWidth: allStylesJS.minWidth,
      maxWidth: allStylesJS.maxWidth,
      height: allStylesJS.height,
      minHeight: allStylesJS.minHeight,
      maxHeight: allStylesJS.maxHeight,
    });
    allStylesJS = Object.keys(allStylesJS)
      .filter((key) => !dimensionStyles[key])
      .reduce((obj, key) => {
        obj[key] = allStylesJS[key];
        return obj;
      }, {});

    const allStylesStr = JSON.stringify(allStylesJS);
    const allStylesWithoutQuotes = allStylesStr.replace(/"([^"]+)":/g, '$1:').replace(/'([^']+)':/g, '$1:');
    const finalStyle = `return ${allStylesWithoutQuotes}`;

    return (
      <ConfigurableFormItem model={model}>
        {(value) => {
          return (
            <div
              style={{
                padding: 0,
                margin: 0,
                boxSizing: 'border-box',
                width: marginStyles.marginLeft || marginStyles.marginRight ? 'auto' : dimensionStyles.width ?? 'fit-content',
                borderRadius: '5px',
                ...paddingStyles,
                ...marginStyles,
                ...borderStyles,
                ...background,
                ...dimensionStyles,
              }}
            >
              <EntityReference {...model} value={value} style={finalStyle} />
            </div>
          );
        }}
      </ConfigurableFormItem>
    );
  },
  settingsFormMarkup: (data) => getSettings(data),
  validateSettings: (model) => validateConfigurableComponentSettings(getSettings(model), model),
  migrator: (m) =>
    m
      .add<IEntityReferenceControlProps>(0, (prev) => {
        return {
          ...prev,
          formSelectionMode: 'name',
          entityReferenceType: 'Quickview',
          quickviewWidth: 600,
          displayProperty: '',
          handleFail: false,
          handleSuccess: false,
          style: prev.style,
          stylingBox: prev.stylingBox,
        };
      })
      .add<IEntityReferenceControlProps>(1, (prev) => migratePropertyName(migrateCustomFunctions(prev)))
      .add<IEntityReferenceControlProps>(2, (prev) => migrateVisibility(prev))
      .add<IEntityReferenceControlProps>(3, (prev) => ({
        ...prev,
        onSuccess: migrateNavigateAction(prev.onSuccess),
        onFail: migrateNavigateAction(prev.onFail),
      }))
      .add<IEntityReferenceControlProps>(4, (prev) => migrateReadOnly(prev, 'editable'))
      .add<IEntityReferenceControlProps>(5, (prev, context) => ({
        ...prev,
        footerButtons: context.isNew ? 'default' : (prev.footerButtons ?? prev.showModalFooter) ? 'default' : 'none',
      }))
      .add<IEntityReferenceControlProps>(6, (prev) => ({ ...migrateFormApi.eventsAndProperties(prev) }))
      .add<IEntityReferenceControlProps>(7, (prev) => ({ ...migratePrevStyles(prev) }))
      .add<IEntityReferenceControlProps>(8, (prev) => ({
        ...prev,
        iconName: (prev?.iconName as ShaIconTypes) ?? (prev?.icon as ShaIconTypes),
      })),
  linkToModelMetadata: (model, propMetadata): IEntityReferenceControlProps => {
    return {
      ...model,
      entityType: isEntityReferencePropertyMetadata(propMetadata) ? propMetadata.entityType : undefined,
    };
  },
};

export default EntityReferenceComponent;
