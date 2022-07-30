import {
  Collapse,
  useDisclosure,
  Divider,
  VStack,
  Box,
} from '@chakra-ui/react';
import MainContainer from 'components/base/Container';
import MainHeading from 'components/typography/MainHeading';
import AddEntryBtn from 'components/button/AddEntry';
import Header from 'components/base/Header';
import AddEntryForm from 'components/card/AddEntryForm';
import Overview from 'features/overview/components/Overview';
import Day from 'features/entries/components/Day';
import Month from 'features/month/components/Month';
import Shift from 'features/shift/components/Shift';
import SecHeading from 'components/typography/SecHeading';
import CompanySelect from 'features/companySelect/components/CompanySelect';
import Week from 'features/entries/components/Week';
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
            <CompanySelect />
            <Overview />
            <Day />
            <Week />
            <Month />
            <Shift />
          </VStack>
        </Box>
      </MainContainer>
    </>
  );
};

export default Home;
