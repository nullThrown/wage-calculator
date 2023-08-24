import React from 'react';
import { Text, VStack, HStack, Heading, Box, Grid } from '@chakra-ui/react';
import Login from 'components/link/Login';
import SignupFree from 'components/link/SignupFree';
import LandingImage from 'components/image/LandingImage';
import { TbDeviceWatchDollar } from 'react-icons/tb';
import { GrCompare } from 'react-icons/gr';
import ThreeColumnLayout from 'components/layout/ThreeColumnLayout';

const Landing = () => {
  return (
    <ThreeColumnLayout>
      <Grid templateColumns='1fr 1fr' rowGap='4em'>
        <VStack as='section' alignItems='flex-start' alignSelf='end'>
          <Heading as='h2' opacity='.85'>
            Welcome to
          </Heading>
          <Heading as='h2' color='blue.600' fontSize='5xl' mb='.4em'>
            Tip Analytics
          </Heading>
          <SignupFree />
        </VStack>
        <Box as='section' alignSelf='end'>
          <LandingImage />
        </Box>
        <HStack as='section' gridColumnStart='2' gridColumnEnd='3'>
          <Box>
            <Heading
              as='h3'
              fontSize='md'
              display='flex'
              fontWeight='500'
              gap='.2em'
              mb='1em'
              alignItems='center'>
              <TbDeviceWatchDollar />
              Track
            </Heading>
            <Text opacity='.9' fontSize='sm'>
              Track the amount of money you earn from tips.
            </Text>
          </Box>
          <Box>
            <Heading
              as='h3'
              fontSize='md'
              display='flex'
              fontWeight='500'
              gap='.2em'
              mb='1em'
              alignItems='center'>
              <GrCompare />
              Compare
            </Heading>
            <Text opacity='.9' fontSize='sm'>
              Compare your earnings between jobs, shifts, and positions.
            </Text>
          </Box>
        </HStack>
        <Text
          fontSize='lg'
          gridRowStart='3'
          gridColumnStart='1'
          gridColumnEnd='3'>
          Tip Analytics is a website that is built to help you organize and
          analyze the money you make from tips. Income that is supplemented from
          tips (servers, bartenders, hairdressers, etc.) is not easy to track.
          As a tipped worker how do you figure out how much you've made in the
          last month or what your hourly salary even is?
        </Text>
        <Text
          fontSize='lg'
          gridRowStart='4'
          gridColumnStart='1'
          gridColumnEnd='3'>
          Tip analytics is built exactly for this purpose. The application is
          simple. All you do is submit a simple form that asks for information
          relevant to the shift you just worked: hours worked, cash tips, credit
          tips, total sales, etc. With this information, Tip Analytics will take
          care of the rest.
        </Text>
        <Text
          fontSize='lg'
          gridRowStart='5'
          gridColumnStart='1'
          gridColumnEnd='3'>
          Once we have collected your earning's reports Tip Analytics will go to
          work deriving data that helps you make sense of your salary.
        </Text>
        <HStack>
          <Login />
        </HStack>
      </Grid>
    </ThreeColumnLayout>
  );
};

export default Landing;
