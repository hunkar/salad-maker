import { TextContainer } from "./styles";

// Types of text styles
export const InfoTextTypes = {
  INFO: "info",
  WARNING: "warning",
  ERROR: "error",
};

// Color of types
export const TypeColors = {
  [InfoTextTypes.INFO]: "#03a9f4",
  [InfoTextTypes.WARNING]: "#ff9800",
  [InfoTextTypes.ERROR]: "#ef5350",
};

/**
 * 
 * @param {View} children children component of InfoText
 * @param {string} type type of text 
 * @returns 
 */
export const InfoText = ({ children, type = InfoTextTypes.INFO }) => {
  return (
    <TextContainer data-testid="info-text-container" color={TypeColors[type]}>
      {children}
    </TextContainer>
  );
};

export default InfoText;
