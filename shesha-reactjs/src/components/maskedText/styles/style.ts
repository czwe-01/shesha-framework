import { createStyles } from "antd-style";

export const useStyles = createStyles(({ css, cx, prefixCls }) => {
    const readOnlyDisplayFormItem = cx("read-only-display-form-item", css`
        &.${prefixCls}-form-item {
            margin-bottom: unset;
        }
  `); 
  return {
    readOnlyDisplayFormItem
  };
});