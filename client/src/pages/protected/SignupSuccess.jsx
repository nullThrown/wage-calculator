import { Box, VStack, keyframes, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const widgetKeyframes = keyframes`
  0% { transform: scale(1) rotate(0); border-radius: 20%; }
  25% { transform: scale(2) rotate(0); border-radius: 20%; }
  50% { transform: scale(2) rotate(270deg); border-radius: 50%; }
  75% { transform: scale(1) rotate(270deg); border-radius: 50%; }
  100% { transform: scale(1) rotate(0); border-radius: 20%; }
`;

const widgetAnimation = `${widgetKeyframes} 1800ms ease-in-out 0s 1.5 normal forwards`;
const textKeyFrames = keyframes`
100% { transform: translateY(-15px); opacity:1  }`;

const textAnimation = `${textKeyFrames} 500ms ease-out 2700ms normal forwards`;

const SignupSuccess = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/add-company');
    }, 3500);
  }, []);
  return (
    <VStack spacing='2' mt='10em'>
      <Box
        as={motion.div}
        animation={widgetAnimation}
        padding='2'
        // bgGradient='linear(to-l, #7928CA, #FF0080)'
        backgroundColor='green.400'
        width='12'
        height='12'
        display='flex'></Box>
      <Text
        mt='2em'
        fontSize='2xl'
        color='green.400'
        opacity='0'
        as={motion.p}
        animation={textAnimation}>
        Signup Successful!
      </Text>
    </VStack>
  );
};

export default SignupSuccess;
