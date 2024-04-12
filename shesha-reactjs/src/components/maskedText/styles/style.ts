import { createStyles } from "antd-style";

export const mytoken = {
  colorPrimary: ""
};

export const useStyles = createStyles(({ css, cx, prefixCls, token }) => {

  mytoken.colorPrimary = token.colorPrimary;
  
    const readOnlyDisplayFormItem = cx("read-only-display-form-item", css`
        &.${prefixCls}-form-item {
            margin-bottom: unset;
        }
  `);
        
  const input = cx("input", css`
    &:focus {
            border: 2px solid ${token.colorPrimary};
          }
    &hover {
            border: 2px solid ${token.colorPrimary};
    }`);
  return {
    readOnlyDisplayFormItem, input
  };
});