import { useEffect, useState, useReducer } from 'react';
import {
  Divider,
  Flex,
  Grid,
  useDisclosure,
  FormLabel,
  useToast,
} from '@chakra-ui/react';
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
import useGetCompanies from 'features/company/hooks/useGetCompanies';
import CustomDatePicker from 'components/inputs/DatePicker/CustomDatePicker';
import useGetAllEntries from 'features/entries/hooks/useGetAllEntries';

import {
  initialState,
  entryFormReducer,
} from 'features/entries/helpers/entryFormReducer';

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
  totalSalesApplicable: false,
  shiftDate: new Date(),
};
const AddEntryForm = ({ filter }) => {
  const [newEntry, setNewEntry] = useState(initialEntryValue);
  const [isValidationError, setIsValidationError] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isTimeWorkedZero } = useAddEntryValidation(newEntry);
  const toast = useToast();
  const getCompanies = useGetCompanies();
  const createEntry = useCreateEntry();
  const [state, dispatch] = useReducer(entryFormReducer, initialState);
  const { isLoading, isError, entries } = useGetAllEntries(filter);

  // the first argument of the Chakra UI's onChange callback varies based on input type
  const handleChange = (firstArg, name) => {
    if (typeof firstArg === 'object') {
      setNewEntry({
        ...newEntry,
        [firstArg.target.name]: firstArg.target.value,
      });
    } else {
      setNewEntry({ ...newEntry, [name]: firstArg });
    }
  };

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
  useEffect(() => {
    const { companyList } = getCompanies;
    if (companyList) {
      setNewEntry({
        ...newEntry,
        companyId: companyList[0]._id,
      });
    }
  }, [getCompanies.companyList]);
  useEffect(() => {
    const { companyId } = newEntry;
    if (companyId) {
      const selectedCompany = getCompanies.companyList.find(
        (company) => company._id === companyId
      );
      setNewEntry({
        ...newEntry,
        totalSalesApplicable: selectedCompany.totalSalesApplicable,
      });
    }
  }, [newEntry.companyId, getCompanies.companyList]);
  return (
    <LargeCard as='form'>
      <TertHeading textAlign='center'>Add Earning's Report</TertHeading>
      <Flex m='1em' justify='center'>
        <EditEntryBtn onOpen={onOpen} />
        <EditEntryModal
          isOpen={isOpen}
          onClose={onClose}
          filter={filter}
          state={state}
          dispatch={dispatch}
        />
      </Flex>

      <Flex direction='column' justify='center' m='1em 0'>
        <Divider mt='.2em' />
        <Grid m='.4em 0' templateColumns='33% 67%'>
          <Flex flexDirection='column'>
            <FormLabel opacity='.85'>Shift Date</FormLabel>
            <CustomDatePicker
              date={newEntry.shiftDate}
              onChange={(date) => setNewEntry({ ...newEntry, shiftDate: date })}
            />
          </Flex>
          <ShiftCheckboxGroup
            totalSalesApplicable={newEntry.totalSalesApplicable}
            specialEvent={newEntry.specialEvent}
            onChange={handleChange}
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
            onChange={handleChange}
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
            onChange={handleChange}
            isInvalid={isValidationError && isTimeWorkedZero}
            precision={0}
            min={0}
            max={59}
          />
          <NumInput
            title='Total Sales'
            name='totalSales'
            isDisabled={!newEntry.totalSalesApplicable}
            value={formatDollar(newEntry.totalSales)}
            onChange={(value) => handleChange(parseDollar(value), 'totalSales')}
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
            onChange={(value) => handleChange(parseDollar(value), 'creditTips')}
            precision={2}
            min={0}
          />
          <NumInput
            title='Cash Tips'
            name='cashTips'
            value={formatDollar(newEntry.cashTips)}
            onChange={(value) => handleChange(parseDollar(value), 'cashTips')}
            precision={2}
            min={0}
          />
          <NumInput
            title='Tip Out'
            name='tipOut'
            value={formatDollar(newEntry.tipOut)}
            onChange={(value) => handleChange(parseDollar(value), 'tipOut')}
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
          onChange={(value) => handleChange(value, 'shiftTime')}
        />
        <CompanySelect
          onChange={handleChange}
          companyId={newEntry.companyId}
          companyList={getCompanies.companyList}
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
