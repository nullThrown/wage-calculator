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
  useToast,
} from '@chakra-ui/react';
import SetCompanyToEditBtn from 'components/button/SetCompanyToEditBtn';
import DeleteCompanyBtn from 'components/button/DeleteCompanyBtn';
import { successToast, errorToast } from 'components/toast/toast';
import useDeleteCompany from 'features/user/hooks/usedeleteCompany';
import { connection_error, server_error } from 'constants/api/error';

const CompanyDisplay = ({ companyList, setCompanyList, handleSetEditMode }) => {
  const deleteCompany = useDeleteCompany();
  const toast = useToast();

  const handleDeleteCompany = (_id) => {
    deleteCompany.mutate(_id, {
      onSuccess: (data, variables, context) => {
        setCompanyList((prev) => {
          return prev.filter((company) => company._id !== _id);
        });
        toast({ ...successToast, title: 'Company removed Successfully!' });
      },
      onError: (error, variables, context) => {
        const { message } = error;
        if (message === server_error || message === connection_error) {
          toast({ ...errorToast });
        }
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
                  bg={index % 2 === 1 ? 'rgba(240,240,240,.3)' : null}>
                  <Td>{name}</Td>
                  <Td>{position}</Td>
                  <Td>$ {hourlyWage}</Td>
                  <Td>
                    {overtimeMultiplier}
                    <SetCompanyToEditBtn
                      handleSetEditMode={() => handleSetEditMode(company)}
                    />
                    <DeleteCompanyBtn
                      handleDeleteCompany={() => handleDeleteCompany(_id)}
                    />
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
