import isDeepEqual from 'fast-deep-equal/react';
import QueryBuilderField from '@/designer-components/queryBuilder/queryBuilderField';
import React, { FC, useRef, useState } from 'react';
import StoryApp from '@/components/storyBookApp';
import { addStory } from 'src/stories/utils';
import { Button } from 'antd';
import { DataTypes } from '@/interfaces/dataTypes';
import { IEntityReferencePropertyMetadata, IModelMetadata, IObjectMetadata } from '@/interfaces/metadata';
import { IPropertyMetadataWithQBSettings } from '@/providers/queryBuilder/models';
import { JsonLogicResult } from '@/components';
import { MetadataProvider, QueryBuilderProvider, useMetadata } from '@/providers';
import { QueryBuilder } from '.';
import { Story } from '@storybook/react';

export default {
  title: 'Components/QueryBuilder',
  component: QueryBuilder
};

interface IQueryBuilderStoryArgs {

}

const StaticMetadata: IObjectMetadata = {
  dataType: DataTypes.object,
  properties: [
    {
      label: 'Test field',
      dataType: DataTypes.string,
      path: 'testField',
      isVisible: true,
      toQueryBuilderField: (defaultConverter) => {
        const field = defaultConverter();
        return {
          ...field,
          mainWidget: 'customSelect',
          operators: ['equal'],
          valueSources: ['value'],
          defaultOperator: 'equal',
          widgets: {
            customSelect: {
              operators: ['equal'],
            },
          }
        };
      },
    } as IPropertyMetadataWithQBSettings,
    {
      label: 'Recommend Submission: Last Decision',
      dataType: DataTypes.string,
      path: 'lastDecision_recommentUid',
      isVisible: true,
    },
    {
      label: 'Review Submission: Last Decision',
      dataType: DataTypes.string,
      path: 'lastDecision_reviewUid',
      isVisible: true,
    },
    {
      label: 'Workflow',
      dataType: DataTypes.entityReference,
      path: 'workflow',
      isVisible: true,
      entityType: 'Shesha.Enterprise.Workflow.WorkflowInstance'
    } as IEntityReferencePropertyMetadata,
    {
      label: 'Person',
      dataType: DataTypes.entityReference,
      path: 'person',
      isVisible: true,
      entityType: 'Shesha.Core.Person',
    } as IEntityReferencePropertyMetadata,
  ]
};

const SimpleQueryBuilder = ({ value, onChange, metadata }) => {
  const lastResult = useRef<JsonLogicResult>();

  const handleChange = (jsonLogicResult: JsonLogicResult) => {

    lastResult.current = jsonLogicResult;
    if (jsonLogicResult) {
      if (jsonLogicResult && jsonLogicResult.errors && jsonLogicResult.errors.length > 0) {
        console.log(jsonLogicResult);
        // show errors
        return;
      }

      if (onChange && !isDeepEqual(value, jsonLogicResult?.logic)) {
        onChange(jsonLogicResult?.logic);
      }
    }
  };

  const onSetTestValueClick = () => {
    onChange({
      "and": [
        {
          "==": [
            {
              "var": "testField"
            },
            "99"
          ]
        }
      ]
    });
  };

  return (
    <>
      <Button onClick={onSetTestValueClick}>Set Test Value</Button>
      <QueryBuilderProvider metadata={metadata} /*customWidgets={customWidgets}*/>
        <QueryBuilder
          value={value}
          onChange={handleChange}
        />
      </QueryBuilderProvider>
    </>
  );
};


export interface ISimpleQueryBuilderProps {
  value?: object;
  onChange: (newValue?: object) => void;
  metadata: IModelMetadata;
}

const TestQB = () => {

  const [value, setValue] = useState<object>(undefined);

  const onChange = (newValue: object) => {
    setValue(newValue);
  };

  return (
    <SimpleQueryBuilder
      value={value}
      onChange={onChange}
      metadata={StaticMetadata}
    />
  );
};

const BaseTemplate: Story<IQueryBuilderStoryArgs> = () => {
  return (
    <StoryApp>
      <TestQB />
    </StoryApp>
  );
};

export const CustomFields = addStory(BaseTemplate, {

});


//const { Option } = Select;
// const onExpandClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
//   event?.preventDefault();
//   event.stopPropagation();

//   console.log('LOG: expand clicked');
// };
{/* <Select dropdownMatchSelectWidth style={{ width: '200px' }}>
        <Option value="1" label="item 1">Item 1</Option>
        <Option value="2" label="item 2">Item 2 <Button onClick={onExpandClick} shape="circle" size='small' title='Click to expand'><NodeExpandOutlined /></Button></Option>
      </Select> */}

interface ITestQBModalProps {
  metadata: IModelMetadata;
}
const TestQBModal: FC<ITestQBModalProps> = ({ metadata }) => {
  const [value, setValue] = useState<object>(undefined);

  const onChange = (newValue: object) => {
    setValue(newValue);
  };

  return (
    <QueryBuilderProvider metadata={metadata}>
      <QueryBuilderField value={value} onChange={onChange} />
    </QueryBuilderProvider>
  );
};

const ModalTemplate: Story<IQueryBuilderStoryArgs> = () => {
  return (
    <StoryApp>
      <TestQBModal metadata={StaticMetadata} />
    </StoryApp>
  );
};

export const InsideModal = addStory(ModalTemplate, {

});

const TestQBModalWrapper = () => {
  const meta = useMetadata(true);

  return meta.metadata
    ? <TestQBModal metadata={meta.metadata} />
    : null;
};

const ModalTemplateWithMetaProvider: Story<IQueryBuilderStoryArgs> = () => {
  return (
    <StoryApp>
      <MetadataProvider dataType='entity' modelType='Shesha.Core.Person'>
        <TestQBModalWrapper />
      </MetadataProvider>
    </StoryApp>
  );
};

export const InsideModalWithMetaProvider = addStory(ModalTemplateWithMetaProvider, {

});