import { Heading } from '@chakra-ui/react';

const SecHeading = ({ text, textAlign }) => {
  return (
    <Heading
      as='h2'
      size='xl'
      opacity='.85'
      fontWeight='400'
      textAlign={textAlign}>
      {text}
    </Heading>
  );
};
export default SecHeading;
