import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import { FormLayout } from 'antd/lib/form/Form';

export const getSettings = (data) => {

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
                                id: '14817287-cfa6-4f8f-a998-4eb6cc7cb818',
                                inputType: 'text',
                                propertyName: 'componentName',
                                label: 'Component Name',
                                labelAlign: 'right',
                                jsSetting: false,
                            })
                            .addSettingsInputRow({
                                id: 'palceholder-tooltip-s4gmBg31azZC0UjZjpfTm',
                                parentId: 's4gmBg31azZC0UjZjpfTm',
                                inputs: [
                                    {
                                        type: 'dropdown',
                                        id: 'source-type-s4gmBg31azZC0UjZjpfTm',
                                        propertyName: 'sourceType',
                                        label: 'Source Type',
                                        size: 'small',
                                        dropdownOptions: [
                                            {
                                                label: 'Form',
                                                value: 'Form',
                                            },
                                            {
                                                label: 'Entity',
                                                value: 'Entity',
                                            },
                                            {
                                                label: 'Url',
                                                value: 'Url',
                                            },
                                        ],
                                        jsSetting: true,
                                    }
                                ],
                                readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                                id: 'entity-type-s4gmBg31azZC0UjZjpfTm',
                                parentId: 's4gmBg31azZC0UjZjpfTm',
                                hidden: { _code: 'return getSettingValue(data?.sourceType) !== "Entity";', _mode: 'code', _value: false } as any,
                                inputs: [
                                    {
                                        type: 'autocomplete',
                                        id: 'entity-type-s4gmBg31azZC0UjZjpfTm',
                                        propertyName: 'entityType',
                                        label: 'Entity Type',
                                        labelAlign: 'right',
                                        parentId: 'pnl54bf6-f76d-4139-a850-c99bf06c8b69',
                                        hidden: false,
                                        dataSourceType: 'url',
                                        validate: {},
                                        dataSourceUrl: '/api/services/app/Metadata/EntityTypeAutocomplete',
                                        settingsValidationErrors: []
                                    },
                                ],
                                readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                            })
                            .addSettingsInputRow({
                                id: 'endpoints-autocomplete-s4gmBg31azZC0UjZjpfTm',
                                parentId: 's4gmBg31azZC0UjZjpfTm',
                                hidden: { _code: 'return getSettingValue(data?.sourceType) !== "Url" && getSettingValue(data?.sourceType) !== "Entity";', _mode: 'code', _value: false } as any,
                                readOnly: { _code: 'return  getSettingValue(data?.readOnly);', _mode: 'code', _value: false } as any,
                                inputs: [
                                    {
                                        type: 'endpointsAutocomplete',
                                        id: 'type-s4gmBg31azZC0UjZjpfTm',
                                        propertyName: 'mode',
                                        label: 'Endpoint',
                                        size: 'small',
                                        jsSetting: true,

                                    }
                                ],
                            })
                            .addCollapsiblePanel({
                                id: 'filters-s4gmBg31azZC0UjZjpfTm',
                                parentId: 's4gmBg31azZC0UjZjpfTm',
                                label: 'Filters',
                                size: 'small',
                                content: {
                                    id: 'filters-s4gmBg31azZC0UjZjpfTm',
                                    components: [...new DesignerToolbarSettings()
                                        .addSettingsInput({
                                            id: 'max-result-count-s4gmBg31azZC0UjZjpfTm',
                                            propertyName: 'maxResultCount',
                                            label: 'Max Result Count',
                                            tooltip: 'Leave empty to get all records',
                                            jsSetting: true,
                                            inputType: 'number',
                                            min: 0,
                                        })
                                        .addSettingsInput({
                                            id: 'filters-s4gmBg31azZC0UjZjpfTm',
                                            propertyName: 'filters',
                                            label: 'Filters',
                                            inputType: 'filtersList',
                                            jsSetting: true,
                                            fieldsUnavailableHint: 'Please select `Entity Type` to be able to configure this filter.',
                                        })
                                        .toJson()
                                    ]
                                }

                            })
                            .toJson()
                        ]
                    },
                    {
                        key: '2',
                        title: 'Security',
                        id: '6Vw9iiDw9d0MD_Rh5cbIn',
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