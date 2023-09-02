import { useEffect, useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Box,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDatePicker from 'components/inputs/DatePicker/CustomDatePicker';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import useGetAllEntries from 'features/entries/hooks/useGetAllEntries';
import filterEntriesByDate from 'features/entries/helpers/filterEntriesByDate';
import { useReducer } from 'react';

const initialValue = {
  selectedDate: new Date(),
  selectedEntryId: null,
  filteredEntries: [],
};
const editReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'change_date':
      const { newDate, entries } = action;
      const filteredEntries = filterEntriesByDate(entries, newDate);
      return {
        ...state,
        selectedDate: newDate,
        selectedEntryId: null,
        filteredEntries: filteredEntries,
      };
    case 'select_entry':
      return {
        ...state,
        selectedEntryId: action.id,
      };
    case 'send_entry_to_Form':
      break;
  }
  throw Error('Unknown action: ' + action.type);
};

const EditEntryModal = ({ isOpen, onClose, filter }) => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  // const [selectedEntryId, setSelectedEntryId] = useState(null);
  // const [filteredEntries, setFilteredEntries] = useState([]);
  const [state, dispatch] = useReducer(editReducer, initialValue);

  const { isLoading, isError, entries } = useGetAllEntries(filter);

  // const handleSelectEntryId = (id) => setSelectedEntryId(id);

  // useEffect(() => {
  //   setSelectedEntryId(null);
  // }, [selectedDate]);

  // useEffect(() => {
  //   const filteredEntries = filterEntriesByDate(entries, selectedDate);
  //   setFilteredEntries(filteredEntries);
  // }, [selectedDate, entries]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center' fontSize='lg' opacity='.85'>
          Select A Date
        </ModalHeader>
        <ModalCloseButton size='sm' />
        <ModalBody>
          <Box as='form'>
            <CustomDatePicker
              date={state.selectedDate}
              onChange={(date) =>
                dispatch({
                  type: 'change_date',
                  newDate: date,
                  entries: entries,
                })
              }
            />

            <VStack mt='.8em' alignItems='stretch'>
              {state.filteredEntries.length === 0 ? (
                <Text mt='.5em' textAlign='center'>
                  There are no entries for that day
                </Text>
              ) : (
                <Text m='.5em 0' textAlign='center'>
                  There are{' '}
                  <Text color='purple.500' fontWeight='500' display='inline'>
                    {state.filteredEntries.length}{' '}
                  </Text>
                  entries for that day
                </Text>
              )}
              {state.filteredEntries.map((entry) => {
                return (
                  <Button
                    colorScheme={
                      entry?._id === state.selectedEntryId ? 'facebook' : null
                    }
                    _hover={
                      entry?._id === state.selectedEntryId
                        ? { backgroundColor: 'facebook' }
                        : null
                    }
                    key={entry._id}
                    size='sm'
                    onClick={() =>
                      dispatch({ type: 'select_entry', id: entry._id })
                    }
                    rightIcon={
                      entry.shiftTime === 'morning' ? (
                        <IconContext.Provider value={{ color: 'yellow' }}>
                          <BsSunFill />
                        </IconContext.Provider>
                      ) : (
                        <IconContext.Provider value={{ color: 'blue' }}>
                          <BsFillMoonFill />
                        </IconContext.Provider>
                      )
                    }>
                    {entry.company} - {entry.position}
                  </Button>
                );
              })}
            </VStack>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            size='sm'
            colorScheme='blue'
            mr='.8em'
            isDisabled={!state.selectedEntryId}>
            Fill
          </Button>
          <Button
            size='sm'
            colorScheme='gray'
            variant='outline'
            onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default EditEntryModal;
