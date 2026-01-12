import { CSSProperties } from 'react';
import { addPx, hasNumber } from '@/utils/style';

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

/**
 * Default margin values for form items with inputs vs non-input components
 */
export const DEFAULT_FORM_ITEM_MARGINS = {
  input: {
    vertical: '5px',
    horizontal: '3px',
  },
  nonInput: {
    vertical: '0px',
    horizontal: '0px',
  },
} as const;

/**
 * Creates the root container style for wrapping components in designer mode.
 * Margins are applied as padding to the wrapper, and wrapper dimensions are expanded
 * to accommodate the padding (height = height + marginTop + marginBottom).
 * This ensures the wrapper is always sized correctly to contain the component plus margins.
 */
export const createRootContainerStyle = (
  dimensions: CSSProperties,
  margins: StyleConfig,
  isInput: boolean,
): CSSProperties => {
  const defaultMargins = isInput
    ? DEFAULT_FORM_ITEM_MARGINS.input
    : DEFAULT_FORM_ITEM_MARGINS.nonInput;

  // Convert margins to padding
  const paddingTop = addPx(margins?.marginTop ?? defaultMargins.vertical);
  const paddingBottom = addPx(margins?.marginBottom ?? defaultMargins.vertical);
  const paddingLeft = addPx(margins?.marginLeft ?? defaultMargins.horizontal);
  const paddingRight = addPx(margins?.marginRight ?? defaultMargins.horizontal);

  // Calculate wrapper dimensions including padding
  const width = dimensions.width && hasNumber(dimensions.width)
    ? `calc(${dimensions.width} + ${paddingLeft} + ${paddingRight})`
    : dimensions.width;

  const height = dimensions.height && hasNumber(dimensions.height)
    ? `calc(${dimensions.height} + ${paddingTop} + ${paddingBottom})`
    : dimensions.height;

  const minHeight = dimensions.minHeight && hasNumber(dimensions.minHeight)
    ? `calc(${dimensions.minHeight} + ${paddingTop} + ${paddingBottom})`
    : dimensions.minHeight;

  const maxHeight = dimensions.maxHeight && hasNumber(dimensions.maxHeight)
    ? `calc(${dimensions.maxHeight} + ${paddingTop} + ${paddingBottom})`
    : dimensions.maxHeight;

  const minWidth = dimensions.minWidth && hasNumber(dimensions.minWidth)
    ? `calc(${dimensions.minWidth} + ${paddingLeft} + ${paddingRight})`
    : dimensions.minWidth;

  const maxWidth = dimensions.maxWidth && hasNumber(dimensions.maxWidth)
    ? `calc(${dimensions.maxWidth} + ${paddingLeft} + ${paddingRight})`
    : dimensions.maxWidth;

  return {
    boxSizing: 'border-box' as const,
    // Expanded dimensions to accommodate padding
    width,
    height,
    minWidth,
    maxWidth,
    minHeight,
    maxHeight,
    flexBasis: dimensions.flexBasis,
    // Apply margins as padding
    paddingTop,
    paddingBottom,
    paddingLeft,
    paddingRight,
  };
};

/**
 * Creates a stylingBox configuration with margins removed (set to 0).
 * Used in designer mode to prevent double-application of margins
 * since the wrapper already handles margins as padding.
 */
export const removeMarginsFromStylingBox = (stylingBox: CSSProperties): string => {
  if (!stylingBox) return JSON.stringify({});

  try {
    return JSON.stringify({
      ...stylingBox,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
    });
  } catch (error) {
    console.warn('Failed to parse stylingBox JSON, returning empty object:', error);
    return JSON.stringify({});
  }
};
