import { IConfigurableFormComponent } from "@/providers";
import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import MaskedInput from "react-text-mask";
import styled from "styled-components";
import { prepareInputMask } from "./utils";

export interface IMaskedTextProps extends IConfigurableFormComponent {
    value: string,
    disabled: boolean
    mask?: string
    readOnly: boolean
}

const MaskedText: React.FC<IMaskedTextProps> = ({ value, style, disabled, mask, readOnly }) => {

  const [val, setVal] = useState(value);
  const myRef = useRef(null);

  const handleChange = e => setVal(e.target.value);

  useEffect(() => {
    console.log({ myRef }); // myRef.current;
  }, [myRef]);


  const getPlaceholder = (value) => {
    value.map((char: any) => {
        return typeof char === 'object' ? '_' : char
    })
  }

  const masker = (value: string, mask: any) => {
    if(Array.isArray(mask) && mask.length !== 0){
        console.log("Array mask provided", mask)
        const arr = mask.map((val) => {
            if(typeof val === 'string' && val.length > 1){
                return val.split('')
            }
            return val
        }).flat();

        const placeholder = getPlaceholder(arr);
        return {mask: arr, placeholder}
    }

    if (!mask) {
        const arr = value.split("").map((char) => {
        if (char.match(/[aeiou]/i)) {
            return /[aeiou]/;
        }
        return char;
        });

        const placeholder = getPlaceholder(arr)
        return {mask: arr, placeholder}
    }

    const arr = mask.split("").map((char) => {
        if (char === '#') {
        return /\d/;
        }

        if(char === '_') {
        return /[aeiou]/;
        }


        return char;
    });

    const placeholder = getPlaceholder(arr)
    return {mask: arr, placeholder}
  }

  console.log({ mask, value, masker: masker(value, mask) });
  return (
      <MaskedInput
        mask={masker(value, mask).mask}
        placeholder={masker(value, mask).placeholder}
        guide={true}
        onChange={handleChange}
        style={style}
      />
  );
}

export default MaskedText;
