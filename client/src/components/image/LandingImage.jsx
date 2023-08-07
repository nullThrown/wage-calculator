import { Box } from '@chakra-ui/react';
const LandingImage = () => {
  return (
    <Box
      as='span'
      role='img'
      aria-label='girl on computer'
      display='block'
      width='400px'
      height='300px'
      position='relative'
      background='url(/image/girl-on-computer.jpg)'
      backgroundSize='cover'
      borderRadius='1.5rem'
      _after={{
        position: 'absolute',
        zIndex: '-1',
        content: '""',
        width: '100%',
        height: '100%',
        top: '14%',
        left: '14%',
        borderRadius: '1.5rem 1.5rem 0 0',
        backgroundImage: 'linear-gradient(blue, white)',
      }}></Box>
  );
};

export default LandingImage;
