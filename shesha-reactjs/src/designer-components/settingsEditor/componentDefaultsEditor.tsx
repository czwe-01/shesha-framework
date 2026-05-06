import { FormMarkup, IToolboxComponent } from '@/interfaces';
import { ComponentOutlined } from '@ant-design/icons';
import React, { useEffect, useRef } from 'react';
import { ComponentsScreen } from '@/generic-pages/settings/dynamic-theme/componentsScreen';
import settingsFormJson from './settingsForm.json';
import { useSettingsEditor } from '@/components/settingsEditor/provider';
import { FRONTEND_DEFAULT_APP_KEY, ISettingIdentifier } from '@/components/settingsEditor/provider/models';
import { useShaFormDataUpdate, useShaFormInstance } from '@/providers/form/providers/shaFormProvider';
import { useSheshaApplication } from '@/providers/sheshaApplication';
import { IConfigurableTheme, useTheme } from '@/providers/theme';
import { validateConfigurableComponentSettings } from '@/providers/form/utils';

const settingsForm = settingsFormJson as FormMarkup;

const ComponentDefaultsEditorComponent: IToolboxComponent<any> = {
  type: 'componentDefaultsEditor',
  name: 'Component defaults editor',
  icon: <ComponentOutlined />,
  isInput: true,
  isOutput: true,
  Factory: () => {
    useShaFormDataUpdate();

    const { applicationKey = null } = useSheshaApplication();
    const { selectedApplication = null, editorMode, setEditor, saveSettingValue } = useSettingsEditor(false) ?? {};
    const { theme, changeTheme, resetToApplicationTheme } = useTheme();
    const form = useShaFormInstance();
    const initialValues = useRef(theme);
    const localTheme = useRef<IConfigurableTheme>();

    useEffect(() => {
      setEditor({
        save: () => {
          changeTheme(localTheme.current, applicationKey === (selectedApplication?.appKey ?? FRONTEND_DEFAULT_APP_KEY));
          const settingId: ISettingIdentifier = {
            name: 'Shesha.ThemeSettings',
            module: 'Shesha',
            appKey: selectedApplication?.appKey,
          };

          return saveSettingValue(settingId, localTheme.current)
            .then(() => {
              initialValues.current = localTheme.current;
            })
            .catch((error) => {
              throw error;
            });
        },
        cancel() {
          changeTheme(initialValues.current);
        },
      });
      initialValues.current = form.formData;
      return () => {
        resetToApplicationTheme();
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (form.formData) {
        changeTheme(form.formData);
        localTheme.current = form.formData;
      }
    }, [form.formData, changeTheme]);

    const onChangeInternal = (changedValue: IConfigurableTheme): void => {
      form.setFormData({ values: changedValue, mergeValues: true });
    };

    return (
      <ComponentsScreen value={form.formData} onChange={onChangeInternal} readonly={editorMode === 'readonly'} />
    );
  },
  settingsFormMarkup: settingsForm,
  validateSettings: (model) => validateConfigurableComponentSettings(settingsForm, model),
};

export default ComponentDefaultsEditorComponent;
