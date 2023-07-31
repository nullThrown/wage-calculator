import { Heading } from '@chakra-ui/react';

const QuatHeading = ({ children, textAlign, as }) => {
  return (
    <Heading
      as={as}
      size='md'
      opacity='.9'
      fontWeight='400'
      textAlign={textAlign}>
      {children}
    </Heading>
  );
};
export default QuatHeading;
