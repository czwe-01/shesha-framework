import { Tooltip } from 'antd';
import { ReactNode } from 'react';
import * as React from 'react';
import { ShaIcon } from '../shaIcon';
import { customIcons } from './icons';
import * as antdIcons from '@ant-design/icons';
import { isKeyOf } from '@/utils/object';

type IconProps = {
  icon: string | React.ReactNode;
  hint?: string | undefined;
  style?: React.CSSProperties | undefined;
  className?: string | undefined;
};

/**
 * These icons are mixed freely with text - in radio buttons, labels and settings rows - and the SVGs
 * they wrap sit on the text baseline by default, which left them a couple of pixels low wherever they
 * appeared. An inline-flex box centres the glyph on the line box instead, and `line-height: 1` stops a
 * tall inherited line-height from adding leading of its own.
 */
const ICON_WRAPPER_STYLE: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
  verticalAlign: 'middle',
};

export const Icon = ({
  icon,
  hint,
  style,
  className,
}: IconProps): ReactNode => {
  const icons = antdIcons;
  const wrapperStyle: React.CSSProperties = { ...ICON_WRAPPER_STYLE, ...style };

  if (typeof icon !== 'string') {
    if (React.isValidElement(icon))
      return <Tooltip title={hint}><span style={wrapperStyle} className={className}>{icon}</span></Tooltip>;
    return icon;
  }

  if (isKeyOf(icon, icons)) {
    return (
      <Tooltip title={hint}>
        <span style={wrapperStyle} className={className}><ShaIcon iconName={icon} style={style} /></span>
      </Tooltip>
    );
  }

  if (isKeyOf(icon, customIcons)) {
    return (
      <Tooltip title={hint}>
        <span style={wrapperStyle} className={className}>{customIcons[icon]}</span>
      </Tooltip>
    );
  }

  return icon;
};

export default Icon;
