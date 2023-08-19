import { useState } from 'react';
import {
  Collapse,
  useDisclosure,
  Divider,
  Spinner,
  Flex,
  Box,
  Heading,
} from '@chakra-ui/react';
import MainContainer from 'components/base/Container';
import Header from 'components/base/Header';
import AddEntryForm from 'features/entries/components/addEntry/AddEntryForm';
import Overview from 'features/overview/components/Overview';
import CompanySelect from 'features/company/components/CompanySelect';
import Entries from 'features/entries/components/displayEntry/Entries';
import { useQuery } from 'react-query';
import { getUser } from 'features/user/api/user';
import CenterContainer from 'components/base/CenterContainer';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import AddEntryAccordianBtn from 'components/button/AddEntryAccordianBtn';
import MainWrapper from 'components/base/MainWrapper';
import Footer from 'components/base/Footer';
import Graph from 'features/graph/components/Graph';

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
        <AddEntryAccordianBtn onToggle={onToggle} />
        <Collapse in={isOpen} animateOpacity>
          <AddEntryForm onToggle={onToggle} />
        </Collapse>
        <Divider mt='1.5em' maxW='700px' />
        <CompanySelect filter={filter} setFilter={setFilter} />
        <Box mt='4em' pt='1em' borderTop='1px solid rgb(230,230,230)'>
          <Heading
            opacity='85'
            fontSize='4xl'
            fontWeight='400'
            textAlign='center'>
            Analytics
          </Heading>
          <Flex
            m='2em 0 15em'
            flexDirection={{ base: 'column', md: 'row', lg: 'row' }}
            justifyContent='space-between'>
            <Overview filter={filter} />
            <Graph filter={filter} />
          </Flex>
          <Entries filter={filter} />
        </Box>
      </MainContainer>
      <Footer />
    </MainWrapper>
  );
};

export default Home;
