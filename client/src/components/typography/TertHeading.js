import { Heading } from '@chakra-ui/react';

const TertHeading = ({ text }) => {
  return (
    <Heading as='h3' size='lg' opacity='.85' fontWeight='400'>
      {text}
    </Heading>
  );
};
export default TertHeading;
