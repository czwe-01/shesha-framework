import React, { FC, useMemo } from 'react';
import SettingsForm, { useSettingsForm } from '@/designer-components/_settings/settingsForm';
import SettingsFormItem from '@/designer-components/_settings/settingsFormItem';
import {
  Divider,
  InputNumber,
} from 'antd';
import { IDataSourceComponentProps } from './models';
import { ISettingsFormFactoryArgs } from '@/interfaces';
import { MetadataProvider } from '@/providers/metadata';
import SettingsCollapsiblePanel from '@/designer-components/_settings/settingsCollapsiblePanel';
import { PermissionAutocomplete } from '@/components/permissionAutocomplete';
import LabelConfiguratorComponent from '../styleLabel/labelConfigurator';
import { SettingInput } from '../settingsInput/settingsInput';
import { nanoid } from '@/utils/uuid';

const DataSourceSettings: FC<ISettingsFormFactoryArgs<IDataSourceComponentProps>> = (props) => {
  const { readOnly } = props;

  const { model: state } = useSettingsForm<IDataSourceComponentProps>();

  const settings = (
    <>
      <SettingInput type='text' propertyName='componentName' label='Component Name' id={nanoid()} />
      <LabelConfiguratorComponent label='Label' />
      <SettingInput type='dropdown' label='Source Type' propertyName='sourceType' id={nanoid()}
        dropdownOptions={[{ label: 'Form', value: 'Form' }, { label: 'Entity', value: 'Entity' }, { label: 'Url', value: 'Url' }]} />

      {(state.sourceType === 'Entity') &&
        <SettingInput id='entityType' type='autocomplete' propertyName='entityType' label='Entity Type' dataSourceType='url' dataSourceUrl='/api/services/app/Metadata/EntityTypeAutocomplete' />
      }
      {(state.sourceType === 'Entity' || state.sourceType === 'Url') &&
        <SettingInput type='endpointsAutocomplete' id='endpoint' propertyName="endpoint" label='Endpoint' />
      }
      <SettingsCollapsiblePanel header='Filters'>
        <SettingsFormItem name="maxResultCount" label='Max result count' tooltip='Leave empty to get all records' jsSetting>
          <InputNumber min={0} />
        </SettingsFormItem>
        <SettingInput type='number' min={0} id='mexResultCount' propertyName="maxResultCount" label='Max result count' tooltip='Leave empty to get all records' />
        <Divider />
        <SettingInput propertyName="filters" type='filterList' id='filters' label='' />

      </SettingsCollapsiblePanel>

      <SettingsCollapsiblePanel header="Security">
        <SettingsFormItem
          jsSetting
          label="Permissions"
          name="permissions"
          initialValue={props.model.permissions}
          tooltip="Enter a list of permissions that should be associated with this component"
        >
          <PermissionAutocomplete readOnly={readOnly} />
        </SettingsFormItem>
      </SettingsCollapsiblePanel>
    </>
  );

  const meta = useMemo(() => {
    return <MetadataProvider id={state.id} modelType={state.entityType}>{settings}</MetadataProvider>;
  }, [state.entityType, state.sourceType]);

  return state.sourceType === 'Entity' && state.entityType ? meta : settings;
};

export const DataSourceSettingsForm: FC<ISettingsFormFactoryArgs<IDataSourceComponentProps>> = (props) => {
  return (
    SettingsForm<IDataSourceComponentProps>({ ...props, children: <DataSourceSettings {...props} /> })
  );
};