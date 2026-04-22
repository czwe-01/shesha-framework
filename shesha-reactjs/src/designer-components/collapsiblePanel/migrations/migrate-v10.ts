import { SettingsMigrationContext } from "@/interfaces";
import { nanoid } from "@/utils/uuid";
import { ICollapsiblePanelComponentProps } from "../interfaces";

export const migrateV9toV10 = (prev: ICollapsiblePanelComponentProps, context: SettingsMigrationContext): ICollapsiblePanelComponentProps => {
  const model = { ...prev };
  const hasCustomHeader = model.hasCustomHeader;
  const customHeader = model.customHeader;
  const label = model.label;
  const header = model.header;

  // Skip if already migrated to the new structure
  const alreadyMigrated = header?.components?.some(
    (c: any) => c.type === "container" && c.componentName === "headerLayout",
  );

  if (alreadyMigrated) {
    delete model.customHeader;
    delete model.hasCustomHeader;
    return model;
  }

  // Case 1: hasCustomHeader=true -> preserve customHeader content as the header
  if (hasCustomHeader && customHeader) {
    model.header = customHeader;

    // customHeader was removed from customContainerNames, so its children may not be in the flat structure.
    // Ensure they are registered so componentsFlatStructureToTree can rebuild them.
    if (customHeader.components?.length > 0) {
      context.flatStructure.componentRelations[customHeader.id] = customHeader.components.map(
        (c: any) => c.id,
      );
      customHeader.components.forEach((c: any) => {
        context.flatStructure.allComponents[c.id] = {
          ...context.flatStructure.allComponents[c.id],
          ...c,
          parentId: customHeader.id,
        };
      });
    } else {
      context.flatStructure.componentRelations[customHeader.id] = [];
    }
  } else {
  // Case 2: hasCustomHeader=false/undefined -> wrap label + existing header components in a layout
    const existingComponents = header?.components ?? [];
    const headerId = header?.id ?? nanoid();
    const headerLayoutId = nanoid();
    const labelTextId = nanoid();
    const extraAreaId = nanoid();

    const labelText = {
      id: labelTextId,
      type: "text",
      propertyName: "panelLabel",
      componentName: "panelLabel",
      name: "Panel Label",
      label: "Panel Label",
      labelAlign: "right",
      parentId: headerLayoutId,
      hidden: false,
      isDynamic: false,
      textType: "span",
      content: label || "Panel",
      contentDisplay: "content",
      code: false,
      copyable: false,
      delete: false,
      ellipsis: false,
      mark: false,
      italic: false,
      underline: false,
      level: 1,
    } as any;

    const extraArea = {
      id: extraAreaId,
      type: "container",
      propertyName: "extraArea",
      componentName: "extraArea",
      name: "Extra Area",
      label: "Extra Area",
      labelAlign: "right",
      parentId: headerLayoutId,
      hidden: false,
      isDynamic: false,
      direction: "horizontal",
      components: existingComponents,
    } as any;

    const headerLayout = {
      id: headerLayoutId,
      type: "container",
      propertyName: "headerLayout",
      componentName: "headerLayout",
      name: "Header Layout",
      label: "Header Layout",
      labelAlign: "right",
      parentId: headerId,
      hidden: false,
      isDynamic: false,
      direction: "horizontal",
      justifyContent: "space-between",
      alignItems: "center",
      components: [labelText, extraArea],
    } as any;

    model.header = {
      id: headerId,
      components: [headerLayout],
    };

    // Update flat structure for new components
    context.flatStructure.allComponents[labelTextId] = labelText;
    context.flatStructure.allComponents[extraAreaId] = extraArea;
    context.flatStructure.allComponents[headerLayoutId] = headerLayout;
    context.flatStructure.componentRelations[headerId] = [headerLayoutId];
    context.flatStructure.componentRelations[headerLayoutId] = [labelTextId, extraAreaId];

    // Migrate existing header components into the extra area
    if (existingComponents.length > 0) {
      context.flatStructure.componentRelations[extraAreaId] = existingComponents.map(
        (c: any) => c.id,
      );
      existingComponents.forEach((c: any) => {
        if (context.flatStructure.allComponents[c.id]) {
          context.flatStructure.allComponents[c.id].parentId = extraAreaId;
        }
      });
    } else {
      context.flatStructure.componentRelations[extraAreaId] = [];
    }

    context.flatStructure.componentRelations[labelTextId] = [];
  }

  delete model.customHeader;
  delete model.hasCustomHeader;
  return model;
};
