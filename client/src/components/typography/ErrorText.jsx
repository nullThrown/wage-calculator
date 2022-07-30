import { Text } from '@chakra-ui/react';

import React from 'react';

export const ErrorText = ({ children, textAlign, m }) => {
  return (
    <Text
      fontSize='lg'
      color='red.800'
      m={m}
      fontWeight='400'
      textAlign={textAlign}>
      {children}
    </Text>
  );
};
export default ErrorText;
