import { Card, Col, Menu, Row } from 'antd';
import React, { FC, useMemo, useState } from 'react';
import { IConfigurableTheme } from '@/providers/theme/contexts';
import { useStyles } from './styles/styles';
import { COMPONENT_TREE, findComponentNode, IComponentTreeNode } from './componentTree';
import { ConfigurableForm } from '@/components/configurableForm';
import { getComponentDefinitions } from '@/providers/form/defaults/toolboxComponents';
import { IFormSettings } from '@/providers/form/models';
import { makeFormBuliderFactory } from '@/form-factory/implementation';
import { nanoid } from 'nanoid';
import { ItemType } from 'antd/es/menu/interface';

export interface IComponentDefaultsPanelProps {
  value?: IConfigurableTheme;
  onChange?: (theme: IConfigurableTheme) => void;
  readonly?: boolean;
}

/**
 * Component Defaults Panel - Shows menu of components on left, appearance settings on right
 */
export const ComponentDefaultsPanel: FC<IComponentDefaultsPanelProps> = ({ value: theme, onChange, readonly }) => {
  const { styles } = useStyles();
  const [selectedKey, setSelectedKey] = useState<string>('button');

  const selectedNode = useMemo(() => findComponentNode(selectedKey), [selectedKey]);
  const componentType = selectedNode?.type;

  // Get component defaults for selected component
  const componentDefaults = useMemo(() => {
    if (!componentType) return {};
    return theme?.componentDefaults?.[componentType] || {};
  }, [theme, componentType]);

  // Update component defaults
  const updateComponentDefaults = (updates: Record<string, unknown>): void => {
    if (!componentType || !onChange) return;

    const newTheme = {
      ...theme,
      componentDefaults: {
        ...theme?.componentDefaults,
        [componentType]: {
          ...componentDefaults,
          ...updates,
        },
      },
    };
    onChange(newTheme);
  };

  // Convert tree data to Ant Design Menu format
  const menuData = useMemo(() => {
    const convertNode = (node: IComponentTreeNode): ItemType => ({
      key: node.key,
      label: node.title,
      icon: node.icon,
      children: node.children?.map(convertNode),
    });
    return COMPONENT_TREE.map(convertNode);
  }, []);

  // Get component definition and extract appearance tab components
  const appearanceMarkup = useMemo(() => {
    if (!componentType) return null;

    const componentDefinitions = getComponentDefinitions();
    const componentDef = componentDefinitions.get(componentType);

    if (!componentDef?.settingsFormMarkup) return null;

    // Get the settings form markup (could be a function or object)
    let settingsFormMarkup = componentDef.settingsFormMarkup;

    // If it's a function (SettingsFormMarkupFactory), execute it to get the markup
    if (typeof settingsFormMarkup === 'function') {
      const formBuilderFactory = makeFormBuliderFactory();
      settingsFormMarkup = settingsFormMarkup({ fbf: formBuilderFactory });
    }

    // Handle both FormRawMarkup (array) and FormMarkupWithSettings (object with components)
    const components = Array.isArray(settingsFormMarkup) ? settingsFormMarkup : settingsFormMarkup?.components;
    const formSettings = Array.isArray(settingsFormMarkup) ? {} : settingsFormMarkup?.formSettings;

    if (!components) return null;

    // Find the SearchableTabs component (cast to any to access tabs property)
    const searchableTabs = components.find((c: any) =>
      c.type === 'propertiesTabs' || c.type === 'searchableTabs'
    ) as any;

    if (!searchableTabs?.tabs) return null;

    // Find the Appearance tab
    const appearanceTab = searchableTabs.tabs.find((tab: any) =>
      tab.key === 'appearance' || tab.title?.toLowerCase() === 'appearance'
    );

    if (!appearanceTab?.components) return null;

    return {
      components: appearanceTab.components?.components || appearanceTab.components,
      formSettings: formSettings as IFormSettings,
    };
  }, [componentType]);

  // Handle form data change
  const handleFormDataChange = (_changedValues: any, allValues: any): void => {
    if (!allValues || readonly) return;
    updateComponentDefaults(allValues);
  };

  return (
    <Row gutter={16}>
      {/* Left: Component Menu */}
      <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
        <Card
          title="Components"
          size="small"
          style={{ height: '600px', overflowY: 'auto' }}
          className={styles.themeCard}
        >
          <Menu
            items={menuData}
            mode="inline"
            selectedKeys={[selectedKey]}
            styles={{ 
              list: { background: 'blue'}
            }}
            onClick={(item) => {
                const node = findComponentNode(item.key, COMPONENT_TREE);
                if (node?.type) {
                  setSelectedKey(item.key);
                }
            }}
          />
        </Card>
      </Col>

      {/* Right: Component Appearance Settings */}
      <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18}>
        <Card
          title={
            <div>
              <h4 style={{ marginBottom: 4 }}>{selectedNode?.title || 'Select a Component'}</h4>
              <span style={{ color: '#999', fontSize: '12px' }}>
                Configure default appearance for {selectedNode?.title?.toLowerCase() || 'components'}
              </span>
            </div>
          }
          size="small"
          style={{ height: '600px', overflowY: 'auto' }}
          className={styles.themeCard}
        >
          {appearanceMarkup && componentType ? (
            <ConfigurableForm
              mode="edit"
              markup={appearanceMarkup}
              initialValues={componentDefaults}
              onValuesChange={handleFormDataChange}
              className={styles.appearanceForm}
            />
          ) : (
            <div style={{ padding: 16, textAlign: 'center', color: '#999' }}>
              {componentType
                ? 'This component does not have appearance settings or they cannot be loaded'
                : 'Select a component from the tree to configure its default appearance'}
            </div>
          )}
        </Card>
        <Card>
          {componentType && (
            <div>
              <h4 style={{ marginBottom: 4 }}>{selectedNode?.title || 'Select a Component'}</h4>
              <span style={{ color: '#999', fontSize: '12px' }}>
                Configure default appearance for {selectedNode?.title?.toLowerCase() || 'components'}
              </span>
              <ConfigurableForm
                mode="edit"
                markup={{
                  components: [
                    {
                      type: selectedNode?.type,
                      id: nanoid(),
                      propertyName: `${selectedNode?.type}Appearance`,
                      label: `${selectedNode?.title}`,
                      parentId: 'root',
                      hidden: false,
                      desktop: {
                        ...componentDefaults[selectedNode?.type],
                      }
                    }
                  ],
                  formSettings: {
                    colon: false,
                    layout: 'vertical' as const,
                    labelCol: { span: 24 },
                    wrapperCol: { span: 24 },
                  },
                }}
                initialValues={componentDefaults}
                onValuesChange={handleFormDataChange}
                className={styles.appearanceForm}
              />
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};
