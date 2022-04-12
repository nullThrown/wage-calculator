import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Flex,
} from '@chakra-ui/react';

const EditEntryModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Existing Entry</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>
              salkdaskldlasdjlksadjlkaslkdasdlkasdlksadaslkdlsakdlaskdlkasdlkaslkdl
            </p>
          </ModalBody>
          <ModalFooter>
            <Flex>
              <Button colorScheme='blue' mr='.8em'>
                Fill
              </Button>
              <Button colorScheme='gray' variant='outline' onClick={onClose}>
                Cancel
              </Button>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default EditEntryModal;
