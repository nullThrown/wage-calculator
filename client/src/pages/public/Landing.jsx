import React from 'react';
import {
  Text,
  ButtonGroup,
  VStack,
  Link as RouterLink,
} from '@chakra-ui/react';
import MainHeading from 'components/typography/MainHeading';
import Header from 'components/base/Header';
import MainContainer from 'components/base/Container';
import Login from 'components/button/Login';
import Signup from 'components/button/Signup';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <>
      <Header />
      <MainContainer>
        <MainHeading>Welcome to Tip Analytics</MainHeading>
        <VStack mt='2em' spacing='1em'>
          <Text fontSize='lg'>
            Tip Analytics is a website that is built to help you organize and
            analyze the money you make from tips. Income that is supplemented
            from tips (servers, bartenders, hairdressers, etc.) is not easy to
            track. As a tipped worker how do you figure out how much you've made
            in the last month or what your hourly salary even is?
          </Text>
          <Text fontSize='lg'>
            Tip analytics is built exactly for this purpose. The application is
            simple. All you do is submit a simple form that asks for information
            relevant to the shift you just worked: hours worked, cash tips,
            credit tips, total sales, etc. With this information, Tip Analytics
            will take care of the rest.
          </Text>
          <Text fontSize='lg'>
            Once we have collected your earning's reports Tip Analytics will go
            to work deriving data that helps you make sense of your salary.
          </Text>
        </VStack>
        <ButtonGroup>
          <Link as={RouterLink} to='/login'>
            <Login />
          </Link>
          <Link as={RouterLink} to='/signup'>
            <Signup />
          </Link>
        </ButtonGroup>
      </MainContainer>
    </>
  );
};

export default Landing;
