import { nanoid } from '@/utils/uuid';
import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import {
  ALIGN_ITEMS,
  ALIGN_ITEMS_GRID,
  ALIGN_SELF,
  FLEX_DIRECTION,
  FLEX_WRAP,
  JUSTIFY_CONTENT,
  JUSTIFY_ITEMS,
  JUSTIFY_SELF,
  TEXT_JUSTIFY,
} from './data';


import { FormLayout } from 'antd/lib/form/Form';
import { getBorderInputs, getCornerInputs } from '../_settings/utils/border/utils';
import { backgroundTypeOptions, positionOptions, repeatOptions, sizeOptions } from '../_settings/utils/background/utils';

export const getSettings = (data) => {

  const getDisplayType = ' getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display)';

  return {

    components: new DesignerToolbarSettings(data)
      .addSearchableTabs({
        id: 'W_m7doMyCpCYwAYDfRh6I',
        propertyName: 'settingsTabs',
        parentId: 'root',
        label: 'Settings',
        hideLabel: true,
        labelAlign: 'right',
        size: 'small',
        tabs: [
          {
            key: '1',
            title: 'Common',
            id: 's4gmBg31azZC0UjZjpfTm',
            components: [...new DesignerToolbarSettings()
              .addSettingsInput({
                id: '5c813b1a-04c5-4658-ac0f-cbcbae6b3bd4',
                propertyName: 'propertyName',
                label: 'Component Name',
                parentId: 's4gmBg31azZC0UjZjpfTm',
                size: 'small',
                validate: {
                  required: true,
                },
                jsSetting: true,
              })
              .addSettingsInputRow({
                id: '12d700d6-ed4d-49d5-9cfd-fe8f0060f3b6',
                parentId: 's4gmBg31azZC0UjZjpfTm',
                inputs: [
                  {
                    type: 'editModeSelector',
                    id: 'editMode-s4gmBg31azZC0UjZjpfTm',
                    propertyName: 'editMode',
                    label: 'Edit Mode',
                    size: 'small',
                    jsSetting: true,
                  },
                  {
                    type: 'switch',
                    id: 'hidden-s4gmBg31azZC0UjZjpfTm',
                    propertyName: 'hidden',
                    label: 'Hide',
                    jsSetting: true,
                    layout: 'horizontal',
                  },
                ],
              })
              .addSettingsInput({
                id: 'noDefaultStyling-s4gmBg31azZC0UjZjpfTm',
                inputType: 'switch',
                propertyName: 'noDefaultStyling',
                label: 'No Default Styling',
                parentId: 's4gmBg31azZC0UjZjpfTm',
                size: 'small',
                jsSetting: true,
              })
              .toJson()
            ]
          },
          {
            key: '2',
            title: 'Appearance',
            id: 'elgrlievlfwehhh848r8hsdnflsdnclurbd',
            components: [...new DesignerToolbarSettings()
              .addPropertyRouter({
                id: 'styleRouter',
                propertyName: 'propertyRouter1',
                componentName: 'propertyRouter',
                label: 'Property router1',
                labelAlign: 'right',
                parentId: 'elgrlievlfwehhh848r8hsdnflsdnclurbd',
                hidden: false,
                propertyRouteName: {
                  _mode: "code",
                  _code: "    return contexts.canvasContext?.designerDevice || 'desktop';",
                  _value: ""
                },
                components: [
                  ...new DesignerToolbarSettings()
                    // .addCollapsiblePanel({
                    //   id: 'positionCollapsiblePanel',
                    //   propertyName: 'pnlPosition',
                    //   label: 'Position',
                    //   labelAlign: 'right',
                    //   parentId: 'styleRouter',
                    //   ghost: true,
                    //   collapsible: 'header',
                    //   content: {
                    //     id: 'positionStylePnl',
                    //     components: [...new DesignerToolbarSettings()
                    //       .addSettingsInput({
                    //         id: 'position-s4gmBg31azZC0UjZjpfTm',
                    //         propertyName: 'position.value',
                    //         label: 'Position',
                    //         parentId: 'positionCollapsiblePanel',
                    //         inputType: 'dropdown',
                    //         description: 'The position CSS property sets how an element is positioned in a document. The top, right, bottom, and left properties determine the final location of positioned elements.',
                    //         validate: {
                    //           required: true,
                    //         },
                    //         dropdownOptions: [
                    //           { value: 'relative', label: 'Relative' },
                    //           { value: 'absolute', label: 'Absolute' }
                    //         ]
                    //       })
                    //       .addSettingsInputRow(
                    //         getPositionInputs()[0] as any
                    //       )
                    //       .addSettingsInputRow(
                    //         getPositionInputs()[1] as any
                    //       )
                    //       .addSettingsInputRow(
                    //         getPositionInputs()[2] as any
                    //       )
                    //       .addSettingsInputRow(
                    //         getPositionInputs()[3] as any
                    //       )
                    //       .toJson()
                    //     ]
                    //   }
                    // })
                    .addCollapsiblePanel({
                      id: 'displayCollapsiblePanel',
                      propertyName: 'pnlDisplayStyle',
                      label: 'Display',
                      labelAlign: 'right',
                      parentId: 'styleRouter',
                      ghost: true,
                      collapsible: 'header',
                      content: {
                        id: 'fontStylePnl',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInput({
                            id: 'display-s4gmBg31azZC0UjZjpfTm',
                            propertyName: 'display',
                            label: 'Layout Type',
                            parentId: 'displayCollapsiblePanel',
                            inputType: 'radio',
                            description: 'The display CSS property sets whether an element is treated as a block or inline element and the layout used for its children, such as flow layout, grid or flex.',
                            validate: {
                              required: true,
                            },
                            buttonGroupOptions: [
                              { value: 'block', title: 'Block', icon: 'BorderOutlined' },
                              { value: 'grid', title: 'Grid', icon: 'AppstoreOutlined' },
                              { value: 'flex', title: 'Flex', icon: 'flex' },
                              { value: 'inline-grid', title: 'Inline grid', icon: 'TableOutlined' }
                            ]
                          })
                          .addContainer({
                            id: 'flex-grid-properties-container',
                            parentId: 'displayCollapsiblePanel',
                            hidden: {
                              _code: 'return' + getDisplayType + ' === "block";',
                              _mode: 'code',
                              _value: false,
                            } as any,
                            components: [
                              ...new DesignerToolbarSettings()
                                .addContainer({
                                  id: 'button-display-Bg31azZC0UjZjpfTm',
                                  parentId: 'displayCollapsiblePanel',
                                  components: [
                                    ...new DesignerToolbarSettings()
                                      .addSettingsInputRow({
                                        id: nanoid(),
                                        inline: true,
                                        parentId: 'button-display-Bg31azZC0UjZjpfTm',
                                        inputs: [
                                          {
                                            type: 'radio',
                                            id: 'button-display-Bg31azZC0UjZjpfTm-flex-direction',
                                            label: 'Flex Direction',
                                            hideLabel: true,
                                            propertyName: 'flexDirection',
                                            hidden: {
                                              _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display) !== "flex";',
                                              _mode: 'code',
                                              _value: false,
                                            } as any,
                                            buttonGroupOptions: [
                                              {
                                                title: 'Row',
                                                value: 'row',
                                                icon: 'row'
                                              },
                                              {
                                                title: 'Column',
                                                value: 'column',
                                                icon: 'column'
                                              }
                                            ]
                                          },
                                          {
                                            id: 'justify-content-s4gmBg31azZC0UjZjpfTm-button',
                                            type: 'radio',
                                            label: 'Justify Content',
                                            hideLabel: true,
                                            hidden: {
                                              _code: `return (${getDisplayType} == "flex"` +
                                                ' && getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.flexDirection) == "column")' +
                                                ` || ${getDisplayType} == "inline-grid"`,
                                              _mode: 'code',
                                              _value: false,
                                            } as any,
                                            propertyName: 'justifyContent',
                                            buttonGroupOptions: [
                                              {
                                                title: 'Left',
                                                value: 'left',
                                                icon: 'alignHorizontalLeft'
                                              },
                                              {
                                                title: 'Center',
                                                value: 'center',
                                                icon: 'alignHorizontalCenter'
                                              },
                                              {
                                                title: 'Right',
                                                value: 'right',
                                                icon: 'alignHorizontalRight'
                                              }
                                            ]
                                          },
                                          {
                                            type: 'radio',
                                            id: 'button-display-Bg31azZC0UjZjpfTm-align-items',
                                            label: 'Align Items',
                                            hideLabel: true,
                                            propertyName: 'alignItems',
                                            hidden: {
                                              _code: `return ${getDisplayType} == "flex"` + ' && getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.flexDirection) == "column"',
                                              _mode: 'code',
                                              _value: false,
                                            } as any,
                                            buttonGroupOptions: [
                                              {
                                                title: 'Start',
                                                value: 'start',
                                                icon: 'alignVerticalTop'
                                              },
                                              {
                                                title: 'Center',
                                                value: 'center',
                                                icon: 'alignVerticalCenter'
                                              },
                                              {
                                                title: 'End',
                                                value: 'end',
                                                icon: 'alignVerticalBottom'
                                              }
                                            ]
                                          },
                                          {
                                            type: 'radio',
                                            id: 'button-display-Bg31azZC0UjZjpfTm-align-items-column',
                                            label: 'Align Items',
                                            hideLabel: true,
                                            hidden: {
                                              _code: `return ${getDisplayType} !== "flex"` + ' || getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.flexDirection) !== "column"',
                                              _mode: 'code',
                                              _value: false,
                                            } as any,
                                            propertyName: 'alignItems',
                                            buttonGroupOptions: [
                                              {
                                                title: 'Start',
                                                value: 'start',
                                                icon: 'alignHorizontalLeft'
                                              },
                                              {
                                                title: 'Center',
                                                value: 'center',
                                                icon: 'alignHorizontalCenter'
                                              },
                                              {
                                                title: 'End',
                                                value: 'end',
                                                icon: 'alignHorizontalRight'
                                              }
                                            ]
                                          },
                                          {
                                            type: 'radio',
                                            id: 'button-display-Bg31azZC0UjZjpfTm-justify-items',
                                            label: 'Justify Content',
                                            hideLabel: true,
                                            propertyName: 'justifyContent',
                                            hidden: {
                                              _code: `return ${getDisplayType} !== "flex"` + ' || getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.flexDirection) !== "column"',
                                              _mode: 'code',
                                              _value: false,
                                            } as any,
                                            buttonGroupOptions: [
                                              {
                                                title: 'Start',
                                                value: 'start',
                                                icon: 'alignVerticalTop'
                                              },
                                              {
                                                title: 'Center',
                                                value: 'center',
                                                icon: 'alignVerticalCenter'
                                              },
                                              {
                                                title: 'End',
                                                value: 'end',
                                                icon: 'alignVerticalBottom'
                                              }
                                            ]
                                          },
                                          {
                                            type: 'button',
                                            id: 'button-display-Bg31azZC0UjZjpfTm-advanced',
                                            label: 'Show Advanced',
                                            hideLabel: true,
                                            propertyName: 'showAdvanced',
                                            icon: 'tuneIcon'
                                          }
                                        ]
                                      })
                                      .toJson()
                                  ]
                                })
                                .addSettingsInputRow({
                                  id: 'gap-s4gmBg31azZC0UjZjpfTm-flex',
                                  parentId: 'displayCollapsiblePanel',
                                  inline: true,
                                  hidden: {
                                    _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display) !== "flex";',
                                    _mode: 'code',
                                    _value: false,
                                  } as any,
                                  readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                  inputs: [
                                    {
                                      type: 'textField',
                                      id: 'gap-s4gmBg31azZC0UjZjpfTm-flex',
                                      label: 'Gap',
                                      propertyName: 'gap',
                                      description: 'Examples of a valid gap include: `10` | `10px` | `20px 20px`',
                                    },
                                    {
                                      type: 'dropdown',
                                      id: 'flex-wrap-s4gmBg31azZC0UjZjpfTm',
                                      label: 'Flex Wrap',
                                      propertyName: 'flexWrap',
                                      dropdownOptions: FLEX_WRAP
                                    },
                                  ],
                                })
                                .addSettingsInputRow({
                                  id: 'gap-s4gmBg31azZC0UjZjpfTm-grid',
                                  parentId: 'displayCollapsiblePanel',
                                  hidden: {
                                    _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display) !== "grid" && getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display) !== "inline-grid";',
                                    _mode: 'code',
                                    _value: false,
                                  } as any,
                                  readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                  inputs: [
                                    {
                                      type: 'textField',
                                      id: 'gap-s4gmBg31azZC0UjZjpfTm-grid',
                                      label: 'Gap',
                                      propertyName: 'gap',
                                      description: 'Examples of a valid gap include: `10` | `10px` | `20px 20px`',
                                    },
                                    {
                                      type: 'numberField',
                                      id: 'grid-columns-count-s4gmBg31azZC0UjZjpfTm',
                                      propertyName: 'gridColumnsCount',
                                      parentId: 'pnl64664-cbc9-4cef-babc-6fbea44cd0ca',
                                      label: 'Grid Columns Count',
                                      description: 'Number of columns each grid should have',
                                    },
                                  ],
                                })
                                .toJson()
                            ]
                          })
                          .addContainer({
                            id: 'non-block-26voxhs-HxJ5k5ngYE',
                            parentId: 'displayCollapsiblePanel',
                            hidden: {
                              _code: `return ${getDisplayType} == "block"` +
                                '|| !getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.showAdvanced)',
                              _mode: 'code',
                              _value: false,
                            } as any,
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            components: [
                              ...new DesignerToolbarSettings()
                                .addSettingsInputRow({
                                  id: nanoid(),
                                  parentId: 'displayCollapsiblePanel',
                                  inline: false,
                                  readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                  inputs: [
                                    {
                                      type: 'dropdown',
                                      id: 'flex-direction-s4gmBg31azZC0UjZjpfTm',
                                      label: 'Flex Direction',
                                      propertyName: 'flexDirection',
                                      hidden: {
                                        _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display) !== "flex";',
                                        _mode: 'code',
                                        _value: false,
                                      } as any,
                                      dropdownOptions: FLEX_DIRECTION,
                                      description: 'The flex-direction CSS property sets how flex items are placed in the flex container defining the main axis and the direction (normal or reversed).',

                                    },
                                    {
                                      type: 'dropdown',
                                      id: 'align-items-s4gmBg31azZC0UjZjpfTm',
                                      label: 'Align Items',
                                      propertyName: 'alignItems',
                                      dropdownOptions: [...ALIGN_ITEMS, ...ALIGN_ITEMS_GRID]
                                    }
                                  ]
                                })
                                .addSettingsInputRow({
                                  id: nanoid(),
                                  parentId: 'displayCollapsiblePanel',
                                  inline: false,
                                  readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                  inputs: [
                                    {
                                      type: 'dropdown',
                                      id: 'justify-content-s4gmBg31azZC0UjZjpfTm-dropdown',
                                      label: 'Justify Content',
                                      propertyName: 'justifyContent',
                                      dropdownOptions: JUSTIFY_CONTENT
                                    },
                                    {
                                      type: 'dropdown',
                                      id: 'justify-self-s4gmBg31azZC0UjZjpfTm',
                                      label: 'Justify Self',
                                      propertyName: 'justifySelf',
                                      hidden: {
                                        _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display) === "flex";',
                                        _mode: 'code',
                                        _value: false,
                                      } as any,
                                      dropdownOptions: JUSTIFY_SELF
                                    },
                                  ]
                                })
                                .addSettingsInputRow({
                                  id: nanoid(),
                                  parentId: 'displayCollapsiblePanel',
                                  readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                  inputs: [
                                    {
                                      type: 'dropdown',
                                      id: 'align-self-s4gmBg31azZC0UjZjpfTm',
                                      label: 'Align Self',
                                      propertyName: 'alignSelf',
                                      dropdownOptions: ALIGN_SELF
                                    },
                                    {
                                      type: 'dropdown',
                                      id: 'justify-items-s4gmBg31azZC0UjZjpfTm',
                                      label: 'Justify Items',
                                      propertyName: 'justifyItems',
                                      hidden: {
                                        _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display) === "flex";',
                                        _mode: 'code',
                                        _value: false,
                                      } as any,
                                      dropdownOptions: JUSTIFY_ITEMS
                                    }
                                  ]
                                })
                                .toJson()
                            ]
                          })
                          .addSettingsInputRow({
                            id: nanoid(),
                            parentId: 'displayCollapsiblePanel',
                            inline: false,
                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            inputs: [
                              {
                                type: 'dropdown',
                                id: 'text-justify-s4gmBg31azZC0UjZjpfTm',
                                label: 'Text Justify',
                                propertyName: 'textJustify',
                                hidden: {
                                  _code: 'return getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.display) !== "block";',
                                  _mode: 'code',
                                  _value: false,
                                } as any,
                                dropdownOptions: TEXT_JUSTIFY
                              },
                              {
                                type: 'dropdown',
                                id: 'overflow-s4gmBg31azZC0UjZjpfTm',
                                label: 'Overflow',
                                propertyName: 'overflow',
                                dropdownOptions: [
                                  {
                                    label: "Auto",
                                    value: "auto",
                                  },
                                  {
                                    label: "Hidden",
                                    value: "hidden",
                                  },
                                  {
                                    label: "Scroll",
                                    value: "scroll",
                                  },
                                  {
                                    label: "Visible",
                                    value: "visible",
                                  },
                                ]
                              }
                            ],
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'dimensionsStyleCollapsiblePanel',
                      propertyName: 'pnlDimensions',
                      label: 'Dimensions',
                      parentId: 'styleRouter',
                      labelAlign: 'right',
                      ghost: true,
                      collapsible: 'header',
                      content: {
                        id: 'dimensionsStylePnl',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInputRow({
                            id: 'dimensionsStyleRowWidth',
                            parentId: 'dimensionsStylePnl',
                            inline: true,
                            inputs: [
                              {
                                type: 'textField',
                                id: 'width-s4gmBg31azZC0UjZjpfTm',
                                label: "Width",
                                width: 85,
                                propertyName: "dimensions.width",
                                icon: "widthIcon",
                                tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"

                              },
                              {
                                type: 'textField',
                                id: 'minWidth-s4gmBg31azZC0UjZjpfTm',
                                label: "Min Width",
                                width: 85,
                                hideLabel: true,
                                propertyName: "dimensions.minWidth",
                                icon: "minWidthIcon",
                              },
                              {
                                type: 'textField',
                                id: 'maxWidth-s4gmBg31azZC0UjZjpfTm',
                                label: "Max Width",
                                width: 85,
                                hideLabel: true,
                                propertyName: "dimensions.maxWidth",
                                icon: "maxWidthIcon",
                              }
                            ]
                          })
                          .addSettingsInputRow({
                            id: 'dimensionsStyleRowHeight',
                            parentId: 'dimensionsStylePnl',
                            inline: true,
                            inputs: [
                              {
                                type: 'textField',
                                id: 'height-s4gmBg31azZC0UjZjpfTm',
                                label: "Height",
                                width: 85,
                                propertyName: "dimensions.height",
                                icon: "heightIcon",
                                tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"
                              },
                              {
                                type: 'textField',
                                id: 'minHeight-s4gmBg31azZC0UjZjpfTm',
                                label: "Min Height",
                                width: 85,
                                hideLabel: true,
                                propertyName: "dimensions.minHeight",
                                icon: "minHeightIcon",
                              },
                              {
                                type: 'textField',
                                id: 'maxHeight-s4gmBg31azZC0UjZjpfTm',
                                label: "Max Height",
                                width: 85,
                                hideLabel: true,
                                propertyName: "dimensions.maxHeight",
                                icon: "maxHeightIcon",
                              }
                            ]
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'borderStyleCollapsiblePanel',
                      propertyName: 'pnlBorderStyle',
                      label: 'Border',
                      labelAlign: 'right',
                      ghost: true,
                      parentId: 'styleRouter',
                      collapsible: 'header',
                      content: {
                        id: 'borderStylePnl',
                        components: [...new DesignerToolbarSettings()

                          .addContainer({
                            id: 'borderStyleRow',
                            parentId: 'borderStylePnl',
                            components: getBorderInputs() as any
                          })
                          .addContainer({
                            id: 'borderRadiusStyleRow',
                            parentId: 'borderStylePnl',
                            components: getCornerInputs() as any
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'backgroundStyleCollapsiblePanel',
                      propertyName: 'pnlBackgroundStyle',
                      label: 'Background',
                      labelAlign: 'right',
                      ghost: true,
                      parentId: 'styleRouter',
                      collapsible: 'header',
                      content: {
                        id: 'backgroundStylePnl',
                        components: [
                          ...new DesignerToolbarSettings()
                            .addSettingsInput({
                              id: "backgroundStyleRow-selectType",
                              parentId: "backgroundStylePnl",
                              label: "Type",
                              jsSetting: false,
                              propertyName: "background.type",
                              inputType: "radio",
                              tooltip: "Select a type of background",
                              buttonGroupOptions: backgroundTypeOptions,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyleRow-color-select",
                              parentId: "backgroundStylePnl",
                              inputs: [{
                                type: 'colorPicker',
                                id: 'backgroundStyleRow-color-picker',
                                label: "Color",
                                propertyName: "background.color",
                                hideLabel: true,
                                jsSetting: false,
                              }],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "color";', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyle-gradientColors-select",
                              parentId: "backgroundStylePnl",
                              inputs: [{
                                type: 'multiColorPicker',
                                id: 'backgroundStyle-gradientColors-picker',
                                propertyName: "background.gradient.colors",
                                label: "Colors",
                                jsSetting: false,
                              }
                              ],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "gradient";', _mode: 'code', _value: false } as any,
                              hideLabel: true,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyle-url-select",
                              parentId: "backgroundStylePnl",
                              inputs: [{
                                type: 'textField',
                                id: 'backgroundStyle-url-input',
                                propertyName: "background.url",
                                jsSetting: false,
                                label: "URL",
                              }],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "url";', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyle-image-select",
                              parentId: 'backgroundStylePnl',
                              inputs: [{
                                type: 'imageUploader',
                                id: 'backgroundStyle-image-uploader',
                                propertyName: 'background.uploadFile',
                                label: "Image",
                                jsSetting: false,
                              }],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "image";', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyleRow-storedFile",
                              parentId: 'backgroundStylePnl',
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "storedFile";', _mode: 'code', _value: false } as any,
                              inputs: [
                                {
                                  type: 'textField',
                                  id: 'backgroundStyle-storedFile',
                                  jsSetting: false,
                                  propertyName: "background.storedFile.id",
                                  label: "File ID"
                                }
                              ]
                            })
                            .addSettingsInputRow({
                              id: "backgroundStyleRow-controls",
                              parentId: 'backgroundStyleRow',
                              inline: true,
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) === "color";', _mode: 'code', _value: false } as any,
                              inputs: [
                                {
                                  type: 'customDropdown',
                                  id: 'backgroundStyleRow-size',
                                  label: "Size",
                                  customTooltip: 'Size of the background image, two space separated values with units e.g "100% 100px"',
                                  hideLabel: true,
                                  propertyName: "background.size",
                                  dropdownOptions: sizeOptions,
                                },
                                {
                                  type: 'customDropdown',
                                  id: 'backgroundStyleRow-position',
                                  label: "Position",
                                  hideLabel: true,
                                  customTooltip: 'Position of the background image, two space separated values with units e.g "5em 100px"',
                                  propertyName: "background.position",
                                  dropdownOptions: positionOptions,
                                }
                              ]
                            })
                            .addSettingsInputRow({
                              id: 'backgroundStyleRow-repeat',
                              parentId: 'backgroundStyleRow',
                              inputs: [{
                                type: 'radio',
                                id: 'backgroundStyleRow-repeat-radio',
                                label: 'Repeat',
                                hideLabel: true,
                                propertyName: 'background.repeat',
                                inputType: 'radio',
                                buttonGroupOptions: repeatOptions,
                              }],
                              hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) === "color";', _mode: 'code', _value: false } as any,
                            })
                            .toJson()
                        ],
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'shadowStyleCollapsiblePanel',
                      propertyName: 'pnlShadowStyle',
                      label: 'Shadow',
                      labelAlign: 'right',
                      ghost: true,
                      parentId: 'styleRouter',
                      collapsible: 'header',
                      content: {
                        id: 'shadowStylePnl',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInputRow({
                            id: 'shadowStyleRow',
                            parentId: 'shadowStylePnl',
                            inline: true,
                            inputs: [
                              {
                                type: 'numberField',
                                id: 'shadowStyleRow-offsetX',
                                label: 'Offset X',
                                hideLabel: true,
                                width: 80,
                                icon: "offsetHorizontalIcon",
                                propertyName: 'shadow.offsetX',
                              },
                              {
                                type: 'numberField',
                                id: 'shadowStyleRow-offsetY',
                                label: 'Offset Y',
                                hideLabel: true,
                                width: 80,
                                icon: 'offsetVerticalIcon',
                                propertyName: 'shadow.offsetY',
                              },
                              {
                                type: 'numberField',
                                id: 'shadowStyleRow-blurRadius',
                                label: 'Blur',
                                hideLabel: true,
                                width: 80,
                                icon: 'blurIcon',
                                propertyName: 'shadow.blurRadius',
                              },
                              {
                                type: 'numberField',
                                id: 'shadowStyleRow-spreadRadius',
                                label: 'Spread',
                                hideLabel: true,
                                width: 80,
                                icon: 'spreadIcon',
                                propertyName: 'shadow.spreadRadius',
                              },
                              {
                                type: 'colorPicker',
                                id: 'shadowStyleRow-color',
                                label: 'Color',
                                hideLabel: true,
                                propertyName: 'shadow.color',
                              },
                            ],
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'styleCollapsiblePanel',
                      propertyName: 'stylingBox',
                      label: 'Margin & Padding',
                      labelAlign: 'right',
                      ghost: true,
                      collapsible: 'header',
                      content: {
                        id: 'stylePnl-M5-911',
                        components: [...new DesignerToolbarSettings()
                          .addStyleBox({
                            id: 'styleBoxPnl',
                            label: 'Margin Padding',
                            hideLabel: true,
                            propertyName: 'stylingBox',
                          })
                          .toJson()
                        ]
                      }
                    })
                    .addCollapsiblePanel({
                      id: 'customStyleCollapsiblePanel',
                      propertyName: 'customStyle',
                      label: 'Custom Styles',
                      labelAlign: 'right',
                      ghost: true,
                      parentId: 'styleRouter',
                      collapsible: 'header',
                      content: {
                        id: 'stylePnl-M500-911MFR',
                        components: [...new DesignerToolbarSettings()
                          .addSettingsInput({
                            id: 'custom-class-412c-8461-4c8d55e5c073',
                            inputType: 'textField',
                            propertyName: 'className',
                            label: 'Custom CSS Class',
                          })
                          .addSettingsInput({
                            id: 'custom-wrapper-css-412c-8461-4c8d55e5c073',
                            inputType: 'codeEditor',
                            propertyName: 'wrapperStyle',
                            label: 'Wrapper Style',
                            description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                          })
                          .addSettingsInput({
                            id: 'custom-css-412c-8461-4c8d55e5c073',
                            inputType: 'codeEditor',
                            propertyName: 'style',
                            label: 'Style',
                            description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                          })
                          .toJson()
                        ]
                      }
                    })
                    .toJson()]
              }).toJson()]
          },
          {
            key: '5',
            title: 'Security',
            id: '6Vw9iiDw9d0MD_Rh5cbIn',
            components: [...new DesignerToolbarSettings()
              .addSettingsInput({
                id: '1adea529-1f0c-4def-bd41-ee166a5dfcd7',
                inputType: 'permissions',
                propertyName: 'permissions',
                label: 'Permissions',
                size: 'small',
                parentId: '6Vw9iiDw9d0MD_Rh5cbIn'
              })
              .toJson()
            ]
          }
        ]
      }).toJson(),
    formSettings: {
      colon: false,
      layout: 'vertical' as FormLayout,
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    }
  };
};