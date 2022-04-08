import { Heading } from '@chakra-ui/react';

const TertHeading = ({ text, textAlign }) => {
  return (
    <Heading
      as='h3'
      size='lg'
      opacity='.85'
      fontWeight='300'
      textAlign={textAlign}>
      {text}
    </Heading>
  );
};
export default TertHeading;
