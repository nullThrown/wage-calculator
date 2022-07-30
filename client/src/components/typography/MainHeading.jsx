import { Heading } from '@chakra-ui/react';

const MainHeading = ({ children, size, textAlign }) => {
  return (
    <Heading
      as='h1'
      size={size}
      opacity='.9'
      fontWeight='300'
      textAlign={textAlign}>
      {children}
    </Heading>
  );
};
export default MainHeading;
