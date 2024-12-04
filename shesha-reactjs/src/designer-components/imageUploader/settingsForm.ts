import { nanoid } from '@/utils/uuid';
import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import { FormLayout } from 'antd/es/form/Form';

export const getSettings = () => {

    return {
        components: new DesignerToolbarSettings()
            .addCollapsiblePanel({
                id: '11164664-cbc9-4cef-babc-6fbea44cd0ca',
                propertyName: 'pnlDisplay',
                parentId: 'root',
                label: 'Display',
                labelAlign: 'left',
                expandIconPosition: 'start',
                ghost: true,
                collapsible: 'header',
                content: {
                    id: 'pnl64664-cbc9-4cef-babc-6fbea44cd0ca',
                    components: [
                        ...new DesignerToolbarSettings()
                            .addContextPropertyAutocomplete({
                                id: '5c813b1a-04c5-4658-ac0f-cbcbae6b3bd4',
                                propertyName: 'propertyName',
                                parentId: 'root',
                                label: 'Property name',
                                validate: {
                                    required: true,
                                },
                            })
                            .addTextField({
                                id: '46d07439-4c18-468c-89e1-60c002ce96c5',
                                propertyName: 'label',
                                parentId: 'root',
                                label: 'Label',
                            })
                            .addDropdown({
                                id: '57a40a33-7e08-4ce4-9f08-a34d24a83338',
                                propertyName: 'labelAlign',
                                parentId: 'root',
                                label: 'Label align',
                                values: [
                                    {
                                        label: 'left',
                                        value: 'left',
                                        id: 'f01e54aa-a1a4-4bd6-ba73-c395e48af8ce',
                                    },
                                    {
                                        label: 'right',
                                        value: 'right',
                                        id: 'b920ef96-ae27-4a01-bfad-b5b7d07218da',
                                    },
                                ],
                                dataSourceType: 'values',
                            })
                            .addTextArea({
                                id: '2d32fe70-99a0-4825-ae6c-8b933004e119',
                                propertyName: 'description',
                                parentId: 'root',
                                label: 'Description',
                            }).toJson()
                    ],
                },
            })
            .addCollapsiblePanel({
                id: '11164664-cbc9-4cef-babc-6fbea55cd0ca',
                propertyName: 'separatorColor',
                parentId: 'root',
                label: 'Color',
                labelAlign: 'left',
                expandIconPosition: 'start',
                ghost: true,
                collapsible: 'header',
                content: {
                    id: 'pnl64664-cbc9-4cdf-babc-6fbea44cd0ca',
                    components: [
                        ...new DesignerToolbarSettings()
                            .addCheckbox({
                                id: nanoid(),
                                propertyName: 'hidden',
                                parentId: 'root',
                                label: 'Hidden',
                            })
                            .addCheckbox({
                                id: 'c6885251-96a6-40ce-99b2-4b5209a9e01c',
                                propertyName: 'hideLabel',
                                parentId: 'root',
                                label: 'Hide Label',
                            })
                            .addEditMode({
                                id: '24a8be15-98eb-40f7-99ea-ebb602693e9c',
                                propertyName: 'editMode',
                                parentId: 'abc54bf6-f76d-4139-a850-c99bf06c8b69',
                                label: "Edit mode",
                            })
                            .toJson(),
                    ],
                },
            })
            .addCollapsiblePanel({
                id: 'eb91c2f5-592e-4f60-ba1a-f1d2011a5290',
                propertyName: 'pnlSecurity',
                parentId: 'root',
                label: 'Security',
                labelAlign: "left",
                expandIconPosition: "start",
                ghost: true,
                collapsible: 'header',
                content: {
                    id: 'pnl24bf6-f76d-4139-a850-c99bf06c8b71',
                    components: [...new DesignerToolbarSettings()
                        .addPermissionAutocomplete({
                            id: '4d81ae9d-d222-4fc1-85b2-4dc3ee6a3721',
                            propertyName: 'permissions',
                            label: 'Permissions',
                            labelAlign: 'right',
                            parentId: 'root',
                            hidden: false,
                            validate: {},
                        }).toJson()
                    ]
                }
            })
            .toJson(),
        formSettings: {
            colon: false,
            layout: 'vertical' as FormLayout,
            labelCol: { span: 24 },
            wrapperCol: { span: 24 }
        }
    };
};
