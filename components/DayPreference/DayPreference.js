import { DayPreferenceContainer, DayContainer } from "./styles";

/**
 * Component which shows selected days 
 * 
 * @param {Array<string>} selectedDays days which are shown as a selected 
 * @returns 
 */
const DayPreference = (props) => {
  const { selectedDays = [] } = props;
  const days = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <DayPreferenceContainer>
      {days.map((day, index) => (
        <DayContainer key={index}>
          <label>{day}</label>
          <input
            role={day}
            type="checkbox"
            checked={selectedDays.indexOf(index) > -1}
            disabled
          />
        </DayContainer>
      ))}
    </DayPreferenceContainer>
  );
};

export default DayPreference;
