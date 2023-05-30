import {
  FormLabel,
  Checkbox,
  CheckboxGroup,
  Flex,
  Stack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
const ShiftCheckboxGroup = ({
  onChange,
  totalSalesApplicable,
  specialEvent,
}) => {
  // useEffect(() => {
  //   console.log(changeHandler);
  // }, [changeHandler]);
  const [isTotalSalesChecked, setIsTotalSalesChecked] =
    useState(totalSalesApplicable);

  // const handleTotalSalesChecked = () => {};
  return (
    // <CheckboxGroup colorScheme='green' defaultValue={[true, 'Special Event']}>
    <Stack direction='row' spacing='10'>
      <Checkbox
        onChange={() => onChange(!totalSalesApplicable, 'totalSalesApplicable')}
        // defaultChecked={true}
        isChecked={totalSalesApplicable}
        value='totalSalesApplicable'>
        Total Sales Applicable
      </Checkbox>
      <Checkbox
        // onChange={() => changeHandler(checked, value)}
        value='specialEvent'
        onChange={() => onChange(!specialEvent, 'specialEvent')}
        isChecked={specialEvent}>
        Special Event
      </Checkbox>
    </Stack>
    // </CheckboxGroup>
  );
};

export default ShiftCheckboxGroup;
