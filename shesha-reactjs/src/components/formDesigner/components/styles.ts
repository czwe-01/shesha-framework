import { createStyles } from '@/styles';

export interface UseStylesProps {
  layout: 'vertical' | 'horizontal' | 'inline' | undefined;
  hasLabel: boolean;
  isDesignerMode: boolean;
}

export const useStyles = createStyles(({ css, cx }, { layout, hasLabel, isDesignerMode }: UseStylesProps) => {
  const formItem = cx(css`
        --ant-form-item-margin-bottom: 0px !important;

        ${isDesignerMode ? `
          /* Designer mode: Force 100% heights for proper layout control */
          .ant-form-item-row {
              height: 100%;
              width: 100%;
          }

          .ant-row .ant-form-item-control {
              width: 100% !important;
              height: ${layout === 'vertical' && hasLabel ? 'calc(100% - 32px)' : '100%'} !important;
              max-height: ${layout === 'vertical' && hasLabel ? 'calc(100% - 32px)' : '100%'};

              .ant-form-item-label >label {
              height: 100% !important;
              }
              .ant-form-item-control-input {
                  min-height: 0px !important;
                  height: 100%;
                  width: 100%;

                  .ant-form-item-control-input-content {
                      height: 100%;
                      width: 100%;
                      > div {
                        height: 100%;
                        width: 100%;
                      }
                  }
              }
          }
        ` : `
          /* Live mode: Let content determine natural height */
          .ant-form-item-row {
              width: 100%;
              display: flex;
          }

          .ant-row .ant-form-item-control {
              width: 100%;
              display: flex;
              align-items: center;

              .ant-form-item-control-input {
                  min-height: 0px !important;
                  width: 100%;
                  display: flex;
                  align-items: center;

                  .ant-form-item-control-input-content {
                      width: 100%;
                      display: flex;
                      align-items: center;
                      > div {
                        width: 100%;
                      }
                  }
              }
          }
        `}
  `);
  return {
    formItem,
  };
});
