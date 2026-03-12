import { IStyleType } from "@/index";
import { IConfigurableTheme, getInputComponentThemeDefaults } from "@/providers/theme";

export const defaultStyles = (theme?: IConfigurableTheme): IStyleType => {
  const themeDefaults = getInputComponentThemeDefaults(theme);

  return {
    background: { type: 'color', color: '' },
    font: {
      weight: '400',
      size: 14,
      color: '#000',
      type: 'Segoe UI',
    },
    border: {
      border: {
        all: {
          width: 0,
          style: 'solid',
          color: 'transparent',
        },
      },
      radius: { all: 0 },
      borderType: 'all',
      radiusType: 'all',
    },
    dimensions: {
      width: 'auto',
      height: 'auto',
      minHeight: '0px',
      maxHeight: 'auto',
      minWidth: '0px',
      maxWidth: 'auto',
    },
    // Apply theme stylingBox as default if available
    stylingBox: themeDefaults?.stylingBox,
  };
};
