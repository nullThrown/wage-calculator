import { Button } from '@chakra-ui/button';
import { VStack } from '@chakra-ui/layout';
import ErrorText from './ErrorText';
import { RepeatIcon } from '@chakra-ui/icons';

const SomethingWentWrong = ({ refresh, reFetch }) => {
  let tryAgainText;
  if (refresh || reFetch) {
    tryAgainText = 'please try again';
  } else {
    tryAgainText = null;
  }
  const refreshPage = () => {
    window.location.reload();
  };
  return (
    <>
      <VStack>
        <ErrorText>Something went wrong :( {tryAgainText}</ErrorText>
        {refresh ? (
          <Button type='button' onClick={refreshPage}>
            <RepeatIcon background='inherit' />
          </Button>
        ) : null}
        {reFetch ? (
          <Button type='button' onClick={reFetch}>
            <RepeatIcon background='inherit' />
          </Button>
        ) : null}
      </VStack>
    </>
  );
};
export default SomethingWentWrong;
