import { Heading } from '@chakra-ui/react';

const SecHeading = ({ children, textAlign, as }) => {
  return (
    <Heading
      as={as}
      size='xl'
      opacity='.85'
      fontWeight='400'
      textAlign={textAlign}>
      {children}
    </Heading>
  );
};
export default SecHeading;
