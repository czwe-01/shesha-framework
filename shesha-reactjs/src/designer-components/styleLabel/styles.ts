import { createStyles } from '@/styles';


export const useStyles = createStyles(({ css, cx, token }) => {

  const flexWrapper = cx("", css`
        display: flex;
        width: 200px;
        flex-direction: row;
        gap: 8px;
        position: absolute;
        justify-content: flex-end;
        top: -32px;
        right: 1px;
        z-index: 2;
    `);

  const hidelLabelIcon = cx("", css`
    cursor: pointer;
    display: flex;
    gap: 4px;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
    color: ${token.colorPrimary};
    border: 1px solid ${token.colorPrimary};
    `);

  return {
    flexWrapper,
    hidelLabelIcon
  };
});