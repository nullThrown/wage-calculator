import { Box, Grid, Image } from '@chakra-ui/react';
const LandingImage = () => {
  return (
    <Image
      src='/image/girl-on-computer.jpg'
      alt='girl on computer'
      objectFit='cover'
      borderRadius={['1.4em', '1.8em', '2.4em']}
      boxSize={['14em', '14em', '18em']}
      backgroundColor='blue.400'
      backgroundPosition='top 20px right 20px'
    />
  );
};

export default LandingImage;
