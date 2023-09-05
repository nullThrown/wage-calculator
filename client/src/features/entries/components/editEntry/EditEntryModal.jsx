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
  Box,
} from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import CustomDatePicker from 'components/inputs/DatePicker/CustomDatePicker';
import { BsSunFill, BsFillMoonFill } from 'react-icons/bs';
import { IconContext } from 'react-icons';
import useGetAllEntries from 'features/entries/hooks/useGetAllEntries';
import EntriesCountText from 'features/entries/components/editEntry/EntriesCountText';

const EditEntryModal = ({ isOpen, onClose, filter, state, dispatch }) => {
  const { isLoading, isError, entries } = useGetAllEntries(filter);

  const handleFill = () => {
    dispatch({ type: 'set_to_edit_mode' });
    onClose();
  };
  const handleClose = () => {
    // if user is in edit mode & closes modal -- all state (read: entryFormData) will be reset

    // const reducerType = state.isEditMode
    // ? 'reset_all_state'
    // : 'reset_edit_mode';
    dispatch({ type: 'reset_edit_mode' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
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
              <EntriesCountText count={state.filteredEntries.length} />
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
            onClick={() => handleFill()}
            isDisabled={!state.selectedEntryId}>
            Fill
          </Button>
          <Button
            size='sm'
            colorScheme='gray'
            variant='outline'
            onClick={handleClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default EditEntryModal;
