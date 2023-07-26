import { useEffect, useState } from 'react';
import {
  Divider,
  Flex,
  Grid,
  useDisclosure,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import TertHeading from 'components/typography/TertHeading';
import QuatHeading from 'components/typography/QuatHeading';
import NumInput from 'components/form/NumInput';
import ShiftRadioGroup from 'features/entries/components/addEntry/ShiftRadioGroup';
import LargeCard from 'components/card/LargeCard';
import CompanySelect from 'features/entries/components/addEntry/CompanySelect';
import EditEntryModal from 'features/entries/components/editEntry/EditEntryModal';
import { formatDollar, parseDollar } from 'util/format';
import useCreateEntry from '../../hooks/useCreateEntry';
import useAddEntryValidation from '../../hooks/useAddEntryValidation';
import ShiftCheckboxGroup from 'features/entries/components/addEntry/ShiftCheckboxGroup';
import SubmitEntryBtn from 'components/button/SubmitEntryBtn';
import EditEntryBtn from 'components/button/EditEntryBtn';
import { errorToast, successToast } from 'components/toast/toast';
import { connection_error, server_error } from 'constants/api/error';
const initialEntryValue = {
  hoursWorked: 0,
  minutesWorked: 0,
  totalSales: 0,
  creditTips: 0,
  cashTips: 0,
  tipOut: 0,
  shiftTime: 'morning',
  companyId: null,
  specialEvent: false,
  totalSalesApplicable: null,
  shiftDate: new Date(),
};
const AddEntryForm = ({ onToggle }) => {
  const [newEntry, setNewEntry] = useState(initialEntryValue);
  const [isValidationError, setIsValidationError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isTimeWorkedZero } = useAddEntryValidation(newEntry);
  const toast = useToast();
  const createEntry = useCreateEntry();

  const handleNumberChange = (value, name) =>
    setNewEntry({ ...newEntry, [name]: value });

  const handleCompanyChange = (e) =>
    setNewEntry({ ...newEntry, companyId: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTimeWorkedZero) {
      setIsValidationError(true);
    } else {
      setIsValidationError(false);
      createEntry.mutate(newEntry, {
        onSuccess: (data, variables, context) => {
          setNewEntry(initialEntryValue);
          toast({ ...successToast, title: 'New entry added' });
        },
        onError: (error, variables, context) => {
          const { message } = error;
          if (message === server_error || message === connection_error) {
            toast({ ...errorToast });
          }
        },
      });
    }
  };

  return (
    <LargeCard as='form' m='1em 0 0 0'>
      <TertHeading textAlign='center'>Add Earning's Report</TertHeading>
      <Flex m='1em' justify='center'>
        <EditEntryBtn onOpen={onOpen} />
        <EditEntryModal isOpen={isOpen} onClose={onClose} />
      </Flex>

      <Flex direction='column' justify='center' m='1em 0'>
        <Divider mt='.2em' />
        <Grid m='.4em 0' templateColumns='33% 67%'>
          <Flex flexDirection='column'>
            <FormLabel opacity='.85'>Shift Date</FormLabel>
            <DatePicker
              selected={newEntry.shiftDate}
              onChange={(date) => setNewEntry({ ...newEntry, shiftDate: date })}
              maxDate={new Date()}></DatePicker>
          </Flex>
          <ShiftCheckboxGroup
            totalSalesApplicable={newEntry.totalSalesApplicable}
            specialEvent={newEntry.specialEvent}
            onChange={handleNumberChange}
          />
        </Grid>
      </Flex>
      <Flex direction='column' align='start' m='1em 0'>
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
            onChange={handleNumberChange}
            isInvalid={isValidationError && isTimeWorkedZero}
            errorMsg='Must have at least 1 minute of time worked'
            precision={0}
            min={0}
            max={23}
          />
          <NumInput
            title='Minutes Worked'
            name='minutesWorked'
            value={newEntry.minutesWorked}
            onChange={handleNumberChange}
            isInvalid={isValidationError && isTimeWorkedZero}
            precision={0}
            min={0}
            max={59}
          />

          <NumInput
            title='Total Sales'
            name='totalSales'
            value={formatDollar(newEntry.totalSales)}
            onChange={(value) =>
              handleNumberChange(parseDollar(value), 'totalSales')
            }
            precision={2}
            min={0}
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
            onChange={(value) =>
              handleNumberChange(parseDollar(value), 'creditTips')
            }
            precision={2}
            min={0}
          />
          <NumInput
            title='Cash Tips'
            name='cashTips'
            value={formatDollar(newEntry.cashTips)}
            onChange={(value) =>
              handleNumberChange(parseDollar(value), 'cashTips')
            }
            precision={2}
            min={0}
          />
          <NumInput
            title='Tip Out'
            name='tipOut'
            value={formatDollar(newEntry.tipOut)}
            onChange={(value) =>
              handleNumberChange(parseDollar(value), 'tipOut')
            }
            precision={2}
            min={0}
          />
        </Grid>
        <Divider />
      </Flex>

      <QuatHeading text='Shift' />
      <Divider mt='.2em' />
      <Grid
        gap='20px'
        templateColumns='repeat(2,1fr)'
        alignItems='start'
        m='.4em 0'>
        <ShiftRadioGroup
          value={newEntry.shiftTime}
          onChange={(value) => handleNumberChange(value, 'shiftTime')}
        />
        <CompanySelect
          onChange={handleCompanyChange}
          companyId={newEntry.companyId}
        />
      </Grid>
      <Divider />

      <SubmitEntryBtn
        handleSubmit={handleSubmit}
        isLoading={createEntry.isLoading}
      />
    </LargeCard>
  );
};

export default AddEntryForm;
