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
                                tooltip: 'This name will be used as identifier and in the code editor',
                                jsSetting: false,
                                validate: {
                                    required: true
                                }
                            })
                            .addSettingsInput({
                                id: 'description-s4gmBg31azZC0UjZjpfTm',
                                propertyName: 'description',
                                label: 'Description',
                                inputType: 'text',
                                jsSetting: true,
                            })
                            .addSettingsInput({
                                id: 'items-s4gmBg31azZC0UjZjpfTm',
                                propertyName: 'items',
                                label: 'Context Metadata',
                                inputType: 'contextMetadata',
                                jsSetting: true,
                            })
                            .addSettingsInput({
                                id: 'initialDataCode-s4gmBg31azZC0UjZjpfTm',
                                propertyName: 'initialDataCode',
                                label: 'Initial Data',
                                inputType: 'codeEditor',
                                jsSetting: false
                            })
                            .addSettingsInput({
                                id: 'F3B46A95-703F-4465-96CA-A58496A5F78C',
                                propertyName: 'onInitAction',
                                inputType: 'configurableActionsConfigurator',
                                label: 'On Init Data Context',
                                level: 1,
                                hideLabel: true
                            })
                            .addSettingsInput({
                                id: 'F4B57A06-703F-4465-96CA-A58496A5F78C',
                                propertyName: 'onChangeAction',
                                inputType: 'configurableActionsConfigurator',
                                label: 'On Data Context Changed',
                                level: 1,
                                hideLabel: true
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
                                tooltip: "Enter a list of permissions that should be associated with this component",
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