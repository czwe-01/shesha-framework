import classNames from 'classnames';
import React, { FC, PropsWithChildren, ReactNode, useMemo, useState } from 'react';
import { ISidebarProps, SidebarPanelPosition } from './models';
import { SidebarPanel } from './sidebarPanel';
import { useStyles } from './styles/styles';
import { SizableColumns } from '../sizableColumns';
import { getPanelSizes } from './utilis';
import _ from 'lodash';

export interface ISidebarContainerProps extends PropsWithChildren<any> {
  /**
   * Left sidebar props
   */
  leftSidebarProps?: ISidebarProps;

  /**
   * Right sidebar props
   */
  rightSidebarProps?: ISidebarProps;

  /**
   * Container header
   */
  header?: ReactNode | (() => ReactNode);

  /**
   * sidebar width. By default it's 250px
   */
  sideBarWidth?: number;

  allowFullCollapse?: boolean;
}

export const SidebarContainer: FC<ISidebarContainerProps> = ({
  leftSidebarProps,
  rightSidebarProps,
  header,
  children,
  allowFullCollapse = false,
  noPadding,
}) => {
  const { styles } = useStyles();
  const [isOpenLeft, setIsOpenLeft] = useState(false);
  const [isOpenRight, setIsOpenRight] = useState(false);
  const renderSidebar = (side: SidebarPanelPosition) => {
    const sidebarProps = side === 'left' ? leftSidebarProps : rightSidebarProps;

    const hideFullCollapse = allowFullCollapse && !sidebarProps?.open;

    return sidebarProps && !hideFullCollapse ? (
      <SidebarPanel
        {...sidebarProps}
        allowFullCollapse={allowFullCollapse}
        side={side}
        setIsOpenGlobal={side === 'left' ? setIsOpenLeft : setIsOpenRight}
      />
    ) : null;
  };

  const sizes = useMemo(
    () => getPanelSizes(isOpenLeft, isOpenRight, leftSidebarProps, rightSidebarProps, allowFullCollapse),
    [isOpenRight, leftSidebarProps, rightSidebarProps, allowFullCollapse, isOpenLeft]
  );

  return (
    <div className={styles.sidebarContainer}>
      {header && (
        <div className={styles.sidebarContainerHeader}>{typeof header === 'function' ? header() : header}</div>
      )}

      <SizableColumns
        sizes={sizes?.sizes}
        expandToMin={false}
        minSize={sizes?.minSizes}
        maxSize={sizes?.maxSizes}
        gutterSize={8}
        gutterAlign="center"
        snapOffset={5}
        dragInterval={1}
        direction="horizontal"
        cursor="col-resize"
        className={classNames(styles.sidebarContainerBody)}
      >
        {renderSidebar('left')}

        <div
          className={classNames(
            styles.sidebarContainerMainArea,
            { 'both-open': leftSidebarProps?.open && rightSidebarProps?.open },
            { 'left-only-open': leftSidebarProps?.open && !rightSidebarProps?.open },
            { 'right-only-open': rightSidebarProps?.open && !leftSidebarProps?.open },
            { 'no-left-panel': !leftSidebarProps },
            { 'no-right-panel': !rightSidebarProps },
            { 'no-padding': noPadding },
            { 'allow-full-collapse': allowFullCollapse }
          )}
        >
          <div className={styles.sidebarContainerMainAreaBody}>{children}</div>
        </div>

        {renderSidebar('right')}
      </SizableColumns>
    </div>
  );
};
