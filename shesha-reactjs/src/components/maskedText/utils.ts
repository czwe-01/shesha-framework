export const prepareInputMask = (value: string) => {
  const mask = value.split('');

    for (let i = 0; i < mask.length; i++) {
      const char = mask[i];
       if (char.match(/[aeiou]/i)) {
        mask[i] = 'a';
      }
    }

    return mask.join('');
};

export const initialInputMask = (value: string) => {
  const mask = value.split('');

    for (let i = 0; i < mask.length; i++) {
      const char = mask[i];
       if (char.match(/[aeiou]/i)) {
        mask[i] = '_';
      }
    }

    return mask.join('');
};