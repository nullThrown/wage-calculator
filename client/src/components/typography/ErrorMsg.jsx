import { Text } from '@chakra-ui/react';
const ErrorMsg = ({ children }) => {
  return (
    <Text fontSize='md' color='red.600'>
      {children}
    </Text>
  );
};
export default ErrorMsg;
