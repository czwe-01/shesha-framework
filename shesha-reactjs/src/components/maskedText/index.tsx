import MaskedInput from 'antd-mask-input';
import {
    IConfigurableFormComponent,
    useForm
} from '@/providers';
import React, { useState } from 'react';
import { getStyle } from '@/providers/form/utils';
import { initialInputMask, prepareInputMask } from './utils';
import { useStyles } from './styles/style';


export interface IMaskedTextProps extends IConfigurableFormComponent {
    value: string,
    disabled: boolean
    mask?: string
    readOnly: boolean
}

const MaskedText: React.FC<IMaskedTextProps> = ({ value, style, disabled, mask, readOnly }) => {

    const [displayVal, setDispVal] = useState<string>(mask? mask: initialInputMask(value)); 
    const useFormLocal = useForm(false);
    const formData = useFormLocal?.formData;
    const computedStyle = getStyle(style, formData) ?? {}
    const { styles } = useStyles();

    const onchange = (e: any) => {
        setDispVal(e.target.value);
    }

    return (
        readOnly? 
            <span className={styles.readOnlyDisplayFormItem}>{displayVal}</span> : 
            <MaskedInput
                className="masked-input"
                mask={mask? mask : prepareInputMask(value)}
                style={{ width: '100%', ...computedStyle }}
                disabled={disabled}
                onChange={onchange}
                />
        
    );
};

export default MaskedText;
