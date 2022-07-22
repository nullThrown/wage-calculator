import { Box } from '@chakra-ui/react';
const Card = ({ as, m, children }) => {
  return (
    <Box
      maxW='1000px'
      w='100%'
      p='2em'
      borderRadius='10px'
      boxShadow='5px 5px 10px rgba(220,220,220,1.0)'
      as={as}
      m={m}>
      {children}
    </Box>
  );
};
export default Card;
