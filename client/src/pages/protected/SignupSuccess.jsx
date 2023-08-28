import { Box, VStack, keyframes, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const widgetKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;
const textKeyFrames = keyframes`
100% { transform: translateY(-15px); opacity:1  }`;

const textAnimation = `${textKeyFrames} 700ms ease-out  normal forwards`;

const SignupSuccess = ({ isSuccess }) => {
  let iterationCount;
  if (isSuccess === true) iterationCount = '.5';
  else iterationCount = 'infinite';

  console.log(iterationCount);

  const widgetAnimation = `${widgetKeyframes} 1800ms ease-in-out 0s ${iterationCount} normal forwards`;
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        navigate('/add-company');
      }, 1500);
    }
  }, [isSuccess]);

  return (
    <VStack spacing='2' mt='10em'>
      <Box
        as={motion.div}
        animation={widgetAnimation}
        padding='2'
        backgroundColor='green.400'
        width='12'
        height='12'
        display='flex'></Box>
      {isSuccess && (
        <Text
          mt='2em'
          fontSize='2xl'
          color='green.400'
          opacity='0'
          as={motion.p}
          animation={textAnimation}>
          Account Created!
        </Text>
      )}
    </VStack>
  );
};

export default SignupSuccess;
