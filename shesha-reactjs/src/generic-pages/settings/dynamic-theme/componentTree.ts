/**
 * Component tree structure for the Components Settings screen
 * Maps component categories to individual component types
 */

export interface IComponentTreeNode {
  key: string;
  title: string;
  componentType?: string; // The actual component type identifier (e.g., 'button', 'textField')
  children?: IComponentTreeNode[];
  category?: 'inputComponents' | 'layoutComponents' | 'standardComponents' | 'inlineComponents';
}

export const COMPONENT_TREE: IComponentTreeNode[] = [
  {
    key: 'buttons-data-inputs',
    title: 'Buttons & Data Inputs',
    children: [
      { key: 'button', title: 'Button', componentType: 'button', category: 'inlineComponents' },
      { key: 'buttonGroup', title: 'Button Group', componentType: 'buttonGroup', category: 'inlineComponents' },
      { key: 'dropdown', title: 'Dropdown', componentType: 'dropdown', category: 'inputComponents' },
      { key: 'checkbox', title: 'Checkbox', componentType: 'checkbox', category: 'inputComponents' },
      { key: 'radio', title: 'Radio', componentType: 'radio', category: 'inputComponents' },
      { key: 'switch', title: 'Switch', componentType: 'switch', category: 'inputComponents' },
      { key: 'textField', title: 'Text Field', componentType: 'textField', category: 'inputComponents' },
      { key: 'numberField', title: 'Number Field', componentType: 'numberField', category: 'inputComponents' },
      { key: 'textArea', title: 'Text Area', componentType: 'textArea', category: 'inputComponents' },
      { key: 'dateField', title: 'Date Field', componentType: 'dateField', category: 'inputComponents' },
      { key: 'timeField', title: 'Time Field', componentType: 'timeField', category: 'inputComponents' },
    ],
  },
  {
    key: 'data-display',
    title: 'Data Display',
    children: [
      { key: 'statistic', title: 'Statistic', componentType: 'statistic', category: 'standardComponents' },
      { key: 'alert', title: 'Alert', componentType: 'alert', category: 'standardComponents' },
      { key: 'text', title: 'Text', componentType: 'text', category: 'inlineComponents' },
      { key: 'label', title: 'Label', componentType: 'label', category: 'inlineComponents' },
      { key: 'icon', title: 'Icon', componentType: 'icon', category: 'inlineComponents' },
      { key: 'image', title: 'Image', componentType: 'image', category: 'standardComponents' },
    ],
  },
  {
    key: 'entity-references',
    title: 'Entity References',
    children: [
      { key: 'entityPicker', title: 'Entity Picker', componentType: 'entityPicker', category: 'inputComponents' },
      { key: 'autocomplete', title: 'Autocomplete', componentType: 'autocomplete', category: 'inputComponents' },
      { key: 'entityReference', title: 'Entity Reference', componentType: 'entityReference', category: 'inputComponents' },
    ],
  },
  {
    key: 'tables-lists',
    title: 'Tables & Lists',
    children: [
      { key: 'dataTable', title: 'Data Table', componentType: 'dataTable', category: 'standardComponents' },
      { key: 'childTable', title: 'Child Table', componentType: 'childTable', category: 'standardComponents' },
      { key: 'list', title: 'List', componentType: 'list', category: 'standardComponents' },
    ],
  },
  {
    key: 'layout',
    title: 'Layout',
    children: [
      { key: 'columns', title: 'Columns', componentType: 'columns', category: 'layoutComponents' },
      { key: 'panel', title: 'Panel', componentType: 'collapsiblePanel', category: 'layoutComponents' },
      { key: 'tabs', title: 'Tabs', componentType: 'tabs', category: 'layoutComponents' },
      { key: 'card', title: 'Card', componentType: 'card', category: 'layoutComponents' },
      { key: 'container', title: 'Container', componentType: 'container', category: 'layoutComponents' },
      { key: 'space', title: 'Space', componentType: 'space', category: 'layoutComponents' },
      { key: 'divider', title: 'Divider', componentType: 'divider', category: 'layoutComponents' },
    ],
  },
  {
    key: 'other',
    title: 'Other',
    children: [
      { key: 'fileUpload', title: 'File Upload', componentType: 'fileUpload', category: 'inputComponents' },
      { key: 'colorPicker', title: 'Color Picker', componentType: 'colorPicker', category: 'inputComponents' },
      { key: 'iconPicker', title: 'Icon Picker', componentType: 'iconPicker', category: 'inputComponents' },
      { key: 'codeEditor', title: 'Code Editor', componentType: 'codeEditor', category: 'inputComponents' },
      { key: 'queryBuilder', title: 'Query Builder', componentType: 'queryBuilder', category: 'inputComponents' },
    ],
  },
];

/**
 * Find a component node by its key
 */
export const findComponentNode = (key: string, tree: IComponentTreeNode[] = COMPONENT_TREE): IComponentTreeNode | null => {
  for (const node of tree) {
    if (node.key === key) return node;
    if (node.children) {
      const found = findComponentNode(key, node.children);
      if (found) return found;
    }
  }
  return null;
};

/**
 * Get all component types (leaf nodes only)
 */
export const getAllComponentTypes = (tree: IComponentTreeNode[] = COMPONENT_TREE): IComponentTreeNode[] => {
  const result: IComponentTreeNode[] = [];
  for (const node of tree) {
    if (node.componentType) {
      result.push(node);
    }
    if (node.children) {
      result.push(...getAllComponentTypes(node.children));
    }
  }
  return result;
};

/**
 * Button-specific appearance options
 */
export const BUTTON_APPEARANCES = [
  { label: 'Default', value: 'default' },
  { label: 'Primary', value: 'primary' },
  { label: 'Dashed', value: 'dashed' },
  { label: 'Link', value: 'link' },
  { label: 'Text', value: 'text' },
];
