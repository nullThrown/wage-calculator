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
import AddEntryForm from 'features/entries/components/addEntry/AddEntryForm';
import Overview from 'features/overview/components/Overview';
import CompanySelect from 'features/company/components/CompanySelect';
import Entries from 'features/entries/components/displayEntry/Entries';
import { useQuery } from 'react-query';
import { getUser } from 'features/user/api/user';
import CenterContainer from 'components/base/CenterContainer';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import AddEntryAccordianBtn from 'components/button/AddEntryAccordianBtn';
import Graph from 'features/graph/components/Graph';
import FourColumnLayout from 'components/layout/FourColumnLayout';

const Home = () => {
  const [filter, setFilter] = useState('all');

  const { isOpen, onToggle } = useDisclosure();
  const { isLoading, isError } = useQuery(['user'], getUser);
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
    <FourColumnLayout>
      <AddEntryAccordianBtn onToggle={onToggle} />
      <Collapse in={isOpen} animateOpacity>
        <AddEntryForm onToggle={onToggle} filter={filter} />
      </Collapse>
      <Divider mt='1.5em' maxW='700px' />
      <CompanySelect filter={filter} setFilter={setFilter} />
      <Box
        mt='4em'
        pt='1em'
        maxW='58rem'
        w='100%'
        borderTop='1px solid rgb(230,230,230)'>
        <Heading
          textAlign='center'
          as='h2'
          fontSize='3xl'
          opacity='.95'
          fontWeight='500'>
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
    </FourColumnLayout>
  );
};

export default Home;
