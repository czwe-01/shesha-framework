import { Col, Row, Tree, Select, Space, Button, Card } from 'antd';
import React, { FC, useState, useMemo } from 'react';
import { CollapsiblePanel } from '@/components/panel';
import { IConfigurableTheme } from '@/providers/theme/contexts';
import { useTheme } from '@/providers/theme';
import { useStyles } from './styles/styles';
import { COMPONENT_TREE, findComponentNode, BUTTON_APPEARANCES, IComponentTreeNode } from './componentTree';
import { HeaderContent, RenderInput, RenderColor } from './components';
import Box from '@/designer-components/styleBox/components/box';
import { borderStyles } from '@/designer-components/_settings/utils/border/utils';
import ColorPicker from '@/components/colorPicker';
import { InputNumber, Input, Radio } from 'antd';
import Icon from '@/components/icon/Icon';
import { BORDER_RADIUS_CORNERS } from './utils';
import TextArea from 'antd/es/input/TextArea';

export interface IComponentsScreenProps {
  value?: IConfigurableTheme;
  onChange?: (theme: IConfigurableTheme) => void;
  readonly?: boolean;
}

/**
 * Component Preview - renders a preview of the selected component with applied defaults
 */
interface IComponentPreviewProps {
  componentType?: string;
  defaults: Record<string, unknown>;
}

const ComponentPreview: FC<IComponentPreviewProps> = ({ componentType, defaults }) => {
  const { theme } = useTheme();
  const font = defaults.font as Record<string, unknown> | undefined;
  const dimensions = defaults.dimensions as Record<string, unknown> | undefined;
  const background = defaults.background as Record<string, unknown> | undefined;
  const border = defaults.border as Record<string, unknown> | undefined;
  const shadow = defaults.shadow as Record<string, unknown> | undefined;

  const previewStyle: React.CSSProperties = {
    fontFamily: font?.type as string | undefined,
    fontSize: font?.size as number | undefined,
    fontWeight: font?.weight as string | undefined,
    color: font?.color as string | undefined,
    width: dimensions?.width as string | number | undefined,
    height: dimensions?.height as string | number | undefined,
    minWidth: dimensions?.minWidth as string | number | undefined,
    maxWidth: dimensions?.maxWidth as string | number | undefined,
    minHeight: dimensions?.minHeight as string | number | undefined,
    maxHeight: dimensions?.maxHeight as string | number | undefined,
    backgroundColor: background?.color as string | undefined,
    borderRadius: (border as { radius?: { all?: number } })?.radius?.all ? `${(border as { radius: { all: number } }).radius.all}px` : undefined,
    borderWidth: (border as { border?: { all?: { width?: string } } })?.border?.all?.width,
    borderStyle: (border as { border?: { all?: { style?: string } } })?.border?.all?.style as React.CSSProperties['borderStyle'],
    borderColor: (border as { border?: { all?: { color?: string } } })?.border?.all?.color,
    boxShadow: shadow
      ? `${shadow.offsetX as number}px ${shadow.offsetY as number}px ${shadow.blurRadius as number}px ${shadow.spreadRadius as number}px ${shadow.color as string}`
      : undefined,
  };

  const primaryColor = theme?.application?.primaryColor;
  const successColor = theme?.application?.successColor;

  switch (componentType) {
    case 'button':
      return (
        <Space size="small">
          <Button type="primary" style={{ background: primaryColor, borderColor: primaryColor, ...previewStyle }}>Primary</Button>
          <Button danger style={previewStyle}>Error</Button>
          <Button style={{ color: successColor ?? '#52c41a', borderColor: successColor ?? '#52c41a', ...previewStyle }}>Secondary</Button>
          <Button style={previewStyle}>Default</Button>
        </Space>
      );
    case 'textField':
      return <Input placeholder="Sample Text Field" style={previewStyle} />;
    case 'checkbox':
      return <span style={previewStyle}><input type="checkbox" /> Checkbox</span>;
    case 'text':
      return <span style={previewStyle}>Sample Text</span>;
    default:
      return <div style={{ padding: 16, border: '1px dashed #d9d9d9', ...previewStyle }}>Preview for {componentType}</div>;
  }
};

