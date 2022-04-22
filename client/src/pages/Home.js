import {
  Collapse,
  useDisclosure,
  Divider,
  VStack,
  Box,
} from '@chakra-ui/react';
import MainContainer from '../components/base/Container';
import MainHeading from '../components/typography/MainHeading';
import AddEntryBtn from '../components/button/AddEntry';
import Header from '../components/base/Header';
import AddEntryForm from '../components/card/AddEntryForm';
import Overview from '../components/card/Overview';
import Day from '../components/card/Day';
import Month from '../components/card/Month';
import Shift from '../components/card/Shift';
import SecHeading from '../components/typography/SecHeading';

const Home = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Header />
      <MainContainer>
        <MainHeading text='Welcome, <username>' />
        <AddEntryBtn onToggle={onToggle} />
        <Collapse in={isOpen} animateOpacity>
          <AddEntryForm onToggle={onToggle} />
        </Collapse>
        <Box m='4em auto' w='100%'>
          <SecHeading text='Analytics' textAlign='center' />
          <Divider maxW='700px' />
          <VStack m='3em auto' w='100%' spacing='3em'>
            <Overview />
            <Day />
            <Month />
            <Shift />
          </VStack>
        </Box>
      </MainContainer>
    </>
  );
};

export default Home;
