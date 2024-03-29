import { Button } from '@chakra-ui/react';
const SubmitEntryBtn = ({ handleSubmit, isLoading }) => {
  return (
    <Button
      onClick={handleSubmit}
      type='submit'
      colorScheme='green'
      isLoading={isLoading}
      loadingText='Adding'
      display='block'>
      Submit Entry
    </Button>
  );
};
export default SubmitEntryBtn;
