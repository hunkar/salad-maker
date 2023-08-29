const { css } = require("styled-components");

/**
 * Form item styles
 */
export const FormItemStyle = css`
  border: 1px #c4c4c4 solid;
  border-radius: 5px;
`;

/**
 * Title styles
 */
export const FormTitleStyle = css`
  color: #151515;
  font-size: 25px;
`;

/**
 * Normal text styles
 */
export const FormTextStyle = css`
  font-size: 18px;
  color: #151515;
`;

/**
 * Info text styles
 */
export const FormInfoTextStyle = css`
  font-size: 13px;
`;

/**
 * Label styles
 */
export const LabelStyle = css`
  ${FormItemStyle}
  background-color: #ffa62e;
  border-color: #c58227;
  color: white;
  font-size: 13px;
  font-weight: bold;
  min-width: 90px;
  padding: 5px 15px;
  text-align: center;

  @media (max-width: 700px) {
    min-width: 50px;
  }
`;
