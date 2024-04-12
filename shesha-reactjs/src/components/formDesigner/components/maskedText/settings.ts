import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';
import { nanoid } from 'nanoid';

export const getSettings = () =>
  new DesignerToolbarSettings()
    .addCollapsiblePanel({
      id: '11114bf6-f76d-4139-a850-c99bf06c8b69',
      propertyName: 'pnl',
      parentId: 'root',
      label: 'Display',
      labelAlign: "right",
      expandIconPosition: "start",
      ghost: true,
      collapsible: 'header',
      content: {
        id:'abc54bf6-f76d-4139-a850-c99bf06c8b69',
        components: [...new DesignerToolbarSettings()
          .addContextPropertyAutocomplete({
            id: '5c813b1a-04c5-4658-ac0f-cbcbae6b3bd4',
            propertyName: 'propertyName',
            parentId: 'abc54bf6-f76d-4139-a850-c99bf06c8b69',
            label: 'Property name',
            validate: {
              required: true,
            },
          })
          .addTextField({
            id: '46d07439-4c18-468c-89e1-60c002ce96c5',
            propertyName: 'label',
            parentId: 'abc54bf6-f76d-4139-a850-c99bf06c8b69',
            label: 'Label',
          })
          .addDropdown({
            id: '57a40a33-7e08-4ce4-9f08-a34d24a83338',
            propertyName: 'labelAlign',
            parentId: 'abc54bf6-f76d-4139-a850-c99bf06c8b69',
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
            parentId: 'abc54bf6-f76d-4139-a850-c99bf06c8b69',
            label: 'Description',
          }).addDropdown({
          id: '8615d12f-6ea0-4b11-a1a1-6088c7160fy9',
          propertyName: 'value',
          parentId: 'pnl44bf6-f76d-4139-a850-c99bf06c8b69',
          label: 'Value',
          allowClear: true,
          values: [
            {
              label: 'Thulasizwe',
              value: 'Thulasizwe',
              id: '4f11403c-95fd-4e49-bb60-cb8c25f0f3c3',
            },
            {
              label: 'number',
              value: '9801155450085',
              id: '8f85c476-e632-4fa7-89ad-2be6cfb7f1f1',
            },
            {
              label: 'Jack',
              value: 'Jack',
              id: 'f01e54aa-a1a4-4bd6-ba73-c395e48af8ce',
            },
          ],
          dataSourceType: 'values',
        })
          .addTextField({
            id: '53cd10ce-25af-474b-af75-8e7b1f19e52d',
            propertyName: 'mask',
            label: 'Mask',
            parentId: 'root',
            description: "The masking pattern to be applied to the <input>, use '_' for letters and '#' for numbers",})          
          .addCheckbox({
            id: 'cfd7d45e-c7e3-4a27-987b-dc525c412448',
            propertyName: 'hidden',
            parentId: 'abc54bf6-f76d-4139-a850-c99bf06c8b69',
            label: 'Hidden',
          })
          .addCheckbox({
            id: 'c6885251-96a6-40ce-99b2-4b5209a9e01c',
            propertyName: 'hideLabel',
            parentId: 'abc54bf6-f76d-4139-a850-c99bf06c8b69',
            label: 'Hide Label',
          })
          .addEditMode({
            id: '24a8be15-98eb-40f7-99ea-ebb602693e9c',
            propertyName: 'editMode',
            parentId: 'abc54bf6-f76d-4139-a850-c99bf06c8b69',
            label: "Edit mode",
          })
          .toJson()
        ]
      }
    })

    .addCollapsiblePanel({
      id: 'd675bfe4-ee69-431e-931b-b0e0b9ceee6f',
      propertyName: 'pnlValidation',
      parentId: 'root',
      label: 'Validation',
      labelAlign: "right",
      expandIconPosition: "start",
      ghost: true,
      collapsible: 'header',
      content: {
        id:'abc5bfe4-ee69-431e-931b-b0e0b9ceee6f',
        components: [...new DesignerToolbarSettings()
          .addCheckbox({
            id: 'abc5bfe4-ee69-431e-931b-b0e0b9ceee6f',
            propertyName: 'validate.required',
            parentId: 'root',
            label: 'Required',
          }).toJson()
        ]
      }
    }).addCollapsiblePanel({
    id: '3335bfe4-ee69-431e-931b-b0e0b9ceee6f',
    propertyName: 'pnlStyle',
    parentId: 'root',
    label: 'Style',
    labelAlign: "left",
    expandIconPosition: "start",
    ghost: true,
    collapsible: 'header',
    content: {
      id:'pnl44bf6-f76d-4139-a850-c99bf06c8b69',
      components: [...new DesignerToolbarSettings()    
        .addCodeEditor({
          id: '06ab0599-914d-4d2d-875c-765a495472f8',
          propertyName: 'style',
          label: 'Style',
          parentId: 'pnl44bf6-f76d-4139-a850-c99bf06c8b69',
          validate: {},
          settingsValidationErrors: [],
          description: 'A script that returns the style of the element as an object. This should conform to CSSProperties',
          exposedVariables: [
            {
              id: nanoid(),
              name: 'data',
              description: 'Form values',
              type: 'object',
            },
          ],
        })
        .addDropdown({
          id: '8615d12f-6ea0-4b11-a1a1-6088c7160fd9',
          propertyName: 'size',
          parentId: 'pnl44bf6-f76d-4139-a850-c99bf06c8b69',
          label: 'Size',
          allowClear: true,
          values: [
            {
              label: 'Small',
              value: 'small',
              id: '4f11403c-95fd-4e49-bb60-cb8c25f0f3c3',
            },
            {
              label: 'Middle',
              value: 'middle',
              id: '8f85c476-e632-4fa7-89ad-2be6cfb7f1f1',
            },
            {
              label: 'Large',
              value: 'large',
              id: 'f01e54aa-a1a4-4bd6-ba73-c395e48af8ce',
            },
          ],
          dataSourceType: 'values',
        }).toJson()
      ]
    }
  })
    .toJson();
