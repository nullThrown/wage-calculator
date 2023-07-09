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
  Spinner,
} from '@chakra-ui/react';
import SetCompanyToEditBtn from 'components/button/SetCompanyToEditBtn';
import DeleteCompanyBtn from 'components/button/DeleteCompanyBtn';
import { successToast, errorToast } from 'components/toast/toast';
import useDeleteCompany from 'features/company/hooks/usedeleteCompany';
import { connection_error, server_error } from 'constants/api/error';
import { useQueryClient } from 'react-query';
import useGetCompanies from 'features/company/hooks/useGetCompanies';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';

const CompanyDisplay = ({ handleSetEditMode }) => {
  const deleteCompany = useDeleteCompany();
  const toast = useToast();
  const { isLoading, isError, companyList } = useGetCompanies();
  const queryClient = useQueryClient();

  const handleDeleteCompany = (_id) => {
    deleteCompany.mutate(_id, {
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(['companies'], data);

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

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
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
            {companyList?.length === 0 && (
              <Tr>
                <Td>-</Td>
                <Td>-</Td>
                <Td>-</Td>
                <Td>-</Td>
              </Tr>
            )}
            {companyList?.map((company, index) => {
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
