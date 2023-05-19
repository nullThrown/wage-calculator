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
  Button,
  useToast,
} from '@chakra-ui/react';
import useDeleteCompany from 'features/user/hooks/usedeleteCompany';

const CompanyDisplay = ({
  companyList,
  setCompanyList,
  handleSetFormToEditMode,
}) => {
  const deleteCompany = useDeleteCompany();
  const toast = useToast();

  // const handleEditCompany = () => {};
  const handleDeleteCompany = (_id) => {
    deleteCompany.mutate(_id, {
      onSuccess: (data, variables, context) => {
        setCompanyList((prev) => {
          return prev.filter((company) => company._id !== _id);
        });
        toast({
          title: 'Company removed Successfully!',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      },
      onError: (error, variables, context) => {
        toast({
          title: 'Company removed Unsuccessfully.',
          description: 'Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'top',
        });
      },
    });
  };
  return (
    <Box mt='2em'>
      <Text textAlign='center' fontSize='lg' fontWeight='600'>
        Added Companies
      </Text>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Position</Th>
              <Th>Hourly Wage</Th>
              <Th>Overtime Mult.</Th>
            </Tr>
          </Thead>
          <Tbody>
            {companyList.length === 0 && (
              <Tr>
                <Td>-</Td>
                <Td>-</Td>
                <Td>-</Td>
                <Td>-</Td>
              </Tr>
            )}
            {companyList.map((company, index) => {
              const { name, position, hourlyWage, overtimeMultiplier, _id } =
                company;
              return (
                <Tr
                  key={_id}
                  bg={index % 2 === 1 ? 'rgba(240,240,240,.3)' : ''}>
                  <Td>{name}</Td>
                  <Td>{position}</Td>
                  <Td>$ {hourlyWage}</Td>
                  <Td>
                    {overtimeMultiplier}
                    <Button
                      ml='2em'
                      size='xs'
                      variant='link'
                      onClick={() => handleSetFormToEditMode(company)}>
                      Edit
                    </Button>
                    <Button
                      ml='.8em'
                      size='xs'
                      variant='outline'
                      colorScheme='red'
                      onClick={() => handleDeleteCompany(_id)}>
                      Del
                    </Button>
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
