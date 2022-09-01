import React from 'react';
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
const companies = [
  {
    name: 'Punch Bowl Social',
    startDate: '4-23-22',
    position: 'server',
    active: false,
    id: '3456',
  },
  {
    name: 'Iron Cactus',
    startDate: '6-17-22',
    position: 'server',
    active: true,
    id: '9454',
  },
];
const CompanyDisplay = () => {
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
            {companies.map((company, index) => {
              const { name, startDate, position, active, id } = company;
              return (
                <Tr key={id} bg={index % 2 === 1 ? 'rgba(240,240,240,.4)' : ''}>
                  <Td>{name}</Td>
                  <Td>{startDate}</Td>
                  <Td>{position}</Td>
                  <Td>
                    <Badge
                      colorScheme={active ? 'green' : 'red'}
                      borderRadius='5px'>
                      {active ? 'active' : 'not active'}
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
