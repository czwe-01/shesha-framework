/**
 * Component tree structure for the Components Settings screen
 * Maps component categories to individual component types
 */

import React from 'react';
import { getToolboxComponents } from "@/providers/form/defaults/toolboxComponents";

export interface IComponentTreeNode {
  key: string;
  title: string;
  icon?: React.ReactNode;
  type?: string; // The actual component type identifier (e.g., 'button', 'textField')
  children?: IComponentTreeNode[];
  category?: 'inputComponents' | 'layoutComponents' | 'standardComponents' | 'inlineComponents';
}

// Lazy initialization to avoid circular dependency
let _cachedComponentTree: IComponentTreeNode[] | null = null;

const buildComponentTree = (): IComponentTreeNode[] => {
  return getToolboxComponents(true, { formId: null, formProps: null }).map(
    (componentGroup) => ({
      key: componentGroup.name,
      title: componentGroup.name,
      children: componentGroup.components.map((component) => ({
        key: component.type,
        title: component.name,
        type: component.type,
        icon: component.icon,
        category: component.componentCatergory,
      })),
    })
  );
};

export const getComponentTree = (): IComponentTreeNode[] => {
  if (!_cachedComponentTree) {
    _cachedComponentTree = buildComponentTree();
  }
  return _cachedComponentTree;
};

// Keep COMPONENT_TREE for backward compatibility, but make it a getter
export const COMPONENT_TREE: IComponentTreeNode[] = new Proxy([] as IComponentTreeNode[], {
  get(_target, prop) {
    const tree = getComponentTree();
    return Reflect.get(tree, prop, tree);
  },
  has(_target, prop) {
    const tree = getComponentTree();
    return Reflect.has(tree, prop);
  },
  ownKeys() {
    const tree = getComponentTree();
    return Reflect.ownKeys(tree);
  },
  getOwnPropertyDescriptor(_target, prop) {
    const tree = getComponentTree();
    return Reflect.getOwnPropertyDescriptor(tree, prop);
  },
});

/**
 * Find a component node by its key
 */
export const findComponentNode = (key: string, tree?: IComponentTreeNode[]): IComponentTreeNode | null => {
  const searchTree = tree ?? getComponentTree();
  for (const node of searchTree) {
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
export const getAllComponentTypes = (tree?: IComponentTreeNode[]): IComponentTreeNode[] => {
  const searchTree = tree ?? getComponentTree();
  const result: IComponentTreeNode[] = [];
  for (const node of searchTree) {
    if (node.type) {
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
