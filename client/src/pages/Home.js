import { Collapse, useDisclosure } from '@chakra-ui/react';
import Container from '../components/base/container';
import MainHeading from '../components/typography/MainHeading';
import AddEntryBtn from '../components/button/AddEntry';
import Header from '../components/base/Header';
import AddEntryForm from '../components/form/AddEntry';
const Home = () => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Header />
      <Container>
        <MainHeading text='Welcome, <username>' />
        <AddEntryBtn onToggle={onToggle} />
        <Collapse in={isOpen} animateOpacity>
          <AddEntryForm onToggle={onToggle} />
        </Collapse>
      </Container>
    </>
  );
};

export default Home;
