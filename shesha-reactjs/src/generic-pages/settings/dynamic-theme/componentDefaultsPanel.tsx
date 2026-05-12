import { Card, Col, Row, Tree } from 'antd';
import React, { FC, useMemo, useState } from 'react';
import { IConfigurableTheme } from '@/providers/theme/contexts';
import { useStyles } from './styles/styles';
import { COMPONENT_TREE, findComponentNode, IComponentTreeNode } from './componentTree';
import { ConfigurableForm } from '@/components/configurableForm';
import { getComponentDefinitions, getToolboxComponents } from '@/providers/form/defaults/toolboxComponents';
import { IFormSettings } from '@/providers/form/models';
import { makeFormBuliderFactory } from '@/form-factory/implementation';

export interface IComponentDefaultsPanelProps {
  value?: IConfigurableTheme;
  onChange?: (theme: IConfigurableTheme) => void;
  readonly?: boolean;
}

/**
 * Component Defaults Panel - Shows tree of components on left, appearance settings on right
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

  // Convert tree data to Ant Design Tree format
  const treeData = useMemo(() => {
    interface TreeNode {
      key: string;
      title: string;
      children?: TreeNode[];
      isLeaf: boolean;
    }
    const convertNode = (node: IComponentTreeNode): TreeNode => ({
      key: node.key,
      title: node.title,
      children: node.children?.map(convertNode),
      isLeaf: !node.children,
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
      components: appearanceTab.components,
      formSettings: (formSettings || {
        colon: false,
        layout: 'vertical' as const,
        labelCol: { span: 24 },
        wrapperCol: { span: 24 },
      }) as IFormSettings,
    };
  }, [componentType]);

  // Handle form data change
  const handleFormDataChange = (_changedValues: any, allValues: any): void => {
    if (!allValues || readonly) return;
    updateComponentDefaults(allValues);
  };

  return (
    <Row gutter={16}>
      {/* Left: Component Tree */}
      <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6}>
        <Card
          title="Components"
          size="small"
          style={{ height: '600px', overflowY: 'auto' }}
          className={styles.themeCard}
        >
          <Tree
            treeData={treeData}
            defaultExpandAll
            selectedKeys={[selectedKey]}
            onSelect={(keys) => {
              if (keys.length > 0) {
                const key = keys[0] as string;
                const node = findComponentNode(key, COMPONENT_TREE);
                // Only select leaf nodes (actual components)
                if (node?.type) {
                  setSelectedKey(key);
                }
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
      </Col>
    </Row>
  );
};
