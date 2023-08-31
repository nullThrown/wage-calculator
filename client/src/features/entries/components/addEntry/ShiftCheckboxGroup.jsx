import { Checkbox, Stack, Tooltip } from '@chakra-ui/react';
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
        <Tooltip label='If the amount of goods sold is know, check the box'>
          Total Sales Applicable
        </Tooltip>
      </Checkbox>
      <Checkbox
        value='specialEvent'
        onChange={() => onChange(!specialEvent, 'specialEvent')}
        isChecked={specialEvent}>
        <Tooltip label='Anything different from a regular shift -- party, banquet, etc.'>
          Special Event
        </Tooltip>
      </Checkbox>
    </Stack>
  );
};

export default ShiftCheckboxGroup;
