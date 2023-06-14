import { Button } from '@chakra-ui/react';
const SubmitEntryBtn = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      type='submit'
      colorScheme='green'
      m='2.6em auto 1em'
      display='block'>
      Submit Entry
    </Button>
  );
};
export default SubmitEntryBtn;
