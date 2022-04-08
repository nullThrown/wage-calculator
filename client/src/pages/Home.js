import { Collapse, useDisclosure } from '@chakra-ui/react';
import MainContainer from '../components/base/Container';
import MainHeading from '../components/typography/MainHeading';
import AddEntryBtn from '../components/button/AddEntry';
import Header from '../components/base/Header';
import AddEntryForm from '../components/form/AddEntry';
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
      </MainContainer>
    </>
  );
};

export default Home;
