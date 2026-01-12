import { IEventHandlers } from '@/components/formDesigner/components/utils';
import { ComponentDefinition } from '@/interfaces';
import { IConfigurableFormComponent, IStyleType } from '@/providers/form/models';

export type ICheckboxComponentProps = IConfigurableFormComponent & {
  box?: IStyleType;
};

interface ICheckboxComponentCalulatedValues {
  eventHandlers?: IEventHandlers<any>;
}

export type CheckboxComponentDefinition = ComponentDefinition<"checkbox", ICheckboxComponentProps, ICheckboxComponentCalulatedValues>;
