import { Heading } from '@chakra-ui/react';

const SecHeading = ({ text }) => {
  return (
    <Heading as='h2' size='xl' opacity='.9' fontWeight='400'>
      {text}
    </Heading>
  );
};
export default SecHeading;
