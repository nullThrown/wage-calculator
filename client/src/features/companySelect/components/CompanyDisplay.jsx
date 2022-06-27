import React from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Text,
  Badge,
} from '@chakra-ui/react';
import TertHeading from 'components/typography/TertHeading';
const companies = [
  {
    name: 'Punch Bowl Social',
    startDate: '4-23-22',
    status: false,
  },
  {
    name: 'Iron Cactus',
    startDate: '6-17-22',
    active: true,
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
              <Th>Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {companies.map((company, index) => {
              const { name, startDate, active } = company;
              return (
                <Tr bg={index % 2 === 1 ? 'rgba(240,240,240,.3)' : null}>
                  <Td>{name}</Td>
                  <Td>{startDate}</Td>
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
