import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  Badge,
} from '@chakra-ui/react';
import formatReadableDate from 'util/formatReadableDate';
import useGetFilteredCompanies from '../hooks/useGetFilteredCompanies';

const CompanyDisplay = ({ filter }) => {
  const { isLoading, isError, filteredCompanies } =
    useGetFilteredCompanies(filter);

  return (
    <Box mt='2em'>
      <Text textAlign='center' fontSize='lg'>
        Currently Filtered Companies
      </Text>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Start Date</Th>
              <Th>Position</Th>
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredCompanies?.map((company, index) => {
              const { name, startDate, position, _id, isActive } = company;
              return (
                <Tr
                  key={_id}
                  bg={index % 2 === 1 ? 'rgba(240,240,240,.4)' : null}>
                  <Td>{name}</Td>
                  <Td>{formatReadableDate(startDate)}</Td>
                  <Td>{position}</Td>
                  <Td>
                    <Badge
                      colorScheme={isActive ? 'green' : 'red'}
                      borderRadius='5px'>
                      {isActive ? 'active' : 'not active'}
                    </Badge>
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default CompanyDisplay;
