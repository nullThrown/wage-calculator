import { useState } from 'react';
import {
  Collapse,
  useDisclosure,
  Divider,
  VStack,
  Box,
  Spinner,
} from '@chakra-ui/react';
import MainContainer from 'components/base/Container';
import MainHeading from 'components/typography/MainHeading';
import Header from 'components/base/Header';
import AddEntryForm from 'features/entries/components/addEntry/AddEntryForm';
import Overview from 'features/overview/components/Overview';
import Month from 'features/month/components/Month';
import Shift from 'features/shift/components/Shift';
import SecHeading from 'components/typography/SecHeading';
import CompanySelect from 'features/company/components/CompanySelect';
import Entries from 'features/entries/components/displayEntry/Entries';
import { useQuery } from 'react-query';
import { getUser } from 'features/user/api/user';
import CenterContainer from 'components/base/CenterContainer';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import AddEntryAccordianBtn from 'components/button/AddEntryAccordianBtn';
import MainWrapper from 'components/base/MainWrapper';
import Footer from 'components/base/Footer';
const Home = () => {
  const [filter, setFilter] = useState('all');

  const { isOpen, onToggle } = useDisclosure();
  const { isLoading, isError, data } = useQuery(['user'], getUser);
  if (isLoading) {
    return (
      <CenterContainer>
        <Spinner mt='6em' />
      </CenterContainer>
    );
  }
  if (isError) {
    return (
      <CenterContainer>
        <SomethingWentWrong />
      </CenterContainer>
    );
  }

  return (
    <MainWrapper isHeader>
      <Header />
      <MainContainer>
        <MainHeading>Welcome, {data.username}</MainHeading>
        <AddEntryAccordianBtn onToggle={onToggle} />
        <Collapse in={isOpen} animateOpacity>
          <AddEntryForm onToggle={onToggle} />
        </Collapse>
        <Box m='4em auto' w='100%'>
          <SecHeading text='Analytics' textAlign='center' />
          <Divider maxW='700px' />
          <VStack m='3em auto' w='100%' spacing='3em'>
            <CompanySelect filter={filter} setFilter={setFilter} />
            <Overview filter={filter} />
            <Entries filter={filter} />
            {/* <Month filter={filter} /> */}
            {/* <Shift filter={filter} /> */}
          </VStack>
        </Box>
      </MainContainer>
      <Footer />
    </MainWrapper>
  );
};

export default Home;
