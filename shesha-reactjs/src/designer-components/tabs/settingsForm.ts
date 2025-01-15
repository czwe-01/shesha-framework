import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import { FormLayout } from 'antd/lib/form/Form';
import { fontTypes, fontWeights, textAlign } from '../_settings/utils/font/utils';
import { getBorderInputs } from '../_settings/utils/border/utils';
import { getCornerInputs } from '../_settings/utils/border/utils';
import { repeatOptions } from '../_settings/utils/background/utils';
import { onAddNewItem } from './utils';
import { getItemSettings } from './itemSettings';

export const getSettings = () => {
    return {
        components: new DesignerToolbarSettings()
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
                        type: '',
                        components: [
                            ...new DesignerToolbarSettings()
                                .addSettingsInput({
                                    id: '14817287-cfa6-4f8f-a998-4eb6cc7cb818',
                                    inputType: 'text',
                                    propertyName: 'componentName',
                                    label: 'Component Name',
                                    labelAlign: 'right',
                                    jsSetting: false,
                                    validate: { required: true },
                                    parentId: 'root'
                                })
                                .addSettingsInput({
                                    id: '02deeaa2-1dc7-439f-8f1a-1f8bec6e8425',
                                    inputType: 'text',
                                    propertyName: 'defaultActiveKey',
                                    label: 'Default Active Tab',
                                    labelAlign: 'right',
                                    parentId: 'root'
                                })
                                .addSettingsInput({
                                    id: '4bb6cdc7-0657-4e41-8c50-effe14d0dc96',
                                    inputType: 'dropdown',
                                    propertyName: 'tabType',
                                    label: 'Tab Type',
                                    dropdownOptions: [
                                        { value: 'line', label: 'Label' },
                                        { value: 'card', label: 'Card' }
                                    ],
                                    jsSetting: false,
                                    labelAlign: 'right',
                                    parentId: 'root'

                                })
                                .addSettingsInput({
                                    id: '4595a895-5078-4986-934b-c5013bf315ad',
                                    inputType: 'itemListConfiguratorModal',
                                    propertyName: 'tabs',
                                    label: 'Tabs',
                                    labelAlign: 'right',
                                    parentId: 'root',
                                    settingsMarkupFactory: getItemSettings(),
                                    onAddNewItem: onAddNewItem,
                                    hidden: false
                                })
                                .addSettingsInput({
                                    id: 'd1e06550-826c-4db9-9b9f-ce05e565f64f',
                                    inputType: 'switch',
                                    propertyName: 'hidden',
                                    label: 'Hidden',
                                    labelAlign: 'right',
                                    parentId: 'root',
                                    hidden: false,
                                    validate: {}
                                })
                                .addSettingsInput({
                                    id: '24a8be15-98eb-40f7-99ea-ebb602693e9c',
                                    inputType: 'editModeSelector',
                                    propertyName: 'editMode',
                                    parentId: 'root',
                                    label: 'Edit mode'
                                })
                                .toJson()
                        ]
                    },
                    {
                        key: '4',
                        title: 'Appearance',
                        type: '',
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
                                        .addSettingsInput({
                                            id: '29be3a6a-129a-4004-a627-2b257ecb78b4',
                                            inputType: 'dropdown',
                                            propertyName: 'tabPosition',
                                            tooltip: "This will set the position for all buttons",
                                            label: 'Position',
                                            dropdownOptions: [
                                                { value: 'top', label: 'Top' },
                                                { value: 'bottom', label: 'Bottom' },
                                                { value: 'left', label: 'Left' },
                                                { value: 'right', label: 'Right' }
                                            ],
                                            labelAlign: 'right',
                                            parentId: 'root'
                                        })
                                        .addCollapsiblePanel({
                                            id: 'fontStyleCollapsiblePanel',
                                            propertyName: 'pnlFontStyle',
                                            label: 'Font',
                                            labelAlign: 'right',
                                            parentId: 'styleRouter',
                                            ghost: true,
                                            collapsible: 'header',
                                            content: {
                                                id: 'fontStylePnl',
                                                components: [...new DesignerToolbarSettings()
                                                    .addSettingsInputRow({
                                                        id: 'try26voxhs-HxJ5k5ngYE',
                                                        parentId: 'fontStylePnl',
                                                        inline: true,
                                                        propertyName: 'font',
                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        inputs: [
                                                            {
                                                                type: 'dropdown',
                                                                id: 'fontFamily-s4gmBg31azZC0UjZjpfTm',
                                                                label: 'Family',
                                                                propertyName: 'font.type',
                                                                hideLabel: true,
                                                                dropdownOptions: fontTypes,
                                                            },
                                                            {
                                                                type: 'number',
                                                                id: 'fontSize-s4gmBg31azZC0UjZjpfTm',
                                                                label: 'Size',
                                                                propertyName: 'font.size',
                                                                hideLabel: true,
                                                                width: 50,
                                                            },
                                                            {
                                                                type: 'dropdown',
                                                                id: 'fontWeight-s4gmBg31azZC0UjZjpfTm',
                                                                label: 'Weight',
                                                                propertyName: 'font.weight',
                                                                hideLabel: true,
                                                                tooltip: "Controls text thickness (light, normal, bold, etc.)",
                                                                dropdownOptions: fontWeights,
                                                                width: 100,
                                                            },
                                                            {
                                                                type: 'color',
                                                                id: 'fontColor-s4gmBg31azZC0UjZjpfTm',
                                                                label: 'Color',
                                                                hideLabel: true,
                                                                propertyName: 'font.color',
                                                            },
                                                            {
                                                                type: 'dropdown',
                                                                id: 'fontAlign-s4gmBg31azZC0UjZjpfTm',
                                                                label: 'Align',
                                                                propertyName: 'font.align',
                                                                hideLabel: true,
                                                                width: 60,
                                                                dropdownOptions: textAlign,
                                                            },
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
                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        inputs: [
                                                            {
                                                                type: 'text',
                                                                id: 'width-s4gmBg31azZC0UjZjpfTm',
                                                                label: "Width",
                                                                width: 85,
                                                                propertyName: "dimensions.width",
                                                                icon: "widthIcon",
                                                                tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"

                                                            },
                                                            {
                                                                type: 'text',
                                                                id: 'minWidth-s4gmBg31azZC0UjZjpfTm',
                                                                label: "Min Width",
                                                                width: 85,
                                                                hideLabel: true,
                                                                propertyName: "dimensions.minWidth",
                                                                icon: "minWidthIcon",
                                                            },
                                                            {
                                                                type: 'text',
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
                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        inputs: [
                                                            {
                                                                type: 'text',
                                                                id: 'height-s4gmBg31azZC0UjZjpfTm',
                                                                label: "Height",
                                                                width: 85,
                                                                propertyName: "dimensions.height",
                                                                icon: "heightIcon",
                                                                tooltip: "You can use any unit (%, px, em, etc). px by default if without unit"
                                                            },
                                                            {
                                                                type: 'text',
                                                                id: 'minHeight-s4gmBg31azZC0UjZjpfTm',
                                                                label: "Min Height",
                                                                width: 85,
                                                                hideLabel: true,
                                                                propertyName: "dimensions.minHeight",
                                                                icon: "minHeightIcon",
                                                            },
                                                            {
                                                                type: 'text',
                                                                id: 'maxHeight-s4gmBg31azZC0UjZjpfTm',
                                                                label: "Max Height",
                                                                width: 85,
                                                                hideLabel: true,
                                                                propertyName: "dimensions.maxHeight",
                                                                icon: "maxHeightIcon",
                                                            }
                                                        ]
                                                    })
                                                    .addSettingsInput({
                                                        id: 'predefinedSizes',
                                                        inputType: 'dropdown',
                                                        propertyName: 'size',
                                                        label: 'Size',
                                                        width: '150px',
                                                        hidden: { _code: 'return  getSettingValue(data?.dimensions?.width) || getSettingValue(data?.dimensions?.height);', _mode: 'code', _value: false } as any,
                                                        dropdownOptions: [
                                                            { value: 'small', label: 'Small' },
                                                            { value: 'medium', label: 'Medium' },
                                                            { value: 'large', label: 'Large' },
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
                                                    .addSettingsInputRow({
                                                        id: `borderStyleRow`,
                                                        parentId: 'borderStylePnl',
                                                        hidden: { _code: 'return  !getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.border?.hideBorder);', _mode: 'code', _value: false } as any,
                                                        readOnly: { _code: 'return getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        inputs: [
                                                            {
                                                                type: 'button',
                                                                id: 'borderStyleRow-hideBorder',
                                                                label: "Border",
                                                                hideLabel: true,
                                                                propertyName: "border.hideBorder",
                                                                icon: "EyeOutlined",
                                                                iconAlt: "EyeInvisibleOutlined"
                                                            },
                                                        ]
                                                    })
                                                    .addSettingsInputRow(
                                                        getBorderInputs()[0] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getBorderInputs()[1] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getBorderInputs()[2] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getBorderInputs()[3] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getBorderInputs()[4] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getCornerInputs()[0] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getCornerInputs()[1] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getCornerInputs()[2] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getCornerInputs()[3] as any
                                                    )
                                                    .addSettingsInputRow(
                                                        getCornerInputs()[4] as any
                                                    )
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
                                                            buttonGroupOptions: [
                                                                {
                                                                    value: "color",
                                                                    icon: "FormatPainterOutlined",
                                                                    title: "Color"
                                                                },
                                                                {
                                                                    value: "gradient",
                                                                    icon: "BgColorsOutlined",
                                                                    title: "Gradient"
                                                                },
                                                                {
                                                                    value: "image",
                                                                    icon: "PictureOutlined",
                                                                    title: "Image"
                                                                },
                                                                {
                                                                    value: "url",
                                                                    icon: "LinkOutlined",
                                                                    title: "URL"
                                                                },
                                                                {
                                                                    value: "storedFile",
                                                                    icon: "DatabaseOutlined",
                                                                    title: "Stored File"
                                                                }
                                                            ],
                                                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        })
                                                        .addSettingsInputRow({
                                                            id: "backgroundStyleRow-color",
                                                            parentId: "backgroundStylePnl",
                                                            inputs: [{
                                                                type: 'color',
                                                                id: 'backgroundStyleRow-color',
                                                                label: "Color",
                                                                propertyName: "background.color",
                                                                hideLabel: true,
                                                                jsSetting: false,
                                                            }],
                                                            hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "color";', _mode: 'code', _value: false } as any,
                                                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        })
                                                        .addSettingsInputRow({
                                                            id: "backgroundStyle-gradientColors",
                                                            parentId: "backgroundStylePnl",
                                                            inputs: [{
                                                                type: 'multiColorPicker',
                                                                id: 'backgroundStyle-gradientColors',
                                                                propertyName: "background.gradient.colors",
                                                                label: "Colors",
                                                                jsSetting: false,
                                                            }
                                                            ],
                                                            hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "gradient";', _mode: 'code', _value: false } as any,
                                                            hideLabel: true,
                                                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        })
                                                        .addSettingsInputRow({
                                                            id: "backgroundStyle-url",
                                                            parentId: "backgroundStylePnl",
                                                            inputs: [{
                                                                type: 'text',
                                                                id: 'backgroundStyle-url',
                                                                propertyName: "background.url",
                                                                jsSetting: false,
                                                                label: "URL",
                                                            }],
                                                            hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "url";', _mode: 'code', _value: false } as any,
                                                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        })
                                                        .addSettingsInputRow({
                                                            id: "backgroundStyle-image",
                                                            parentId: 'backgroundStylePnl',
                                                            inputs: [{
                                                                type: 'imageUploader',
                                                                id: 'backgroundStyle-image',
                                                                propertyName: 'background.uploadFile',
                                                                label: "Image",
                                                                jsSetting: false,
                                                            }],
                                                            hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "image";', _mode: 'code', _value: false } as any,
                                                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        })
                                                        .addSettingsInputRow({
                                                            id: "backgroundStyleRow-storedFile",
                                                            parentId: 'backgroundStylePnl',
                                                            hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.background?.type) !== "storedFile";', _mode: 'code', _value: false } as any,
                                                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                            inputs: [
                                                                {
                                                                    type: 'text',
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
                                                            readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                            inputs: [
                                                                {
                                                                    type: 'customDropdown',
                                                                    id: 'backgroundStyleRow-size',
                                                                    label: "Size",
                                                                    hideLabel: true,
                                                                    propertyName: "background.size",
                                                                    dropdownOptions: [
                                                                        {
                                                                            value: "cover",
                                                                            label: "Cover"
                                                                        },
                                                                        {
                                                                            value: "contain",
                                                                            label: "Contain"
                                                                        },
                                                                        {
                                                                            value: "auto",
                                                                            label: "Auto"
                                                                        }
                                                                    ],
                                                                },
                                                                {
                                                                    type: 'customDropdown',
                                                                    id: 'backgroundStyleRow-position',
                                                                    label: "Position",
                                                                    hideLabel: true,
                                                                    propertyName: "background.position",
                                                                    dropdownOptions: [
                                                                        {
                                                                            value: "center",
                                                                            label: "Center"
                                                                        },
                                                                        {
                                                                            value: "top",
                                                                            label: "Top"
                                                                        },
                                                                        {
                                                                            value: "left",
                                                                            label: "Left"
                                                                        },
                                                                        {
                                                                            value: "right",
                                                                            label: "Right"
                                                                        },
                                                                        {
                                                                            value: "bottom",
                                                                            label: "Bottom"
                                                                        },
                                                                        {
                                                                            value: "top left",
                                                                            label: "Top Left"
                                                                        },
                                                                        {
                                                                            value: "top right",
                                                                            label: "Top Right"
                                                                        },
                                                                        {
                                                                            value: "bottom left",
                                                                            label: "Bottom Left"
                                                                        },
                                                                        {
                                                                            value: "bottom right",
                                                                            label: "Bottom Right"
                                                                        }
                                                                    ],
                                                                },
                                                                {
                                                                    type: 'dropdown',
                                                                    id: 'backgroundStyleRow-repeat',
                                                                    label: "Repeat",
                                                                    hideLabel: true,
                                                                    propertyName: "background.repeat",
                                                                    dropdownOptions: repeatOptions,
                                                                }
                                                            ]
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
                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        inputs: [
                                                            {
                                                                type: 'number',
                                                                id: 'shadowStyleRow-offsetX',
                                                                label: 'Offset X',
                                                                hideLabel: true,
                                                                width: 60,
                                                                icon: "offsetHorizontalIcon",
                                                                propertyName: 'shadow.offsetX',
                                                            },
                                                            {
                                                                type: 'number',
                                                                id: 'shadowStyleRow-offsetY',
                                                                label: 'Offset Y',
                                                                hideLabel: true,
                                                                width: 60,
                                                                icon: 'offsetVerticalIcon',
                                                                propertyName: 'shadow.offsetY',
                                                            },
                                                            {
                                                                type: 'number',
                                                                id: 'shadowStyleRow-blurRadius',
                                                                label: 'Blur',
                                                                hideLabel: true,
                                                                width: 60,
                                                                icon: 'blurIcon',
                                                                propertyName: 'shadow.blurRadius',
                                                            },
                                                            {
                                                                type: 'number',
                                                                id: 'shadowStyleRow-spreadRadius',
                                                                label: 'Spread',
                                                                hideLabel: true,
                                                                width: 60,
                                                                icon: 'spreadIcon',
                                                                propertyName: 'shadow.spreadRadius',
                                                            },
                                                            {
                                                                type: 'color',
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
                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                        id: 'custom-css-412c-8461-4c8d55e5c073',
                                                        inputType: 'codeEditor',
                                                        propertyName: 'style',
                                                        hideLabel: false,
                                                        label: 'Style',
                                                        description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                                                    })
                                                    .toJson()
                                                ]
                                            }
                                        })
                                        .addCollapsiblePanel({
                                            id: 'tabCardStyleCollapsiblePanel',
                                            propertyName: 'cardStyle',
                                            label: 'Card Styles',
                                            labelAlign: 'right',
                                            collapsedByDefault: true,
                                            parentId: 'cardStyleRouter',
                                            collapsible: 'header',
                                            content: {
                                                id: 'tab-card-stylePnl',
                                                components: [...new DesignerToolbarSettings()
                                                    .addCollapsiblePanel({
                                                        id: 'fontStyleCollapsiblePanel',
                                                        propertyName: 'tabCardFontStyle',
                                                        label: 'Font',
                                                        labelAlign: 'right',
                                                        parentId: 'styleRouter',
                                                        ghost: true,
                                                        collapsible: 'header',
                                                        content: {
                                                            id: 'cardfontStylePnl',
                                                            components: [...new DesignerToolbarSettings()
                                                                .addSettingsInputRow({
                                                                    id: 'try26voxhs-HxJ5k5ngYE',
                                                                    parentId: 'cardfontStylePnl',
                                                                    inline: true,
                                                                    propertyName: 'card.font',
                                                                    readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                    inputs: [
                                                                        {
                                                                            type: 'dropdown',
                                                                            id: 'fontFamily-s4gmBg31azZC0UjZjpfTm',
                                                                            label: 'Family',
                                                                            propertyName: 'card.font.type',
                                                                            hideLabel: true,
                                                                            dropdownOptions: fontTypes,
                                                                        },
                                                                        {
                                                                            type: 'number',
                                                                            id: 'fontSize-s4gmBg31azZC0UjZjpfTm',
                                                                            label: 'Size',
                                                                            propertyName: 'card.font.size',
                                                                            hideLabel: true,
                                                                            width: 50,
                                                                        },
                                                                        {
                                                                            type: 'dropdown',
                                                                            id: 'fontWeight-s4gmBg31azZC0UjZjpfTm',
                                                                            label: 'Weight',
                                                                            propertyName: 'card.font.weight',
                                                                            hideLabel: true,
                                                                            tooltip: "Controls text thickness (light, normal, bold, etc.)",
                                                                            dropdownOptions: fontWeights,
                                                                            width: 100,
                                                                        },
                                                                        {
                                                                            type: 'color',
                                                                            id: 'fontColor-s4gmBg31azZC0UjZjpfTm',
                                                                            label: 'Color',
                                                                            hideLabel: true,
                                                                            propertyName: 'card.font.color',
                                                                        },
                                                                        {
                                                                            type: 'dropdown',
                                                                            id: 'fontAlign-s4gmBg31azZC0UjZjpfTm',
                                                                            label: 'Align',
                                                                            propertyName: 'card.font.align',
                                                                            hideLabel: true,
                                                                            width: 60,
                                                                            dropdownOptions: textAlign,
                                                                        },
                                                                    ],
                                                                })
                                                                .toJson()
                                                            ]
                                                        }
                                                    })
                                                    .addCollapsiblePanel({
                                                        id: 'backgroundStyleCollapsiblePanel',
                                                        propertyName: 'card.pnlBackgroundStyle',
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
                                                                        propertyName: "card.background.type",
                                                                        inputType: "radio",
                                                                        tooltip: "Select a type of background",
                                                                        buttonGroupOptions: [
                                                                            {
                                                                                value: "color",
                                                                                icon: "FormatPainterOutlined",
                                                                                title: "Color"
                                                                            },
                                                                            {
                                                                                value: "gradient",
                                                                                icon: "BgColorsOutlined",
                                                                                title: "Gradient"
                                                                            },
                                                                            {
                                                                                value: "image",
                                                                                icon: "PictureOutlined",
                                                                                title: "Image"
                                                                            },
                                                                            {
                                                                                value: "url",
                                                                                icon: "LinkOutlined",
                                                                                title: "URL"
                                                                            },
                                                                            {
                                                                                value: "storedFile",
                                                                                icon: "DatabaseOutlined",
                                                                                title: "Stored File"
                                                                            }
                                                                        ],
                                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                    })
                                                                    .addSettingsInputRow({
                                                                        id: "backgroundStyleRow-color",
                                                                        parentId: "backgroundStylePnl",
                                                                        inputs: [{
                                                                            type: 'color',
                                                                            id: 'backgroundStyleRow-color',
                                                                            label: "Color",
                                                                            propertyName: "card.background.color",
                                                                            hideLabel: true,
                                                                            jsSetting: false,
                                                                        }],
                                                                        hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.card?.background?.type) !== "color";', _mode: 'code', _value: false } as any,
                                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                    })
                                                                    .addSettingsInputRow({
                                                                        id: "backgroundStyle-gradientColors",
                                                                        parentId: "backgroundStylePnl",
                                                                        inputs: [{
                                                                            type: 'multiColorPicker',
                                                                            id: 'backgroundStyle-gradientColors',
                                                                            propertyName: "card.background.gradient.colors",
                                                                            label: "Colors",
                                                                            jsSetting: false,
                                                                        }
                                                                        ],
                                                                        hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.card?.background?.type) !== "gradient";', _mode: 'code', _value: false } as any,
                                                                        hideLabel: true,
                                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                    })
                                                                    .addSettingsInputRow({
                                                                        id: "backgroundStyle-url",
                                                                        parentId: "backgroundStylePnl",
                                                                        inputs: [{
                                                                            type: 'text',
                                                                            id: 'backgroundStyle-url',
                                                                            propertyName: "card.background.url",
                                                                            jsSetting: false,
                                                                            label: "URL",
                                                                        }],
                                                                        hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.card?.background?.type) !== "url";', _mode: 'code', _value: false } as any,
                                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                    })
                                                                    .addSettingsInputRow({
                                                                        id: "backgroundStyle-image",
                                                                        parentId: 'backgroundStylePnl',
                                                                        inputs: [{
                                                                            type: 'imageUploader',
                                                                            id: 'backgroundStyle-image',
                                                                            propertyName: 'card.background.uploadFile',
                                                                            label: "Image",
                                                                            jsSetting: false,
                                                                        }],
                                                                        hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.card?.background?.type) !== "image";', _mode: 'code', _value: false } as any,
                                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                    })
                                                                    .addSettingsInputRow({
                                                                        id: "backgroundStyleRow-storedFile",
                                                                        parentId: 'backgroundStylePnl',
                                                                        hidden: { _code: 'return  getSettingValue(data[`${contexts.canvasContext?.designerDevice || "desktop"}`]?.card?.background?.type) !== "storedFile";', _mode: 'code', _value: false } as any,
                                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                        inputs: [
                                                                            {
                                                                                type: 'text',
                                                                                id: 'backgroundStyle-storedFile',
                                                                                jsSetting: false,
                                                                                propertyName: "card.background.storedFile.id",
                                                                                label: "File ID"
                                                                            }
                                                                        ]
                                                                    })
                                                                    .addSettingsInputRow({
                                                                        id: "backgroundStyleRow-controls",
                                                                        parentId: 'backgroundStyleRow',
                                                                        inline: true,
                                                                        readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                        inputs: [
                                                                            {
                                                                                type: 'customDropdown',
                                                                                id: 'backgroundStyleRow-size',
                                                                                label: "Size",
                                                                                hideLabel: true,
                                                                                propertyName: "card.background.size",
                                                                                dropdownOptions: [
                                                                                    {
                                                                                        value: "cover",
                                                                                        label: "Cover"
                                                                                    },
                                                                                    {
                                                                                        value: "contain",
                                                                                        label: "Contain"
                                                                                    },
                                                                                    {
                                                                                        value: "auto",
                                                                                        label: "Auto"
                                                                                    }
                                                                                ],
                                                                            },
                                                                            {
                                                                                type: 'customDropdown',
                                                                                id: 'backgroundStyleRow-position',
                                                                                label: "Tab Position",
                                                                                hideLabel: true,
                                                                                propertyName: "card.background.position",
                                                                                dropdownOptions: [
                                                                                    {
                                                                                        value: "center",
                                                                                        label: "Center"
                                                                                    },
                                                                                    {
                                                                                        value: "top",
                                                                                        label: "Top"
                                                                                    },
                                                                                    {
                                                                                        value: "left",
                                                                                        label: "Left"
                                                                                    },
                                                                                    {
                                                                                        value: "right",
                                                                                        label: "Right"
                                                                                    },
                                                                                    {
                                                                                        value: "bottom",
                                                                                        label: "Bottom"
                                                                                    },
                                                                                    {
                                                                                        value: "top left",
                                                                                        label: "Top Left"
                                                                                    },
                                                                                    {
                                                                                        value: "top right",
                                                                                        label: "Top Right"
                                                                                    },
                                                                                    {
                                                                                        value: "bottom left",
                                                                                        label: "Bottom Left"
                                                                                    },
                                                                                    {
                                                                                        value: "bottom right",
                                                                                        label: "Bottom Right"
                                                                                    }
                                                                                ],
                                                                            },
                                                                            {
                                                                                type: 'dropdown',
                                                                                id: 'backgroundStyleRow-repeat',
                                                                                label: "Repeat",
                                                                                hideLabel: true,
                                                                                propertyName: "card.background.repeat",
                                                                                dropdownOptions: repeatOptions,
                                                                            }
                                                                        ]
                                                                    })
                                                                    .toJson()
                                                            ],
                                                        }
                                                    })
                                                    .addCollapsiblePanel({
                                                        id: 'customStyleCollapsiblePanel',
                                                        propertyName: 'card.customStyle',
                                                        label: 'Custom Styles',
                                                        labelAlign: 'right',
                                                        ghost: true,
                                                        parentId: 'styleRouter',
                                                        collapsible: 'header',
                                                        content: {
                                                            id: 'stylePnl-M500-911MFR',
                                                            components: [...new DesignerToolbarSettings()
                                                                .addSettingsInput({
                                                                    readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                                                    id: 'custom-css-412c-8461-4c8d55e5c073',
                                                                    inputType: 'codeEditor',
                                                                    propertyName: 'card.style',
                                                                    hideLabel: false,
                                                                    label: 'Style',
                                                                    description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
                                                                })
                                                                .toJson()
                                                            ]
                                                        }
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
                        type: '',
                        components: [...new DesignerToolbarSettings()
                            .addSettingsInput({
                                readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
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