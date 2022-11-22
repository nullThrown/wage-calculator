import { Heading } from '@chakra-ui/react';

const QuatHeading = ({ children, textAlign }) => {
  return (
    <Heading
      as='h4'
      size='md'
      opacity='.9'
      fontWeight='400'
      textAlign={textAlign}>
      {children}
    </Heading>
  );
};
export default QuatHeading;
