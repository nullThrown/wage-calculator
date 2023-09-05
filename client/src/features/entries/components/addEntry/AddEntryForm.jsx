import { useEffect, useState, useReducer } from 'react';
import {
  Divider,
  Flex,
  Grid,
  useDisclosure,
  FormLabel,
  useToast,
  Button,
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
import useUpdateEntry from 'features/entries/hooks/useUpdateEntry';
import {
  initialState,
  entryFormReducer,
} from 'features/entries/helpers/entryFormReducer';

const AddEntryForm = ({ filter }) => {
  const [isValidationError, setIsValidationError] = useState(false);

  const [state, dispatch] = useReducer(entryFormReducer, initialState);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isTimeWorkedZero } = useAddEntryValidation(state.entryFormData);
  const toast = useToast();
  const getCompanies = useGetCompanies();
  const createEntry = useCreateEntry();
  const updateEntry = useUpdateEntry();

  const handleChange = (firstArg, name) =>
    dispatch({ type: 'set_form_data', firstArg, name });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isTimeWorkedZero) {
      setIsValidationError(true);
    } else {
      setIsValidationError(false);
      createEntry.mutate(state.entryFormData, {
        onSuccess: (data, variables, context) => {
          dispatch({ type: 'reset_all_state' });
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

  const handleUpdateEntry = (e) => {
    e.preventDefault();
    if (isTimeWorkedZero) {
      setIsValidationError(true);
    } else {
      setIsValidationError(false);
    }
    updateEntry.mutate(state.entryFormData, {
      onSuccess: () => {
        dispatch({ type: 'reset_all_state' });
        toast({ ...successToast, title: 'Entry updated Successfully!' });
      },
      onError: (error) => {
        const { message } = error;
        if (message === server_error || message === connection_error) {
          toast({ ...errorToast });
        }
      },
    });
  };

  useEffect(() => {
    const { companyList } = getCompanies;
    if (companyList) {
      dispatch({
        type: 'init_entry_form',
        selectedCompanyId: companyList[0]._id,
      });
    }
  }, [getCompanies.companyList]);
  // set totalSalesApplicable state value according to selected Company totalSalesApplicable
  useEffect(() => {
    const { companyId } = state.entryFormData;
    if (companyId) {
      const selectedCompany = getCompanies.companyList.find(
        (company) => company._id === companyId
      );
      dispatch({
        type: 'set_total_sales_applicable',
        companyTotalSalesApplicable: selectedCompany.totalSalesApplicable,
      });
    }
  }, [state.entryFormData.companyId, getCompanies.companyList]);

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
              date={state.entryFormData.shiftDate}
              onChange={(date) =>
                dispatch({ type: 'set_shift_date', shiftDate: date })
              }
            />
          </Flex>
          <ShiftCheckboxGroup
            totalSalesApplicable={state.entryFormData.totalSalesApplicable}
            specialEvent={state.entryFormData.specialEvent}
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
            value={state.entryFormData.hoursWorked}
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
            value={state.entryFormData.minutesWorked}
            onChange={handleChange}
            isInvalid={isValidationError && isTimeWorkedZero}
            precision={0}
            min={0}
            max={59}
          />
          <NumInput
            title='Total Sales'
            name='totalSales'
            isDisabled={!state.entryFormData.totalSalesApplicable}
            value={formatDollar(state.entryFormData.totalSales)}
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
            value={formatDollar(state.entryFormData.creditTips)}
            onChange={(value) => handleChange(parseDollar(value), 'creditTips')}
            precision={2}
            min={0}
          />
          <NumInput
            title='Cash Tips'
            name='cashTips'
            value={formatDollar(state.entryFormData.cashTips)}
            onChange={(value) => handleChange(parseDollar(value), 'cashTips')}
            precision={2}
            min={0}
          />
          <NumInput
            title='Tip Out'
            name='tipOut'
            value={formatDollar(state.entryFormData.tipOut)}
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
          value={state.entryFormData.shiftTime}
          onChange={(value) => handleChange(value, 'shiftTime')}
        />
        <CompanySelect
          onChange={handleChange}
          companyId={state.entryFormData.companyId}
          companyList={getCompanies.companyList}
        />
      </Grid>
      <Divider />
      <Flex justifyContent='center' gap='.5em' mt='1.5em'>
        {state.isEditMode ? (
          <>
            <Button
              type='submit'
              onClick={handleUpdateEntry}
              colorScheme='teal'>
              Edit Entry
            </Button>
            <Button onClick={() => dispatch({ type: 'reset_all_state' })}>
              Cancel
            </Button>
          </>
        ) : (
          <SubmitEntryBtn
            handleSubmit={handleSubmit}
            isLoading={createEntry.isLoading}
          />
        )}
      </Flex>
    </LargeCard>
  );
};

export default AddEntryForm;
