import { useEffect, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Grid,
  useDisclosure,
  FormErrorMessage,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import TertHeading from 'components/typography/TertHeading';
import QuatHeading from 'components/typography/QuatHeading';
import NumInput from 'components/form/NumInput';
import ShiftRadioGroup from 'components/form/addEntry/ShiftRadioGroup';
import LargeCard from 'components/card/LargeCard';
import SubmitEntry from 'components/button/SubmitEntry';
import CompanySelect from 'components/form/addEntry/CompanySelect';
import EditEntryBtn from 'components/button/EditEntry';
import EditEntryModal from 'components/modal/EditEntry';
import ErrorText from 'components/typography/ErrorText';
import { formatDollar, parseDollar } from 'util/format';
import useCreateEntry from '../hooks/useCreateEntry';
import useAddEntryValidation from '../hooks/useAddEntryValidation';
import useGetCompanies from 'features/companySelect/hooks/useGetCompanies';

const AddEntryForm = ({ onToggle }) => {
  const [newEntry, setNewEntry] = useState({
    hoursWorked: 0,
    minutesWorked: 0,
    totalSales: 0,
    creditTips: 0,
    cashTips: 0,
    tipOut: 0,
    shiftTime: 'morning',
    companyId: '',
    specialEvent: false,
    totalSalesApplicable: true,
    shiftDate: new Date(),
  });
  const [isValidationError, setIsValidationError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isTimeWorkedZero } = useAddEntryValidation(newEntry);
  const { isLoading, isError, companyList } = useGetCompanies();

  const createEntry = useCreateEntry();

  const changeHandler = (value, name) =>
    setNewEntry({ ...newEntry, [name]: value });

  const companyChangeHandler = (e) =>
    setNewEntry({ ...newEntry, companyId: e.target.value });

  const submitHandler = (e) => {
    e.preventDefault();
    if (isTimeWorkedZero) {
      setIsValidationError(true);
    } else {
      createEntry.mutate(newEntry);
    }
  };

  // newEntry.companyId does not populate until company select handler is fired
  // this effect allows the companyId to populate to the first company in list(company initially selected)
  useEffect(() => {
    setNewEntry({ ...newEntry, companyId: companyList[0]._id });
  }, [companyList[0]._id]);

  return (
    <LargeCard as='form' m='1em 0 0 0'>
      <TertHeading text="Add Earning's Report" textAlign='center' />
      <Flex m='1em' justify='center'>
        <EditEntryBtn onClick={onOpen} />
        <EditEntryModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Flex direction='column' justify='center' m='1em 0'>
        <QuatHeading text='Date' />
        <Divider mt='.2em' />
        <Box m='.4em 0'>
          <DatePicker
            selected={newEntry.shiftDate}
            onChange={(date) => setNewEntry({ ...newEntry, shiftDate: date })}
            maxDate={new Date()}></DatePicker>
        </Box>
      </Flex>
      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Totals' />
        <Divider mt='.2em' />
        {isValidationError && isTimeWorkedZero && (
          <ErrorText>Must have at least 1 minute of time worked.</ErrorText>
        )}
        <Grid
          gap='10px'
          templateColumns='repeat(2, 25%) 50%'
          w='100%'
          m='.4em 0'
          alignItems='start'>
          <NumInput
            title='Hours Worked'
            name='hoursWorked'
            isInvalid={isValidationError && isTimeWorkedZero}
            value={newEntry.hoursWorked}
            precision={0}
            min={0}
            max={24}
            onChange={(value) => changeHandler(value, 'hoursWorked')}
          />
          <NumInput
            title='Minutes Worked'
            name='minutesWorked'
            isInvalid={isValidationError && isTimeWorkedZero}
            value={newEntry.minutesWorked}
            precision={0}
            min={0}
            max={59}
            step={5}
            onChange={(value) => changeHandler(value, 'minutesWorked')}
          />
          <NumInput
            title='Total Sales'
            name='totalSales'
            value={formatDollar(newEntry.totalSales)}
            precision={2}
            min={0}
            onChange={(value) =>
              changeHandler(parseDollar(value), 'totalSales')
            }
          />
        </Grid>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Tips' />
        <Divider mt='.2em' />
        <Grid gap='10px' templateColumns='repeat(3,1fr)' m='.4em 0'>
          <NumInput
            title='Credit Tips'
            name='creditTips'
            value={formatDollar(newEntry.creditTips)}
            precision={2}
            min={0}
            onChange={(value) =>
              changeHandler(parseDollar(value), 'creditTips')
            }
          />
          <NumInput
            title='Cash Tips'
            name='cashTips'
            value={formatDollar(newEntry.cashTips)}
            precision={2}
            min={0}
            onChange={(value) => changeHandler(parseDollar(value), 'cashTips')}
          />
          <NumInput
            title='Tip Out'
            name='tipOut'
            value={formatDollar(newEntry.tipOut)}
            precision={2}
            min={0}
            onChange={(value) => changeHandler(parseDollar(value), 'tipOut')}
          />
        </Grid>
        <Divider />
      </Flex>

      {/* <Flex direction='column' align='start' m='1em 0'> */}
      <QuatHeading text='Shift' />
      <Divider mt='.2em' />
      <Grid
        gap='20px'
        templateColumns='repeat(2,1fr)'
        alignItems='center'
        m='.4em 0'>
        <ShiftRadioGroup
          onChange={(value) => changeHandler(value, 'shiftTime')}
          value={newEntry.shiftTime}
        />
        <CompanySelect
          onChange={companyChangeHandler}
          companyId={newEntry.companyId}
          companyList={companyList}
        />
      </Grid>
      <Divider />
      {/* </Flex> */}

      <SubmitEntry onClick={submitHandler} />
    </LargeCard>
  );
};

export default AddEntryForm;

// useEffect(() => {
//   const { hoursWorked, minutesWorked } = newEntry;
//   const timeWorkedDec = +minutesWorked / 60 + +hoursWorked;
//   setNewEntry({ ...newEntry, timeWorkedDec: timeWorkedDec });
// }, [newEntry.hoursWorked, newEntry.minutesWorked]);
