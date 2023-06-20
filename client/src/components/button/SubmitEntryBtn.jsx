import { Button } from '@chakra-ui/react';
const SubmitEntryBtn = ({ handleSubmit }) => {
  return (
    <Button
      onClick={handleSubmit}
      type='submit'
      colorScheme='green'
      m='2.6em auto 1em'
      display='block'>
      Submit Entry
    </Button>
  );
};
export default SubmitEntryBtn;
