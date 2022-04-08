import { Collapse, useDisclosure } from '@chakra-ui/react';
import MainContainer from '../components/base/Container';
import MainHeading from '../components/typography/MainHeading';
import AddEntryBtn from '../components/button/AddEntry';
import Header from '../components/base/Header';
import AddEntryForm from '../components/form/AddEntry';
import Overview from '../components/card/Overview';
import Day from '../components/card/Day';
import Month from '../components/card/Month';
import Shift from '../components/card/Shift';
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
        <Overview />
        <Day />
        <Month />
        <Shift />
      </MainContainer>
    </>
  );
};

export default Home;
