import { IStyleType } from "@/index";
import { IConfigurableTheme, getInputComponentThemeDefaults } from "@/providers/theme";
import { nanoid } from '@/utils/uuid';
import { ReferenceListItemDto } from '@/apis/referenceList';
import { DataSourceType, ILabelValue } from '@/designer-components/dropdown/model';

export const getDataSourceList = (
  dataSource: DataSourceType,
  values: ILabelValue[],
  refList: ReferenceListItemDto[],
  urlList: ILabelValue<any>[] = [],
): ILabelValue[] => {
  switch (dataSource) {
    case 'values':
      return values;

    case 'referenceList':
      return (refList || [])?.map(({ id, item, itemValue }) => ({ id, value: itemValue, label: item }));
    case 'url':
      return urlList?.map((props) => (props?.id ? props : { ...props, id: nanoid() }));
  }
};

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
      width: '100%',
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
