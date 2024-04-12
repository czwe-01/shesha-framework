import { isNumeric } from "@/utils/string"

  const getPlaceholder = (value) => {
    return value.map((char: any) => {
        return typeof char === 'object' ? '_' : char
    }).join('')
  }

  export const prepareInputMask = (value: string, mask: any) => {
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

    if (!mask && isNumeric(value)) {
      
        const arr = value.split("").map((char) => {
        if (char === '0') {
            return /\d/;
        }
        return char;
        });

        const placeholder = getPlaceholder(arr)
        return {mask: arr, placeholder}
    }

        if (!mask && typeof value === 'string') {
        const arr = value.split("").map((char) => {
        if (char.match(/[aeiou]/i)) {
            return /[a-zA-Z]/;
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
        return /[a-zA-Z]/;
        }
        return char;
    });

    const placeholder = getPlaceholder(arr)
    return {mask: arr, placeholder}
  }