import { Box } from '@chakra-ui/react';
const MainWrapper = ({ children, numOfRows }) => {
  const gridRowConfig = {
    two: '1fr auto',
    three: 'auto 1fr auto',
    four: 'auto auto 1fr auto',
  };
  return (
    <Box
      minH='100vh'
      display='grid'
      gridTemplateColumns='100%'
      gridTemplateRows={gridRowConfig[numOfRows]}>
      {children}
    </Box>
  );
};

export default MainWrapper;
