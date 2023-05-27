import { useState } from 'react';
import {
  Collapse,
  useDisclosure,
  Divider,
  VStack,
  Box,
  Spinner,
  Center,
} from '@chakra-ui/react';
import ErrorText from 'components/typography/ErrorText';
import MainContainer from 'components/base/Container';
import MainHeading from 'components/typography/MainHeading';
import AddEntryBtn from 'components/button/AddEntry';
import Header from 'components/base/Header';
import AddEntryForm from 'features/entries/components/AddEntryForm';
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
        <ErrorText m='6em 0 0 0'>
          Something went wrong : ( Please try again.
        </ErrorText>
      </CenterContainer>
    );
  }
  return (
    <>
      <Header />
      <MainContainer>
        <MainHeading>Welcome, {data.username}</MainHeading>
        <AddEntryBtn onToggle={onToggle} />
        <Collapse in={isOpen} animateOpacity>
          <AddEntryForm onToggle={onToggle} />
        </Collapse>
        <Box m='4em auto' w='100%'>
          <SecHeading text='Analytics' textAlign='center' />
          <Divider maxW='700px' />
          <VStack m='3em auto' w='100%' spacing='3em'>
            <CompanySelect
              filter={filter}
              setFilter={setFilter}
              companyList={data.companies}
            />
            {/* completely breaks page */}
            {/* <Overview filter={filter} /> */}
            <Entries filter={filter} />
            <Day filter={filter} />
            <Week filter={filter} />
            {/* completely breaks page */}
            {/* <Month filter={filter} /> */}
            <Shift filter={filter} />
          </VStack>
        </Box>
      </MainContainer>
    </>
  );
};

export default Home;
