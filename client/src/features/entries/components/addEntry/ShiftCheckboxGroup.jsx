import { Checkbox, Stack } from '@chakra-ui/react';
// this doesn't need a separate file
// place JSX in 'AddEntryForm.jsx' directly
const ShiftCheckboxGroup = ({
  onChange,
  totalSalesApplicable,
  specialEvent,
}) => {
  return (
    <Stack direction='row' spacing='10'>
      <Checkbox
        onChange={() => onChange(!totalSalesApplicable, 'totalSalesApplicable')}
        isChecked={totalSalesApplicable}
        value='totalSalesApplicable'>
        Total Sales Applicable
      </Checkbox>
      <Checkbox
        value='specialEvent'
        onChange={() => onChange(!specialEvent, 'specialEvent')}
        isChecked={specialEvent}>
        Special Event
      </Checkbox>
    </Stack>
  );
};

export default ShiftCheckboxGroup;
