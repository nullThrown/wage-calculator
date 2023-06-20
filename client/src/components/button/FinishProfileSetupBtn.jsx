import { Button } from '@chakra-ui/react';
const FinishProfileSetupBtn = ({ handleFinish }) => {
  return (
    <Button colorScheme='telegram' size='lg' onClick={handleFinish}>
      Finish
    </Button>
  );
};

export default FinishProfileSetupBtn;
