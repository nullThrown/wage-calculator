import { Heading } from '@chakra-ui/react';

const MainHeading = () => {
  return (
    <Heading
      as='h1'
      size='xl'
      orientation='horizontal'
      opacity='.75'
      fontWeight='400'>
      welcome, 'username'
    </Heading>
  );
};
export default MainHeading;
