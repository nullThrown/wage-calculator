import { Heading } from '@chakra-ui/react';

const TertHeading = ({ children, textAlign }) => {
  return (
    <Heading
      as='h3'
      size='lg'
      opacity='.85'
      fontWeight='400'
      textAlign={textAlign}>
      {children}
    </Heading>
  );
};
export default TertHeading;
