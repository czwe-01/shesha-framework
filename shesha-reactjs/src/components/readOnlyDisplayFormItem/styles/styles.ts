import { createStyles, sheshaStyles, getTextHoverEffects } from '@/styles';
import { CSSProperties } from 'react';

interface UseStylesParams {
  textAlign?: CSSProperties['textAlign'];
}

export const useStyles = createStyles(({ css, cx, prefixCls, token }, params: UseStylesParams) => {
  const { textAlign } = params;

  const readOnlyModeToggler = "read-only-mode-toggler";
  const readOnlyDisplayFormItem = cx("read-only-display-form-item", css`

        &.${prefixCls}-form-item {
            margin-bottom: unset;
        }
  
        .${readOnlyModeToggler} {
              margin-left: ${sheshaStyles.paddingLG}px;
  
              &:not(.disabled) {
                cursor: pointer;
                ${getTextHoverEffects(token)}
            }
        }

        /* Ensure content doesn't overflow */
        > * {
            width: 100%;
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        /* Handle Space component for multiple items */
        .${prefixCls}-space {
            width: 100%;
            max-width: 100%;
            overflow: hidden;
        }

        /* Handle tags and other components */
        .${prefixCls}-tag {
            max-width: 100%;
            overflow: hidden;
            text-overflow: ellipsis;
        }
  `);

  const inputField = css`
    padding: 0px 8px;
    margin: 0;
    margin-right: 8px;
    align-items: center;
    overflow: hidden;
    
  `;

  const wrapper = css`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 4px;
    box-sizing: border-box;
    justify-content: ${textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start'};
    text-overflow: ellipsis;
    overflow: auto;
    scrollbar-width: none;
    -ms-overflow-style: none;

    ::-webkit-scrollbar { 
      width: 0;
      height: 0;
    }
  `;

  return {
    readOnlyDisplayFormItem,
    readOnlyModeToggler,
    inputField,
    wrapper,
  };
});
