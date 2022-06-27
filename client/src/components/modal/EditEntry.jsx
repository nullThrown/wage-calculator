import { useState } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Center,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import TertHeading from '../typography/TertHeading';
import 'react-datepicker/dist/react-datepicker.css';

const EditEntryModal = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign='center'>Select A Date</ModalHeader>
          <TertHeading>Select a Date</TertHeading>
          <ModalCloseButton />
          <ModalBody>
            <Center>
              <DatePicker
                selected={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                minDate={new Date('4-5-2022')}
                maxDate={new Date()}></DatePicker>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr='.8em'>
              Fill
            </Button>
            <Button colorScheme='gray' variant='outline' onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditEntryModal;
