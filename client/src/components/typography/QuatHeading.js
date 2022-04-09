import { Heading } from '@chakra-ui/react';

const QuatHeading = ({ text, textAlign }) => {
  return (
    <Heading
      as='h4'
      size='md'
      opacity='.9'
      fontWeight='500'
      textAlign={textAlign}>
      {text}
    </Heading>
  );
};
export default QuatHeading;
