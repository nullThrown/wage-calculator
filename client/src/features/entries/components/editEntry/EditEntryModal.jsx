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

const EditEntryModal = ({ isOpen, onClose, filter }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [filteredEntries, setFilteredEntries] = useState([]);

  const { isLoading, isError, entries } = useGetAllEntries(filter);

  const handleSelectEntryId = (id) => setSelectedEntryId(id);

  useEffect(() => {
    setSelectedEntryId(null);
  }, [selectedDate]);

  useEffect(() => {
    const filteredEntries = filterEntriesByDate(entries, selectedDate);
    setFilteredEntries(filteredEntries);
  }, [selectedDate, entries]);
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center' fontSize='lg' opacity='.85'>
            Select A Date
          </ModalHeader>
          <ModalCloseButton size='sm' />
          <ModalBody>
            <Box as='form'>
              <CustomDatePicker date={selectedDate} setDate={setSelectedDate} />
              <Text textAlign='center' mt='1em'>
                There are 2 shifts for that date
              </Text>
              <VStack mt='.8em' alignItems='stretch'>
                {filteredEntries.length === 0 ? (
                  <Text>There are no entries for that day</Text>
                ) : (
                  filteredEntries.map((entry) => {
                    return (
                      <Button
                        colorScheme={
                          entry?._id === selectedEntryId ? 'facebook' : null
                        }
                        _hover={
                          entry?._id === selectedEntryId
                            ? { backgroundColor: 'facebook' }
                            : null
                        }
                        key={entry._id}
                        size='sm'
                        onClick={() => handleSelectEntryId(entry._id)}
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
                  })
                )}
              </VStack>
            </Box>
          </ModalBody>
          <ModalFooter>
            <Button
              size='sm'
              colorScheme='blue'
              mr='.8em'
              isDisabled={!selectedEntryId}>
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
    </>
  );
};
export default EditEntryModal;