export const ComponentsScreen: FC<IComponentsScreenProps> = ({ value: theme, onChange, readonly }) => {
  const { styles } = useStyles();
  const [selectedKey, setSelectedKey] = useState<string>('button');

  const selectedNode = useMemo(() => findComponentNode(selectedKey), [selectedKey]);
  const componentType = selectedNode?.componentType;

  const componentDefaults = useMemo(() => {
    if (!componentType) return {};
    return theme?.componentDefaults?.[componentType] || {};
  }, [theme, componentType]);

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

  const commonPanelProps = {
    expandIconPosition: 'end' as const,
    className: styles.themeCard,
    collapsedByDefault: true,
  };

  return (
    <Row gutter={16} className={styles.contentContainer}>
      {/* Left: Component Tree */}
      <Col xs={24} sm={24} md={6} lg={6} xl={6} xxl={6} className={styles.contentColumn}>
        <Card title="Components" size="small" style={{ height: '100%' }}>
          <Tree
            treeData={treeData}
            defaultExpandAll
            selectedKeys={[selectedKey]}
            onSelect={(keys) => {
              if (keys.length > 0) {
                const key = keys[0] as string;
                const node = findComponentNode(key);
                if (node?.componentType) {
                  setSelectedKey(key);
                }
              }
            }}
          />
        </Card>
      </Col>

      {/* Right: Component Settings */}
      <Col xs={24} sm={24} md={18} lg={18} xl={18} xxl={18} className={styles.contentColumn}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Header */}
          <div>
            <h3 style={{ marginBottom: 4 }}>{selectedNode?.title || 'Select a Component'}</h3>
            <p style={{ color: '#999', marginBottom: 0 }}>
              Configure default styles for {selectedNode?.title?.toLowerCase() || 'components'}
            </p>
          </div>

          {/* Two-column panel layout */}
          <Row gutter={16}>
            {/* Left Column */}
            <Col xs={24} lg={12}>
              <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                {/* Appearance Panel */}
                {componentType === 'button' && (
                  <CollapsiblePanel
                    {...commonPanelProps}
                    collapsedByDefault={false}
                    header={<HeaderContent title="Appearance" subtitle="Button Style" />}
                  >
                    <Select
                      style={{ width: '100%' }}
                      value={componentDefaults.appearance || 'default'}
                      onChange={(val) => updateComponentDefaults({ appearance: val })}
                      options={BUTTON_APPEARANCES}
                      disabled={readonly}
                    />
                  </CollapsiblePanel>
                )}

                {/* Font Panel */}
                <CollapsiblePanel
                  {...commonPanelProps}
                  header={<HeaderContent title="Font" subtitle="Configure font properties" />}
                >
                  <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                    <Space>
                      <RenderInput
                        label="Family"
                        type="string"
                        value={componentDefaults.font?.type || 'Segoe UI'}
                        onChange={(val) =>
                          updateComponentDefaults({ font: { ...componentDefaults.font, type: val } })}
                        disabled={readonly}
                      />
                      <RenderInput
                        label="Size"
                        value={componentDefaults.font?.size || 14}
                        onChange={(val) =>
                          updateComponentDefaults({ font: { ...componentDefaults.font, size: val } })}
                        disabled={readonly}
                      />
                    </Space>
                    <Space>
                      <span style={{ color: '#666' }}>Weight</span>
                      <Select
                        style={{ width: 120 }}
                        value={componentDefaults.font?.weight || '400'}
                        onChange={(val) =>
                          updateComponentDefaults({ font: { ...componentDefaults.font, weight: val } })}
                        options={[
                          { label: 'Light', value: '300' },
                          { label: 'Normal', value: '400' },
                          { label: 'Medium', value: '500' },
                          { label: 'Bold', value: '700' },
                        ]}
                        disabled={readonly}
                      />
                      <RenderColor
                        colorName="Color"
                        initialColor={componentDefaults.font?.color || '#000'}
                        onChange={(color) =>
                          updateComponentDefaults({
                            font: { ...componentDefaults.font, color: color?.toString?.() ?? color },
                          })}
                        readonly={readonly}
                      />
                    </Space>
                  </Space>
                </CollapsiblePanel>

                {/* Dimensions Panel */}
                <CollapsiblePanel
                  {...commonPanelProps}
                  header={<HeaderContent title="Dimensions" subtitle="Configure size constraints" />}
                >
                  <Space orientation="vertical" style={{ width: '100%' }}>
                    <Space>
                      <RenderInput
                        label="Width"
                        type="string"
                        value={componentDefaults.dimensions?.width || 'auto'}
                        onChange={(val) =>
                          updateComponentDefaults({ dimensions: { ...componentDefaults.dimensions, width: val } })}
                        disabled={readonly}
                      />
                      <RenderInput
                        label="Min"
                        type="string"
                        value={componentDefaults.dimensions?.minWidth || '0px'}
                        onChange={(val) =>
                          updateComponentDefaults({ dimensions: { ...componentDefaults.dimensions, minWidth: val } })}
                        disabled={readonly}
                      />
                      <RenderInput
                        label="Max"
                        type="string"
                        value={componentDefaults.dimensions?.maxWidth || 'auto'}
                        onChange={(val) =>
                          updateComponentDefaults({ dimensions: { ...componentDefaults.dimensions, maxWidth: val } })}
                        disabled={readonly}
                      />
                    </Space>
                    <Space>
                      <RenderInput
                        label="Height"
                        type="string"
                        value={componentDefaults.dimensions?.height || 'auto'}
                        onChange={(val) =>
                          updateComponentDefaults({ dimensions: { ...componentDefaults.dimensions, height: val } })}
                        disabled={readonly}
                      />
                      <RenderInput
                        label="Min"
                        type="string"
                        value={componentDefaults.dimensions?.minHeight || '0px'}
                        onChange={(val) =>
                          updateComponentDefaults({ dimensions: { ...componentDefaults.dimensions, minHeight: val } })}
                        disabled={readonly}
                      />
                      <RenderInput
                        label="Max"
                        type="string"
                        value={componentDefaults.dimensions?.maxHeight || 'auto'}
                        onChange={(val) =>
                          updateComponentDefaults({ dimensions: { ...componentDefaults.dimensions, maxHeight: val } })}
                        disabled={readonly}
                      />
                    </Space>
                  </Space>
                </CollapsiblePanel>

                {/* Border Panel */}
                <CollapsiblePanel
                  {...commonPanelProps}
                  header={<HeaderContent title="Border" subtitle="Configure border settings" />}
                >
                  <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                    <Space size="large" style={{ alignItems: 'flex-start' }}>
                      <Radio.Group
                        value={componentDefaults.border?.borderType || 'all'}
                        size="small"
                        onChange={(e) =>
                          updateComponentDefaults({
                            border: { ...componentDefaults.border, borderType: e.target.value },
                          })}
                      >
                        <Radio.Button value="all">
                          <Icon icon="BorderOutlined" />
                        </Radio.Button>
                        <Radio.Button value="custom">
                          <Icon icon="BorderOuterOutlined" />
                        </Radio.Button>
                      </Radio.Group>

                      {componentDefaults.border?.borderType !== 'custom' && (
                        <Space>
                          <Input
                            placeholder="0"
                            size="small"
                            value={componentDefaults.border?.border?.all?.width}
                            onChange={(e) =>
                              updateComponentDefaults({
                                border: {
                                  ...componentDefaults.border,
                                  border: {
                                    ...componentDefaults.border?.border,
                                    all: { ...componentDefaults.border?.border?.all, width: e.target.value },
                                  },
                                },
                              })}
                            disabled={readonly}
                            style={{ width: 80 }}
                          />
                          <Select
                            placeholder="Solid"
                            size="small"
                            options={borderStyles}
                            value={componentDefaults.border?.border?.all?.style}
                            onChange={(val) =>
                              updateComponentDefaults({
                                border: {
                                  ...componentDefaults.border,
                                  border: {
                                    ...componentDefaults.border?.border,
                                    all: { ...componentDefaults.border?.border?.all, style: val },
                                  },
                                },
                              })}
                            disabled={readonly}
                            style={{ width: 120 }}
                          />
                          <ColorPicker
                            value={componentDefaults.border?.border?.all?.color}
                            onChange={(val) =>
                              updateComponentDefaults({
                                border: {
                                  ...componentDefaults.border,
                                  border: {
                                    ...componentDefaults.border?.border,
                                    all: { ...componentDefaults.border?.border?.all, color: val?.toString?.() },
                                  },
                                },
                              })}
                            readOnly={readonly}
                            size="small"
                          />
                        </Space>
                      )}
                    </Space>

                    <Space size="large">
                      <span>Radius</span>
                      <Radio.Group
                        value={componentDefaults.border?.radiusType || 'all'}
                        size="small"
                        onChange={(e) =>
                          updateComponentDefaults({
                            border: { ...componentDefaults.border, radiusType: e.target.value },
                          })}
                      >
                        <Radio.Button value="all">
                          <Icon icon="ExpandOutlined" />
                        </Radio.Button>
                        <Radio.Button value="custom">
                          <Icon icon="RadiusUprightOutlined" />
                        </Radio.Button>
                      </Radio.Group>

                      {componentDefaults.border?.radiusType !== 'custom' && (
                        <InputNumber
                          placeholder="0"
                          size="small"
                          value={componentDefaults.border?.radius?.all}
                          onChange={(val) =>
                            updateComponentDefaults({
                              border: { ...componentDefaults.border, radius: { ...componentDefaults.border?.radius, all: val } },
                            })}
                          disabled={readonly}
                          style={{ width: 80 }}
                        />
                      )}

                      {componentDefaults.border?.radiusType === 'custom' && (
                        <Space>
                          {BORDER_RADIUS_CORNERS.map(({ key, label, icon }) => (
                            <RenderInput
                              key={key}
                              value={componentDefaults.border?.radius?.[key] || 0}
                              icon={icon}
                              label={label}
                              onChange={(val) =>
                                updateComponentDefaults({
                                  border: {
                                    ...componentDefaults.border,
                                    radius: { ...componentDefaults.border?.radius, [key]: val },
                                  },
                                })}
                              disabled={readonly}
                            />
                          ))}
                        </Space>
                      )}
                    </Space>
                  </Space>
                </CollapsiblePanel>
              </Space>
            </Col>

            {/* Right Column */}
            <Col xs={24} lg={12}>
              <Space orientation="vertical" style={{ width: '100%' }} size="middle">
                {/* Background Panel */}
                <CollapsiblePanel
                  {...commonPanelProps}
                  header={<HeaderContent title="Background" subtitle="Configure background color" />}
                >
                  <RenderColor
                    colorName=""
                    initialColor={componentDefaults.background?.color || ''}
                    onChange={(color) =>
                      updateComponentDefaults({
                        background: { ...componentDefaults.background, color: color?.toString?.() ?? color },
                      })}
                    readonly={readonly}
                  />
                </CollapsiblePanel>

                {/* Shadow Panel */}
                <CollapsiblePanel
                  {...commonPanelProps}
                  header={<HeaderContent title="Shadow" subtitle="Configure shadow effects" />}
                >
                  <Space orientation="vertical" style={{ width: '100%' }}>
                    <Space>
                      <RenderInput
                        value={componentDefaults.shadow?.offsetX || 0}
                        onChange={(val) =>
                          updateComponentDefaults({ shadow: { ...componentDefaults.shadow, offsetX: val } })}
                        label="X"
                        disabled={readonly}
                      />
                      <RenderInput
                        value={componentDefaults.shadow?.offsetY || 0}
                        onChange={(val) =>
                          updateComponentDefaults({ shadow: { ...componentDefaults.shadow, offsetY: val } })}
                        label="Y"
                        disabled={readonly}
                      />
                      <RenderInput
                        value={componentDefaults.shadow?.blurRadius || 0}
                        onChange={(val) =>
                          updateComponentDefaults({ shadow: { ...componentDefaults.shadow, blurRadius: val } })}
                        label="Blur"
                        disabled={readonly}
                      />
                      <RenderInput
                        value={componentDefaults.shadow?.spreadRadius || 0}
                        onChange={(val) =>
                          updateComponentDefaults({ shadow: { ...componentDefaults.shadow, spreadRadius: val } })}
                        label="Spread"
                        disabled={readonly}
                      />
                      <RenderColor
                        colorName="color"
                        initialColor={componentDefaults.shadow?.color || ''}
                        onChange={(color) =>
                          updateComponentDefaults({
                            shadow: { ...componentDefaults.shadow, color: color?.toString?.() ?? color },
                          })}
                        readonly={readonly}
                      />
                    </Space>
                  </Space>
                </CollapsiblePanel>

                {/* Margin & Padding Panel */}
                <CollapsiblePanel
                  {...commonPanelProps}
                  header={<HeaderContent title="Margin & Padding" subtitle="Configure spacing" />}
                >
                  <Box
                    value={componentDefaults.stylingBox}
                    onChange={(val) => updateComponentDefaults({ stylingBox: val })}
                    readOnly={readonly}
                  />
                </CollapsiblePanel>

                {/* Custom Styles Panel */}
                <CollapsiblePanel
                  {...commonPanelProps}
                  header={<HeaderContent title="Custom Styles" subtitle="Add custom CSS" />}
                >
                  <TextArea
                    rows={4}
                    value={componentDefaults.style}
                    onChange={(e) => updateComponentDefaults({ style: e.target.value })}
                    placeholder="Enter custom CSS..."
                    disabled={readonly}
                  />
                </CollapsiblePanel>
              </Space>
            </Col>
          </Row>

          {/* Preview Card */}
          <Card size="small" style={{ marginTop: 8 }}>
            <div style={{ marginBottom: 12 }}>
              <strong>{selectedNode?.title || 'Preview'}</strong>
            </div>
            <ComponentPreview componentType={componentType} defaults={componentDefaults} />
          </Card>
        </div>
      </Col>
    </Row>
  );
};
