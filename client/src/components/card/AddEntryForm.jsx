import { Box, Divider, Flex, Grid, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import TertHeading from '../typography/TertHeading';
import QuatHeading from '../typography/QuatHeading';
import NumInput from '../form/NumInput';
import ShiftRadioGroup from '../form/addEntry/ShiftRadioGroup';
import Card from '../base/Card';
import SubmitEntry from '../button/SubmitEntry';
import CompanySelect from '../form/addEntry/CompanySelect';
import EditEntryBtn from '../button/EditEntry';
import EditEntryModal from '../modal/EditEntry';
import { formatDollar, parseDollar } from '../../util/format';
import { useMutation } from 'react-query';
import axios from 'axios';
import ErrorText from '../typography/ErrorText';
import DatePicker from 'react-datepicker';

const AddEntryForm = ({ onToggle }) => {
  const [newEntry, setNewEntry] = useState({
    hoursWorked: 0,
    minutesWorked: 0,
    timeWorkedDec: 0,
    totalSales: 0,
    creditTips: 0,
    cashTips: 0,
    tipOut: 0,
    shiftTime: 'morning',
    company: '',
    shiftDate: new Date(),
    username: 'dionysus',
  });
  // input change handler that takes the component value as its first arg to onChange callback
  // Number Input components in Chakra use this convention and this is a workaround that passes in the name attribute value explicitly
  const changeHandler = (value, name) => {
    setNewEntry({ ...newEntry, [name]: value });
  };
  // change handler for company select that takes the event obj as its first arg to its onChange callback
  const companyChangeHandler = (e) => {
    setNewEntry({ ...newEntry, company: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    mutation.mutate(newEntry);
  };

  // this type of logic can be handle by mongoose virtuals -- much simpler!!
  // useEffect(() => {
  //   const { totalSales, creditTips, cashTips, tipOut } = newEntry;
  //   if (totalSales > 0) {
  //     const tipPct = ((+creditTips + +cashTips) / +totalSales) * 100;
  //     const actualTipPct =
  //       ((+creditTips + +cashTips - +tipOut) / +totalSales) * 100;
  //     setNewEntry({ ...newEntry, tipPct: tipPct, actualTipPct: actualTipPct });
  //   }
  // }, [
  //   newEntry.totalSales,
  //   newEntry.creditTips,
  //   newEntry.cashTips,
  //   newEntry.tipOut,
  // ]);
  // converts hours and minutes into a decimal number
  useEffect(() => {
    const { hoursWorked, minutesWorked } = newEntry;
    const timeWorkedDec = +minutesWorked / 60 + +hoursWorked;
    setNewEntry({ ...newEntry, timeWorkedDec: timeWorkedDec });
  }, [newEntry.hoursWorked, newEntry.minutesWorked]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useMutation((newEntry) => {
    return axios.post('http://localhost:4000/api/entries/create', newEntry);
  });
  return (
    <Card as='form' m='1em 0 0 0'>
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
            // date of first entry
            // minDate={new Date('3-29-2022')}
            maxDate={new Date()}></DatePicker>
        </Box>
      </Flex>
      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Totals' />
        <Divider mt='.2em' />
        <Grid
          gap='10px'
          templateColumns='repeat(2, 25%) 50%'
          w='100%'
          m='.4em 0'
          alignItems='start'>
          <NumInput
            title='Hours Worked'
            name='hoursWorked'
            value={newEntry.hoursWorked}
            precision={0}
            min={0}
            max={24}
            onChange={(value) => changeHandler(value, 'hoursWorked')}
          />
          <NumInput
            title='Minutes Worked'
            name='minutesWorked'
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

      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Shift' />
        <Divider mt='.2em' />
        <Grid
          gap='40px'
          templateColumns='repeat(2,1fr)'
          alignItems='center'
          m='.4em 0'>
          <ShiftRadioGroup
            onChange={(value) => changeHandler(value, 'shiftTime')}
            value={newEntry.shiftTime}
          />
          <CompanySelect
            onChange={companyChangeHandler}
            value={newEntry.company}
          />
        </Grid>
        <Divider />
      </Flex>
      {mutation.isLoading && <p>entry is being added...</p>}
      {mutation.isError && (
        <ErrorText text={mutation.error.message} textAlign='center' />
      )}

      {mutation.isSuccess && <p>success!!</p>}
      <SubmitEntry onClick={submitHandler} />
    </Card>
  );
};

export default AddEntryForm;
