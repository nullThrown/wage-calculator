import { Heading } from '@chakra-ui/react';

const MainHeading = ({ text }) => {
  return (
    <Heading as='h1' size='2xl' opacity='.95' fontWeight='400'>
      {text}
    </Heading>
  );
};
export default MainHeading;
