import MaskedInput from 'antd-mask-input';
import {
    IConfigurableFormComponent,
    useForm
} from '@/providers';
import React from 'react';
import { getStyle } from '@/providers/form/utils';
import { prepareInputMask } from './utils';

export interface IMaskedTextProps extends IConfigurableFormComponent {
    value: string,
    disabled: boolean
    mask?: string
    model: any
}

const MaskedText: React.FC<IMaskedTextProps> = ({ value, style, disabled, mask }) => {

    const useFormLocal = useForm(false);
    const formData = useFormLocal?.formData;
    const computedStyle = getStyle(style, formData) ?? {}

    return (
            <MaskedInput
                className="masked-input"
                mask={mask? mask : prepareInputMask(value)}
                style={{ width: '100%', ...computedStyle }}
                disabled={disabled}
                />
        
    );
};

export default MaskedText;
