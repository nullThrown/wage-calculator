import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  useToast,
  Spinner,
  Heading,
  Button,
  Tooltip,
  Flex,
} from '@chakra-ui/react';
import SetCompanyToEditBtn from 'components/button/SetCompanyToEditBtn';
import DeleteCompanyBtn from 'components/button/DeleteCompanyBtn';
import { successToast, errorToast } from 'components/toast/toast';
import useDeleteCompany from 'features/company/hooks/usedeleteCompany';
import { connection_error, server_error } from 'constants/api/error';
import { useQueryClient } from 'react-query';
import useGetCompanies from 'features/company/hooks/useGetCompanies';
import SomethingWentWrong from 'components/typography/SomethingWentWrong';
import useDeactivateCompany from 'features/user/hooks/useDeactivateCompany';

const CompanyDisplay = ({ handleSetEditMode }) => {
  const deleteCompany = useDeleteCompany();
  const toast = useToast();
  const { isLoading, isError, companyList } = useGetCompanies();
  const queryClient = useQueryClient();
  const deactivateCompany = useDeactivateCompany();

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

  const handleDeactivateCompany = ({ _id, isActive }) => {
    deactivateCompany.mutate(
      { _id, isActive: !isActive },
      {
        onSuccess: (data) => {
          queryClient.setQueryData(['companies'], data);
          toast({
            ...successToast,
            title: 'Company status updated successfully!',
          });
        },
        onError: (error) => {
          const { message } = error;
          if (message === connection_error || message === server_error) {
            toast(errorToast);
          }
        },
      }
    );
  };

  if (isLoading) {
    return <Spinner />;
  }
  if (isError) {
    return <SomethingWentWrong />;
  }
  return (
    <Box mt='3.4em'>
      <Heading
        as='h2'
        textAlign='center'
        fontSize='lg'
        fontWeight='500'
        mb='.5em'>
        Current Companies
      </Heading>
      <TableContainer fontSize='sm'>
        <Table>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Position</Th>
              <Th>Hourly Wage</Th>
              <Th>Overtime Mult.</Th>
              <Th></Th>
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
              const {
                name,
                position,
                hourlyWage,
                overtimeMultiplier,
                _id,
                isActive,
              } = company;

              return (
                <Tr
                  opacity={isActive ? 'inherit' : '.6'}
                  key={_id}
                  bg={index % 2 === 1 ? 'rgba(240,240,240,.3)' : null}>
                  <Td>{name}</Td>
                  <Td>{position}</Td>
                  <Td>$ {hourlyWage}</Td>
                  <Td>{overtimeMultiplier}</Td>
                  <Td pl='0' pr='0'>
                    <Flex justifyContent='space-evenly' gap='2.5'>
                      <SetCompanyToEditBtn
                        handleSetEditMode={() => handleSetEditMode(company)}
                      />
                      <DeleteCompanyBtn
                        handleDeleteCompany={() => handleDeleteCompany(_id)}
                      />
                      <Tooltip
                        label={
                          isActive
                            ? 'This will remove the company from your active company list. You will still have access to the company and its data.'
                            : 'This will reactivate the company'
                        }>
                        <Button
                          size='xs'
                          onClick={() =>
                            handleDeactivateCompany({ _id, isActive })
                          }>
                          {isActive ? 'Deactivate' : 'Activate'}
                        </Button>
                      </Tooltip>
                    </Flex>
                  </Td>
                  {isActive}
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
