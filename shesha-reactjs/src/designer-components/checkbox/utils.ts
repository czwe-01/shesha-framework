import { IStyleType } from '@/index';
import { IConfigurableTheme, getInputComponentThemeDefaults } from "@/providers/theme";

export const defaultStyles = (theme?: IConfigurableTheme): IStyleType => {
  const themeDefaults = getInputComponentThemeDefaults(theme);
  
  return {
    background: { type: 'color', color: '' },
    font: {
      weight: '400',
      size: 14,
      color: '',
    },
    border: {
      border: {
        all: {
          width: 1,
          style: 'solid',
          color: '#d9d9d9',
        },
      },
      radius: { all: 4 },
      borderType: 'all',
      radiusType: 'all',
    },
    dimensions: {
      width: '16px',
      height: '16px',
      minHeight: '0px',
      maxHeight: 'auto',
      minWidth: '0px',
      maxWidth: 'auto',
    },
    // Apply theme stylingBox as default if available
    stylingBox: themeDefaults.stylingBox,
  };
};
