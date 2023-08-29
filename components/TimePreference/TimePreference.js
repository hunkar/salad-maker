import {
  BsFillSunFill,
  BsFillSunriseFill,
  BsFillSunsetFill,
} from "react-icons/bs";
import { TimePreferenceContainer } from "./styles";

/**
 * Returns bigger value if it is selected
 *
 * @param {string} expected value to determine if it is selected
 * @param {string} value value
 * @returns
 */
const getSize = (expected, value) => (value === expected ? 35 : 15);

/**
 * Returns orange if it is selected
 *
 * @param {string} expected value to determine if it is selected
 * @param {string} value value
 * @returns
 */
const getColor = (expected, value) =>
  value === expected ? "orange" : "#00000060";

/**
 * Visualization of time preference
 * 
 * @param {string} timePreference small | medium | large
 * @returns
 */
const TimePreference = ({ timePreference }) => {
  return (
    <TimePreferenceContainer title={timePreference}>
      <BsFillSunriseFill
        data-testid="tp-morning"
        size={getSize("morning", timePreference)}
        style={{
          color: getColor("morning", timePreference),
        }}
      />
      <BsFillSunFill
        data-testid="tp-afternoon"
        size={getSize("afternoon", timePreference)}
        style={{
          color: getColor("afternoon", timePreference),
        }}
      />
      <BsFillSunsetFill
        data-testid="tp-evening"
        size={getSize("evening", timePreference)}
        style={{
          color: getColor("evening", timePreference),
        }}
      />
    </TimePreferenceContainer>
  );
};

export default TimePreference;
