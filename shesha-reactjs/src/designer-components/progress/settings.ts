import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import { FormLayout } from 'antd/es/form/Form';
import { nanoid } from '@/utils/uuid';

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
            components: [
              ...new DesignerToolbarSettings()
                .addContextPropertyAutocomplete({
                  id: '5c813b1a-04c5-4658-ac0f-cbcbae6b3bd4',
                  propertyName: 'propertyName',
                  parentId: 'root',
                  label: 'Property name',
                  validate: { required: true },
                  size: 'small',
                  styledLabel: true,
                })
                .addLabelConfigurator({
                  id: nanoid(),
                  propertyName: 'hideLabel',
                  label: 'Label',
                  parentId: 'root',
                  hideLabel: true,
                })
                .addSettingsInput({
                  id: 'a62a1d47-4255-4e0c-abae-ee313dada8d4',
                  propertyName: 'format',
                  size: 'small',
                  label: 'Format',
                  inputType: 'codeEditor',
                  exposedVariables: [
                    `{
                      id: '4925a95d-6521-4856-a253-bd9f042a7388',
                      name: 'percent',
                      description: 'Progress percentage',
                      type: 'number',
                    }`,
                    `{
                      id: '2b8f3030-00aa-4081-85ac-2b5c7692615e',
                      name: 'successPercent',
                      description: 'success percentage',
                      type: 'number',
                    }`,
                  ],
                  description: 'The template function of the content. This function should return string or number',
                })
                .addSettingsInput({
                  id: 'b10d0c9f-d83a-44c5-94e6-0d30f95a36cb',
                  propertyName: 'percent',
                  label: 'Percent',
                  description: 'To set the completion percentage',
                  jsSetting: true,
                  inputType: 'number',
                })
                .addSettingsInput({
                  id: '55e685e0-0277-4543-9fc2-1083c2603930',
                  propertyName: 'showInfo',
                  label: 'Show Info',
                  defaultValue: true,
                  inputType: 'switch',
                })
                .addSettingsInput({
                  id: '9fa733bf-0cad-4a67-9461-e8df24ea4a13',
                  propertyName: 'success',
                  inputType: 'codeEditor',
                  label: 'Success',
                  description:
                    'Configs of successfully progress bar. Returns an object of this format: { percent: number, strokeColor: string }',
                })
                .addContainer({
                  id: 'fdb031ce-250f-4c7f-8ff9-b35ac59e1946',
                  propertyName: 'lineContainer',
                  direction: 'vertical',
                  hidden: { _code: 'return  getSettingValue(data?.progressType) !== "line";', _mode: 'code', _value: false } as any,
                  components: new DesignerToolbarSettings()
                    .addNumberField({
                      id: '7decc517-9c50-433c-a23f-2054b5684a80',
                      propertyName: 'steps',
                      label: 'Steps',
                      description: 'The total step count',
                    })
                    .addCodeEditor({
                      id: '7decc517-9c50-433c-a23f-2054b5684a80',
                      propertyName: 'lineStrokeColor',
                      label: 'Stroke Width',
                      description:
                        'The color of progress bar, render linear-gradient when passing an object, could accept string[] when has steps. ' +
                        'Write the code that returns any of the following: `string | string[] | { from: string; to: string; direction: string }`',
                      mode: 'dialog',
                    })
                    .toJson(),
                }).toJson()
            ]
          },
          {
            key: '2',
            title: 'Appearance',
            id: nanoid(),
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: '173e3a29-786f-44b8-b569-7f033c543e24',
                  propertyName: 'progressType',
                  parentId: 'root',
                  hidden: false,
                  label: 'Type',
                  inputType: 'dropdown',
                  dropdownOptions: [
                    { label: 'Line', value: 'line' },
                    { label: 'Circle', value: 'circle' },
                    { label: 'Dashboard', value: 'dashboard' },
                  ],
                  validate: { required: true },
                })
                .addSettingsInput({
                  id: 'c8360d69-0da2-4875-8dae-a0a41fb924fc',
                  propertyName: 'status',
                  inputType: 'dropdown',
                  label: 'Status',
                  description: 'To set the status of the Progress.',
                  dropdownOptions: [
                    { label: 'Success', value: 'success' },
                    { label: 'Exception', value: 'exception' },
                    { label: 'Normal', value: 'normal' },
                    { label: 'Active', value: 'active' },
                  ],
                })
                .addSettingsInputRow({
                  id: 'try26voxhs-HxJ5k5ngYE',
                  parentId: 'fontStylePnl',
                  readOnly: false,
                  propertyName: 'gap',
                  inputs: [
                    {
                      id: '6e316ddf-183d-4477-a21d-22919292e6df',
                      propertyName: 'strokeColor',
                      label: 'Stroke Color',
                      //hidden: { _code: 'return  ["dashboard"].includes(getSettingValue(data?.progressType));', _mode: 'code', _value: false } as any,
                      description:
                        "The color of progress bar. This will be 'overridden' by the the 'strokeColor' property of 'line' and 'circle' types",
                      type: 'color'
                    },
                    {
                      id: 'd72986e5-e099-4ba7-8ffe-b8e394542524',
                      propertyName: 'trailColor',
                      label: 'Trail Color',
                      description: 'The color of unfilled part',
                      type: 'color'
                    }
                  ],
                })
                .addSettingsInput({
                  id: 'd8b4769a-4499-42f9-9753-3caba0d44b39',
                  propertyName: 'strokeLinecap',
                  label: 'Stroke Linecap',
                  parentId: 'root',
                  hidden: false,
                  defaultValue: 'round',
                  inputType: 'dropdown',
                  dropdownOptions: [
                    { label: 'Round', value: 'round' },
                    { label: 'Butt', value: 'butt' },
                    { label: 'Square', value: 'square' },
                  ],
                  validate: { required: true },
                })
                .addSettingsInput({
                  id: '6ffeac8a-71e0-4a98-bfe9-a47d3b1d0fa0',
                  propertyName: 'strokeWidth',
                  label: 'Stroke Width',
                  description: 'To set the width of the circular progress, unit: percentage of the canvas width in px',
                  defaultValue: 6,
                  inputType: 'number',
                })
                .addSettingsInput({
                  id: '1bc6dfc0-6088-4a99-a667-ae6bd6943be4',
                  propertyName: 'width',
                  label: 'Width',
                  description: 'To set the canvas width of the circular progress, unit: px',
                  hidden: { _code: 'return  !["circle", "dashboard"].includes(getSettingValue(data?.progressType));', _mode: 'code', _value: false } as any,
                  inputType: 'number',
                })
                .addSettingsInputRow({
                  id: 'try26voxhs-HxJ5k5ngYE',
                  parentId: 'fontStylePnl',
                  inline: true,
                  readOnly: false,
                  propertyName: 'gap',
                  inputs: [
                    {
                      id: 'bdf1f1d3-21b2-4135-b482-72e784ea1d39',
                      propertyName: 'gapPosition',
                      parentId: 'root',
                      hidden: false,
                      label: 'Gap Position',
                      type: 'dropdown',
                      dropdownOptions: [
                        { label: 'top', value: 'top' },
                        { label: 'bottom', value: 'bottom' },
                        { label: 'left', value: 'left' },
                        { label: 'right', value: 'right' },
                      ],
                      validate: { required: true },
                    },
                    {
                      propertyName: 'gapDegree',
                      label: 'Gap Degree',
                      id: '25e604fc-5d88-4299-a596-5b51f0724675',
                      //stepNumeric: 0,
                      //stepString: '',
                      //min: 0,
                      //max: 295,
                      type: 'number',
                    }
                  ],
                })
                .toJson()
            ]
          }
          ,
          {
            key: '3',
            title: 'Security',
            id: nanoid(),
            components: [
              ...new DesignerToolbarSettings()
                .addSettingsInput({
                  id: '4d81ae9d-d222-4fc1-85b2-4dc3ee6a3721',
                  propertyName: 'permissions',
                  label: 'Permissions',
                  labelAlign: 'right',
                  parentId: 'root',
                  hidden: false,
                  validate: {},
                  inputType: 'permissions'
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
  };
};
