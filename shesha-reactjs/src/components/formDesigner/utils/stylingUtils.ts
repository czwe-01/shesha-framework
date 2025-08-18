import React from 'react';
import { ComponentTypeInfo } from './componentTypeUtils';
import { ComponentDimensions } from './dimensionUtils';

export interface StyleConfig {
  marginTop?: number | string;
  marginBottom?: number | string;
  marginLeft?: number | string;
  marginRight?: number | string;
  paddingTop?: number | string;
  paddingBottom?: number | string;
  paddingLeft?: number | string;
  paddingRight?: number | string;
}

export const createRootContainerStyle = (
  dimensions: ComponentDimensions,
  stylingBox: StyleConfig,
  originalDimensions: any,
) => {
  const {
    marginTop,
    marginBottom = 5,
    marginLeft,
    marginRight,
  } = stylingBox;

  const baseStyle = {
    boxSizing: 'border-box' as const,
  };

  return {
    ...baseStyle,
    marginTop,
    marginBottom,
    marginLeft,
    marginRight,
    ...originalDimensions,
    width: dimensions.width,
    maxWidth: dimensions.maxWidth,
    minWidth: dimensions.minWidth,
    height: dimensions.height,
    minHeight: dimensions.minHeight,
    maxHeight: dimensions.maxHeight,
    flexBasis: dimensions.flexBasis,
  };
};

export const createFormItemStyle = (
  stylingBox: StyleConfig,
  formMode: string,
  dimensionsStyles: React.CSSProperties,
  typeInfo: ComponentTypeInfo,
  activeDevice: string,
  model: any
) => {
  const { isDataTableContext, isFileComponent, isInput } = typeInfo;
  const {
    marginLeft,
    marginRight,
    marginBottom = 5,
    marginTop,
  } = stylingBox;

  return {
    ...(formMode !== 'designer' && {
      marginLeft,
      marginRight,
      marginBottom,
      marginTop,
    }),
    ...dimensionsStyles,
    flexBasis: 'auto',
    width: isDataTableContext 
      ? '100%' 
      : isFileComponent 
        ? model[activeDevice]?.container?.dimensions?.width 
        : dimensionsStyles?.width || 'auto',
    height: isDataTableContext 
      ? '100%' 
      : isFileComponent 
        ? model[activeDevice]?.container?.dimensions?.height 
        : isInput 
          ? '' 
          : dimensionsStyles?.height,
  };
};