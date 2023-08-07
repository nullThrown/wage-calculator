import { Box } from '@chakra-ui/react';
const MainWrapper = ({ children, isHeader }) => {
  return (
    <Box
      minH='100vh'
      display='grid'
      gridTemplateRows={isHeader ? 'auto 1fr auto' : '1fr auto'}
      gridTemplateColumns='100%'>
      {children}
    </Box>
  );
};

export default MainWrapper;
