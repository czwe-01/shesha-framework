import { createStyles } from '@/styles';

export const useStyles = createStyles(({ css, cx }) => {
  const inlineInputs = cx(css`
        align-items: end !important;
        display: flex;
        flex-wrap: wrap;
        gap: 0px 8px;
    `);

  const rowInputs = cx(css`
        display: flex;
        flex-wrap: wrap;
        gap: 0px 8px;
        `);

  const labelValueRow = cx(css`
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 4px 8px;
        width: 100%;
        min-width: 0;
    `);

  /** Label / Value text fields: share the free space, but never shrink past usable. */
  const labelValueField = cx(css`
        flex: 1 1 70px;
        min-width: 60px;
    `);

  /** Colour picker, colour presets and icon picker stay together and stay compact. */
  const labelValueExtras = cx(css`
        display: flex;
        align-items: center;
        flex: 0 0 auto;
    `);

  const icon = cx(css`
        --icon-fill-color: #1C1B1F;
    `);

  const radioBtns = cx(css`
      .ant-radio-button-wrapper-checked {
        z-index: 0 !important;
      }

      /* These buttons hold an icon and no text, so antd's text line-height left the glyph sitting low
         and touching the button's lower edge. Centre it on the button box instead. */
      .ant-radio-button-wrapper {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        line-height: 1;

        > span:not(.ant-radio-button) {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        .anticon {
          display: block;
          line-height: 1;
        }
      }
      `);
  return {
    inlineInputs,
    rowInputs,
    labelValueRow,
    labelValueField,
    labelValueExtras,
    icon,
    radioBtns,
  };
});
