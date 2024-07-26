import { createStyles } from '@/styles';

export const useStyles = createStyles(({ css, cx }) => {
    const container = cx(css`
        // min-width: 150px;
        // padding-bottom: 8px;

        // * {
        // font-size: 12px;
        // }

        // .ant-radio-button-wrapper {
        // padding: 4px 4px !important;
        // height: max-content;
        // line-height: 0;

        // .ant-form-item-control-input {
        // width: 100%;
        // }
        // svg {
        //         font-size: 18px;
        //     }
        // }

        // .ant-collapse-header {
        //     padding: 0 4px !important;
        //     font-size: 14px;
        //     font-weight: 500;
        // }
        
        // .ant-collapse-content-box {
        //     padding-top: 4px !important;
        // }


        // .ant-color-picker-trigger {
        // width: 24px;
        // height: 24px;
        // }

        // .ant-input-number{
        //     width: 50px;
        //     height: 24px;
        // }
    `);

    const tag = cx(css`
        // margin: 0;
        // padding: 0;
        // width: 60px
        `);

    const flex = cx(css`
        // display: flex;
        // flex-direction: row;
        // flexWrap: wrap; 
        `);

    const input = cx(css`
        // .ant-input {
        // height: 24px;
        // font-size: 12px;
        }

        .ant-select-selection-item {
            padding: 0 4px !important;
            width: 100px !important;
        .ant-select-dropdown {
            // padding: 0 4px !important;
            // background:red;
        }

        .ant-select-item {
            // width: 60px !important;
            // scrollbar-width: none;
            // -ms-overflow-style: none;
            }
            
        .ant-input-group {
            // width: auto !important; 
        }

        .ant-upload-list-item {
            width: 32px !important;
            height: 32px !important;
        }
    `);

    const select = cx(css`
        width: 60px;
        overflow-y: auto;
        scrollbar-width: none !important;
 
        &::-webkit-scrollbar {
            display: none !important;
      }
            // width: 32px !important;
            // height: 32px !important;
        }
    `);

    const radioBtn = cx(css`
        // height: 100%;
    `);

    const select = cx(css`
        // .ant-select {
        //     width: 60px;
        `);

    return {
        container,
        input,
        select,
        radioBtn,
        tag,
        flex,
        select
    };
});