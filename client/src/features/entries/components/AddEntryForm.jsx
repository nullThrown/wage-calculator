import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Divider,
  Flex,
  Grid,
  useDisclosure,
  FormErrorMessage,
  FormLabel,
  Tooltip,
  Spinner,
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
import ShiftCheckboxGroup from 'features/entries/components/ShiftCheckboxGroup';

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
    totalSalesApplicable: null,
    shiftDate: new Date(),
  });
  const [isValidationError, setIsValidationError] = useState(false);
  // const [formDimensions, setFormDimensions] = useState([null, null]);
  const [formHeight, setformHeight] = useState(null);
  const [formWidth, setFormWidth] = useState(null);
  const formRef = useRef(null);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isTimeWorkedZero } = useAddEntryValidation(newEntry);
  const { isLoading, isError, companyList } = useGetCompanies();

  const createEntry = useCreateEntry();

  const handleNumberChange = (value, name) =>
    setNewEntry({ ...newEntry, [name]: value });

  const handleCompanyChange = (e) =>
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
    setNewEntry({
      ...newEntry,
      companyId: companyList[0]._id,
      totalSalesApplicable: companyList[0].totalSalesApplicable,
    });
  }, [companyList[0]._id, companyList[0].totalSalesApplicable]);

  // useEffect(() => {
  //   setFormDimensions([
  //     formRef.current.clientHeight,
  //     formRef.current.clientWidth,
  //   ]);
  // }, []);

  useEffect(() => {
    console.log('Add Entry Formed Rendered');
    setformHeight(formRef.current?.clientHeight);
    setFormWidth(formRef.current?.clientWidth);
  }, [formRef]);

  // useEffect(() => {
  //   console.log(companyList);
  //   console.log(newEntry.companyId);
  //   setNewEntry(() => {
  //     const currentlySelectedCompany = companyList?.find(
  //       (company) => company._id === newEntry.companyId
  //     );
  //     console.log(currentlySelectedCompany);
  //     // return currentlySelectedCompany._id;
  //   });
  // }, [newEntry.companyId]);
  if (createEntry.isLoading) {
    return (
      <LargeCard>
        <Spinner></Spinner>
      </LargeCard>
    );
  }
  return (
    <LargeCard as='form' m='1em 0 0 0' ref={formRef}>
      <TertHeading text="Add Earning's Report" textAlign='center' />
      <Flex m='1em' justify='center'>
        <EditEntryBtn onClick={onOpen} />
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
            onChange={(value) => handleNumberChange(value, 'hoursWorked')}
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
            onChange={(value) => handleNumberChange(value, 'minutesWorked')}
          />

          <NumInput
            title='Total Sales'
            name='totalSales'
            value={formatDollar(newEntry.totalSales)}
            precision={2}
            min={0}
            onChange={(value) =>
              handleNumberChange(parseDollar(value), 'totalSales')
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
              handleNumberChange(parseDollar(value), 'creditTips')
            }
          />
          <NumInput
            title='Cash Tips'
            name='cashTips'
            value={formatDollar(newEntry.cashTips)}
            precision={2}
            min={0}
            onChange={(value) =>
              handleNumberChange(parseDollar(value), 'cashTips')
            }
          />
          <NumInput
            title='Tip Out'
            name='tipOut'
            value={formatDollar(newEntry.tipOut)}
            precision={2}
            min={0}
            onChange={(value) =>
              handleNumberChange(parseDollar(value), 'tipOut')
            }
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
          onChange={(value) => handleNumberChange(value, 'shiftTime')}
          value={newEntry.shiftTime}
        />
        <CompanySelect
          onChange={handleCompanyChange}
          companyId={newEntry.companyId}
          companyList={companyList}
        />
      </Grid>
      <Divider />

      <SubmitEntry onClick={submitHandler} />
    </LargeCard>
  );
};

export default AddEntryForm;
