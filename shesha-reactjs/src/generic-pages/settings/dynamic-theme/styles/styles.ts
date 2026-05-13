import { createStyles, sheshaStyles } from '@/styles';

export const useStyles = createStyles(({ css, cx }) => {
  const slider = cx(
    'slider',
    css`
      width: 100%;
      .ant-slider-handle {
        border-color: #d9d9d9;
      }
    `,
  );

  const appearanceForm = cx(
    'sha-appearance-form',
    css`
      [data-sha-c-type="propertyRouter"] {
        > .sha-components-container-inner {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 16px;
          padding: 16px 0;
          align-items: start;
        }
      }

      /* Adjust form items within the grid panels */
      .ant-collapse {
        .sha-components-container-inner {
          gap: 12px;
        }

        /* Better spacing for nested containers */
        .sha-container-component {
          .sha-components-container-inner {
            gap: 8px;
          }
        }
      }

      /* Responsive grid - single column on smaller screens */
      @media (max-width: 768px) {
        > [data-sha-c-type="propertyRouter"] {
          > .sha-components-container-inner {
            grid-template-columns: 1fr;
          }
        }
      }

      /* Two columns on medium screens */
      @media (min-width: 769px) and (max-width: 1200px) {
        > [data-sha-c-type="propertyRouter"] {
          > .sha-components-container-inner {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      }
    `,
  );

  const colorCircle = cx(
    'color-circle',
    css`
    border-radius: 50%;
    .ant-color-picker-color-block {
      border-radius: 50%;
      overflow: hidden;
      }
    `,
  );

  const colorCircleContainer = cx(
    'color-circle-container',
    css`
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    `,
  );
  const themeParameters = cx(
    'theme-parameters',
    css`

      &::-webkit-scrollbar {
        display: none;
      }

      .ant-card {
        .ant-card-head {
          min-height: 40px;
          padding: 0 16px;
          
          .ant-card-head-title {
            font-size: 14px;
            font-weight: 600;
          }
        }

        .ant-card-body {
          padding: 16px;
        }
      }

      .ant-form-item {
        margin-bottom: 16px;
        
        &:last-child {
          margin-bottom: 0;
        }

        .properties-label  {
          top: 0px !important;
        }
      }

      .ant-slider {
        margin: 8px;
        max-width: 300px;
      }
    `,
  );

  const themeHeader = cx(
    'theme-parameters',
    css`
      font-size: 18px;
      font-weight: 700;
    `,
  );

  const previewSection = cx(
    'preview-section',
    css`
      padding: 16px;
      background: #fafafa;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
    `,
  );

  const themeCardSettings = cx(
    'theme-card',
    css`
      margin-bottom: 16px;
      height: 400px;
      .ant-card-head {
        background: #fafafa;
      }
    `,
  );

  const themeCardMenu = cx(
    'theme-card-menu',
    css`
      margin-bottom: 16px;

      .ant-card-head {
        background: #fafafa;
        padding: 8px 12px;
        min-height: 36px;
      }

      .ant-card-body {
        padding: 0;
      }

      /* Compact menu styling */
      .ant-menu {
        border-inline-end: none;

        /* Group titles styling */
        .ant-menu-item-group-title {
          padding: 6px 12px;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: #8c8c8c;
          height: auto;
          line-height: 1.2;
        }

        /* Menu items styling */
        .ant-menu-item {
          height: 32px;
          line-height: 32px;
          padding: 0 12px 0 24px !important;
          margin: 0;
          font-size: 13px;

          .ant-menu-title-content {
            margin-inline-start: 8px;
          }

          .anticon {
            font-size: 14px;
            min-width: 14px;
          }
        }

        /* Submenu styling */
        .ant-menu-submenu {
          .ant-menu-submenu-title {
            height: 36px;
            line-height: 36px;
            padding: 0 12px !important;
            margin: 0;
            font-size: 12px;
            font-weight: 600;
            color: #595959;
          }

          .ant-menu-sub {
            background: #fafafa;
          }
        }

        /* Selected item */
        .ant-menu-item-selected {
          background-color: #e6f7ff;
          font-weight: 500;
        }

        /* Hover state */
        .ant-menu-item:hover {
          background-color: #f5f5f5;
        }
      }
    `,
  );

  const themeColorPicker = cx(
    'theme-color-picker',
    css`
      > .ant-color-picker-color-block {
       border-radius: 50% !important;
      }
    `,
  );

  const themeColorSpace = cx(
    'theme-color-space',
    css`
     align-items: center;
    `,
  );
  const space = cx(
    'theme-space',
    css`
    width: 100%;
      > .ant-space-item {
        width: 100%;
      }
    `,
  );

  const contentContainer = cx(
    'theme-content-container',
    css`
      height: calc(100vh - 205px);
    `,
  );
  const contentColumn = cx(
    'theme-content-container',
    css`
      height: 100%;
      overflow-y: auto;  
      ${sheshaStyles.thinScrollbars}
    `,
  );

  return {
    themeParameters,
    themeHeader,
    previewSection,
    themeCardMenu,
    themeCardSettings,
    themeColorPicker,
    themeColorSpace,
    space,
    contentContainer,
    contentColumn,
    colorCircle,
    colorCircleContainer,
    slider,
    appearanceForm,
  };
});
