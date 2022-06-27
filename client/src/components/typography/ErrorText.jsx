import { Text } from '@chakra-ui/react';

import React from 'react';

export const ErrorText = ({ text, textAlign }) => {
  return (
    <Text fontSize='lg' color='red.700' textAlign={textAlign}>
      {text}
    </Text>
  );
};
export default ErrorText;
