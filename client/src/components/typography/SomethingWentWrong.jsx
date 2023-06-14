import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import ErrorText from './ErrorText';
import { RepeatIcon } from '@chakra-ui/icons';

const SomethingWentWrong = ({ refresh }) => {
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      <VStack>
        <ErrorText>
          Something went wrong :({refresh ? ' please try again.' : null}
        </ErrorText>

        {refresh ? (
          <Button type='button' onClick={refreshPage}>
            <RepeatIcon background='inherit' />
          </Button>
        ) : null}
      </VStack>
    </>
  );
};
export default SomethingWentWrong;
