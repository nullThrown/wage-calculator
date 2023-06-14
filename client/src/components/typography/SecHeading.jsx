import { Heading } from '@chakra-ui/react';

const SecHeading = ({ children, textAlign }) => {
  return (
    <Heading
      as='h2'
      size='xl'
      opacity='.85'
      fontWeight='400'
      textAlign={textAlign}>
      {children}
    </Heading>
  );
};
export default SecHeading;
