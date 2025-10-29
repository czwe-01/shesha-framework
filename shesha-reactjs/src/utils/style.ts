import { isDefined } from "@/utils/nullables";

export interface DimensionValue {
  value: number;
  unit: 'px' | '%' | 'vw' | 'vh' | 'em' | 'rem' | 'auto' | 'none';
}

/**
 * Parse a dimension value into its numeric value and unit
 * @param value - The dimension value to parse (e.g., "50vw", "100%", 300, "auto")
 * @returns Parsed dimension object with value and unit, or null if invalid
 */
export const parseDimension = (value: string | number | null | undefined): DimensionValue | null => {
  if (!isDefined(value)) return null;

  if (typeof value === 'number') {
    return { value, unit: 'px' };
  }

  if (value === 'auto' || value === 'none') {
    return { value: 0, unit: value as 'auto' | 'none' };
  }

  // Match number with optional unit
  const match = /^(-?\d+(?:\.\d+)?)(px|%|vw|vh|em|rem)?$/.exec(value.trim());
  if (match) {
    return {
      value: parseFloat(match[1]),
      unit: (match[2] || 'px') as DimensionValue['unit'],
    };
  }

  return null;
};

/**
 * Add 'px' unit to bare numbers, preserve existing units
 * @param value - The value to add units to
 * @returns String with appropriate units, or undefined
 */
export const addPx = (value: number | string | null | undefined): string | undefined => {
  const parsed = parseDimension(value);
  if (!parsed) return undefined;

  if (parsed.unit === 'auto' || parsed.unit === 'none') {
    return parsed.unit;
  }

  return `${parsed.value}${parsed.unit}`;
};

/**
 * Check if a dimension value can be used in calc() expressions with additions
 * @param dimensionValue - The dimension value to check
 * @returns true if the value can be used in calc() with additions
 */
export const canAddToCalc = (dimensionValue: string | number | undefined): boolean => {
  if (!dimensionValue) return false;

  const parsed = parseDimension(dimensionValue);
  if (!parsed) return false;

  // Auto and none cannot be used in calc with additions
  if (parsed.unit === 'auto' || parsed.unit === 'none') {
    return false;
  }

  return true;
};

export const hasNumber = (str: string | number): boolean => typeof str === 'number' ? true : /\d/.test(str);

/**
 * Calculate dimension adjusted for designer mode by subtracting margins from a base dimension
 * @param baseDimension - The base dimension (usually '100%' in designer mode)
 * @param margin1 - First margin value to subtract (e.g., marginLeft)
 * @param margin2 - Second margin value to subtract (e.g., marginRight)
 * @returns Calculated dimension string or original value if calc not applicable
 */
export const calcDimensionWithMargins = (
  baseDimension: string | number | undefined,
  margin1: string | number | undefined,
  margin2: string | number | undefined
): string | number | undefined => {
  if (!baseDimension) return baseDimension;

  // If base dimension can't be used in calc, return as-is
  if (!canAddToCalc(baseDimension)) return baseDimension;

  const m1 = addPx(margin1) || '0px';
  const m2 = addPx(margin2) || '0px';

  return `calc(${baseDimension} - ${m1} - ${m2})`;
};

export const getTagStyle = (style: React.CSSProperties = {}, hasColor: boolean = false): React.CSSProperties => {
  const { backgroundColor, backgroundImage, borderColor, borderTopColor,
    borderLeftColor, borderRightColor, borderBottomColor, color, ...rest } = style;
  return hasColor ? { ...rest, margin: 0 } : style;
};
