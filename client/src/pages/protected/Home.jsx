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
import Day from 'features/entries/components/Day';
import Month from 'features/month/components/Month';
import Shift from 'features/shift/components/Shift';
import SecHeading from 'components/typography/SecHeading';
import CompanySelect from 'features/companySelect/components/CompanySelect';
import Week from 'features/entries/components/Week';
import Entries from 'features/entries/components/Entries';
import { useQuery } from 'react-query';
import { getUser } from 'features/auth/api/auth';
import CenterContainer from 'components/base/CenterContainer';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import AddEntryAccordianBtn from 'components/button/AddEntryAccordianBtn';
import useGetAllEntries from 'features/entries/hooks/useGetAllEntries';
const Home = () => {
  const [filter, setFilter] = useState('all');

  const { isOpen, onToggle } = useDisclosure();
  const user = useQuery(['user'], getUser);
  const entries = useGetAllEntries(filter);
  if (user.isLoading || entries.isLoading) {
    return (
      <CenterContainer>
        <Spinner mt='6em' />
      </CenterContainer>
    );
  }
  if (user.isError || entries.isError) {
    return (
      <CenterContainer>
        <SomethingWentWrong />
      </CenterContainer>
    );
  }

  return (
    <>
      <Header />
      <MainContainer>
        <MainHeading>Welcome, {user.data.username}</MainHeading>
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
            {/* <Day filter={filter} /> */}
            {/* <Week filter={filter} /> */}
            {/* completely breaks page */}
            {/* <Month filter={filter} /> */}
            {/* <Shift filter={filter} /> */}
          </VStack>
        </Box>
      </MainContainer>
    </>
  );
};

export default Home;
