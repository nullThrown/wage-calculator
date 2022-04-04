import { Box, Heading, Divider } from '@chakra-ui/react';
import NumInput from './Input';
const AddEntryForm = () => {
  return (
    <Box
      as='form'
      w='80%'
      textAlign='center'
      border='1px solid rgba(100,100,230, .6)'
      borderRadius={10}
      p='2em'>
      <Heading size='lg' fontWeight={400}>
        Add New Earning Report
      </Heading>
      <Box m='1em 0'>
        <Heading size='md' fontWeight={400} textAlign='left'>
          Totals
        </Heading>
        <Divider mb='.5em' />
        <NumInput
          title='Hours Worked'
          name='hours-worked'
          isRequired={true}
          errorMsg='wage is required'
        />
        <NumInput
          title='Total Sales'
          name='total-sales'
          isRequired={true}
          errorMsg='tip is required'
        />
        <Divider mt='1em' />
      </Box>
    </Box>
  );
};

export default AddEntryForm;
