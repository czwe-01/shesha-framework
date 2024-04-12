import { IConfigurableFormComponent } from "@/providers";
import React from "react";
import { prepareInputMask } from "./utils";
import { SizeType } from "antd/lib/config-provider/SizeContext";
import { Variant } from "antd/lib/form/hooks/useVariants";
import { useStyles } from "./styles/style";
import { getStyle } from "@/providers/form/utils";
import { StyledMaskedInput } from "./styleInput";

export interface IMaskedTextProps extends IConfigurableFormComponent {
    value: string,
    disabled: boolean
    mask?: string
    readOnly: boolean
    className?: string,
    placeholder?: string,
    variant?: Variant,
    maxLength?: number,
    size?: SizeType,
    formData?: any
    };

const MaskedText: React.FC<IMaskedTextProps> = ({ value, mask, readOnly, style, formData, size }) => {

    const inputRef = React.useRef(null);
    const computedStyle = getStyle(style, formData);
    const styling = {
        ...computedStyle,
        height: size === 'small' ? '24px' : size === 'large'? '40px': '32px', width: '100%'
    }

    const {styles} = useStyles();

    const moveCursorToIndex = (index: number) => {
        if (inputRef.current) {
            const input = inputRef.current.inputElement;
            if (input) {
                input.setSelectionRange(index, index);
            }
        }
};


    const masker = prepareInputMask(value, mask).mask;
    const placeholder = prepareInputMask(value, mask).placeholder;

  return (
    readOnly ? 
      <StyledMaskedInput
        mask={masker}
        placeholder={placeholder}
        style={styling}
        className={ styles.input}
        disabled
      />
      :
     <StyledMaskedInput
        mask={masker}
        placeholder={placeholder}
        guide={true}
        style={styling}
        className={ styles.input}
        ref={inputRef}
        onFocus={()=> moveCursorToIndex(placeholder.indexOf('_'))}
      />
  );
}

export default MaskedText;
