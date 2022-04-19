import {
  Divider,
  Flex,
  Grid,
  useDisclosure,
  NumberInput,
  Input,
} from '@chakra-ui/react';
import { useState } from 'react';
import TertHeading from '../typography/TertHeading';
import QuatHeading from '../typography/QuatHeading';
import NumInput from './NumInput';
import TimeInput from './TimeInput';
import ShiftRadioGroup from './Radio';
import Card from '../base/Card';
import SubmitEntry from '../button/SubmitEntry';
import CompanySelect from './CompanySelect';
import EditEntryBtn from '../button/EditEntry';
import EditEntryModal from '../modal/EditEntry';
import { useMutation } from 'react-query';
import axios from 'axios';

const AddEntryForm = ({ onToggle }) => {
  const [newEntry, setNewEntry] = useState({
    hoursWorked: 0,
    minutesWorked: 0,
    totalSales: 0,
    creditTips: 0,
    cashTips: 0,
    tipOut: 0,
    shiftTime: 'morning',
    company: '',
  });
  const onInputChange = (value, name) => {
    setNewEntry({ ...newEntry, [name]: value });
  };
  const companyInputChange = (e) => {
    setNewEntry({ ...newEntry, company: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    // send react query post request
    // if req == success
    // display success page
    // close form on setTimeout
    // update query cache
    // rerender analytics data components
    // if req == error
    // display 'something went wrong' error msg
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const mutation = useMutation((newEntry) => {
    return axios.post('http://localhost:4000/api/entries/create', newEntry);
  });
  return (
    <Card as='form' m='1em 0 0 0'>
      <TertHeading text="Add Earning's Reports" textAlign='center' />
      <Flex m='1em' justify='center'>
        <EditEntryBtn onClick={onOpen} />
        <EditEntryModal isOpen={isOpen} onClose={onClose} />
      </Flex>
      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Totals' />
        <Divider mt='.2em' />
        <Grid
          gap='20px'
          templateColumns='repeat(2, 1fr)'
          w='100%'
          m='.4em 0'
          alignItems='start'>
          {/* <TimeInput
            title='Regular Hours'
            name='hoursWorked'
            hourValue={newEntry.hoursWorked}
            hourOnChange={(value) => onInputChange(value, 'hoursWorked')}
            minuteValue={newEntry.minutesWorked}
            minuteOnChange={(value) => onInputChange(value, 'minutesWorked')}
          /> */}
          <NumInput
            title='Total Sales'
            name='totalSales'
            value={newEntry.totalSales}
            handleChange={(value) => onInputChange(value, 'totalSales')}
          />
        </Grid>
        <Divider />
      </Flex>

      <Flex direction='column' align='start' m='1em 0'>
        <QuatHeading text='Tips' />
        <Divider mt='.2em' />
        <Grid gap='10px' templateColumns='repeat(4,1fr)' m='.4em 0'>
          <NumInput
            title='Credit Tips'
            name='creditTips'
            value={newEntry.creditTips}
            handleChange={(value) => onInputChange(value, 'creditTips')}
          />
          <NumInput
            title='Cash Tips'
            name='cashTips'
            handleChange={(value) => onInputChange(value, 'cashTips')}
          />
          <NumInput
            title='Tip Out'
            name='tipOut'
            handleChange={(value) => onInputChange(value, 'tipOut')}
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
            onChange={(value) => onInputChange(value, 'shiftTime')}
            value={newEntry.shiftTime}
          />
          <CompanySelect
            onChange={companyInputChange}
            value={newEntry.company}
          />
        </Grid>
        <Divider />
      </Flex>
      <SubmitEntry onClick={onToggle} />
    </Card>
  );
};

export default AddEntryForm;
