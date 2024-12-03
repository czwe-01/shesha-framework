import { IConfigurableFormComponent, IStyleType } from '@/providers/form/models';

export interface IEditableTagGroupComponentProps extends IConfigurableFormComponent, IStyleType {
    value?: string[];
    defaultValue?: string;
    onChange?: (values?: string[]) => void;
}