import { DesignerToolbarSettings } from '@/interfaces/toolbarSettings';

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
          })
          .addTextField({
            id: '53cd10ce-25af-474b-af75-8e7b1f19e52d',
            propertyName: 'mask',
            label: 'Mask',
            parentId: 'root',
            description: 'The masking pattern to be applied to the <input>'})          
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
    })
    .toJson();
