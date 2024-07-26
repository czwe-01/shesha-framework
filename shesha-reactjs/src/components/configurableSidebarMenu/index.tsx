import React, { FC, useMemo } from 'react';
import { ConfigurableApplicationComponent, ISettingsEditorProps } from '@/components/configurableComponent';
import { SidebarMenu } from '@/components/sidebarMenu';
import { ISidebarMenuItem, SidebarMenuProvider } from '@/providers/sidebarMenu';
import { ComponentSettingsModal } from './settingsModal';
import { MenuTheme } from 'antd/lib/menu/MenuContext';
import CustomErrorBoundary from '@/components/customErrorBoundary';
import { migrateToConfigActions } from './migrations/migrateToConfigActions';
import { RebaseEditOutlined } from '@/icons/rebaseEditOutlined';
import { Button } from 'antd';
import { migrateFunctionToProp } from '@/designer-components/_common-migrations/migrateSettings';

export interface ISideBarMenuProps {
  items: ISidebarMenuItem[];
  version?: number;
}

const EmptySidebarProps: ISideBarMenuProps = {
  items: [],
};

export interface IConfigurableSidebarMenuProps {
  theme?: MenuTheme;
  defaultSettings?: ISideBarMenuProps;
  name: string;
  isApplicationSpecific: boolean;
}

const emptyItems = [];

export const ConfigurableSidebarMenu: FC<IConfigurableSidebarMenuProps> = props => {

  const editor = (editorProps: ISettingsEditorProps<ISideBarMenuProps>) => {
    return (
      <ComponentSettingsModal
        title='Sidebar Menu Configuration'
        settings={editorProps.settings ?? EmptySidebarProps}
        onSave={editorProps.onSave}
        onCancel={editorProps.onCancel}
      />
    );
  };
  const memoizedDefaults = useMemo(() => props.defaultSettings ?? { items: [] }, [props.defaultSettings]);

  return (
    <CustomErrorBoundary>
      <ConfigurableApplicationComponent<ISideBarMenuProps>
        defaultSettings={memoizedDefaults}
        settingsEditor={{
          render: editor,
        }}
        name={props.name}
        isApplicationSpecific={props.isApplicationSpecific}
        migrator={m => m
          .add(1, prev => migrateToConfigActions(prev))
          .add(2, prev => {
            const { items } = prev;
            const newItems = items.map(item => migrateFunctionToProp(item as any, 'hidden', 'visibility', null, true));
            return { ...prev, items: newItems };
          })
        }
      >
        {(componentState, BlockOverlay) => {
          return (
            <div className={`sidebar ${componentState.wrapperClassName}`}>
              <BlockOverlay>
                <div className='sha-configurable-sidemenu-button-wrapper'>
                  <Button title='Edit sidebar menu' shape='default' icon={<RebaseEditOutlined />} />
                </div>
              </BlockOverlay>

              <SidebarMenuProvider items={componentState.settings?.items ?? emptyItems}>
                <SidebarMenu theme={props.theme} />
              </SidebarMenuProvider>
            </div>
          );
        }}
      </ConfigurableApplicationComponent>
    </CustomErrorBoundary>
  );
};

export default ConfigurableSidebarMenu;
