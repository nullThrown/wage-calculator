import { Box } from '@chakra-ui/react';
const SmallCard = ({ as, children }) => {
  return (
    <Box
      as={as}
      maxWidth='600px'
      width='100%'
      borderBottom='1px solid rgb(200,200,200)'
      pb='.5em'>
      {children}
    </Box>
  );
};

export default SmallCard;
