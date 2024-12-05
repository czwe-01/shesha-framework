import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import { nanoid } from '@/utils/uuid';
import { FormLayout } from 'antd/es/form/Form';

export const getSettings = (data: any) => {

  return {
    components: new DesignerToolbarSettings(data)
      .addSearchableTabs({
        id: nanoid(),
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
            id: nanoid(),
            components: [...new DesignerToolbarSettings()
              .addContextPropertyAutocomplete({
                id: nanoid(),
                propertyName: 'propertyName',
                parentId: '87667bd9-0ba6-4f29-a7d3-aecdac17da2a',
                label: 'Property name',
                size: 'small',
                validate: {
                  required: true,
                },
              })
              .addSettingsInput({
                id: nanoid(),
                inputType: 'codeEditor',
                propertyName: 'renderer',
                parentId: '87667bd9-0ba6-4f29-a7d3-aecdac17da2a',
                label: 'Render HTML',
                description: 'Enter custom JSX script that will render a component',
                // wrapInTemplate: true,
                // templateSettings: {
                //   "functionName": "renderer"
                // },
                // availableConstantsExpression: async ({ metadataBuilder, data }) => {
                //   const { modelType } = data ?? {};
                //   const result = metadataBuilder.object("constants");
                //   if (modelType) {
                //     await result.addEntityAsync("data", "Form data", modelType);
                //     await result.addEntityAsync("initialValues", "Initial values", modelType);
                //   } else {
                //     result.addObject("data", "Form data");
                //     result.addObject("initialValues", "Initial values");
                //   };

                //   result.addObject("parentFormValues", "Parent form values. The values of the form rendering the dialog.");

                //   result.addStandard([
                //     "shesha:form",
                //     "shesha:globalState",
                //     "shesha:setGlobalState",
                //     "shesha:http",
                //     "shesha:message",
                //     "shesha:pageContext",
                //     "shesha:contexts",
                //     "shesha:moment",
                //   ]);
                //   return JSON.stringify(result.build());
                // },
              })
              .addSettingsInput({
                id: nanoid(),
                propertyName: 'hidden',
                parentId: '87667bd9-0ba6-4f29-a7d3-aecdac17da2a',
                label: 'Hidden',
                inputType: 'switch',
              })
              .toJson()
            ],
          },
          {
            key: '2',
            title: 'Security',
            id: nanoid(),
            components: [...new DesignerToolbarSettings()
              .addSettingsInput({
                id: '4d81ae9d-d222-4fc1-85b2-4dc3ee6a3721',
                propertyName: 'permissions',
                label: 'Permissions',
                labelAlign: 'right',
                parentId: 'root',
                hidden: false,
                validate: {},
                inputType: 'propertyAutocomplete',
              }).toJson()
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

  }
}