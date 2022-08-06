import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
  Flex,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
const FinishInfoModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  const handleContinue = () => navigate('/home');

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay>
        <ModalContent>
          <ModalHeader>Are you sure you want to continue?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text mb='.5em'>
              You haven't added a company to your profile yet. Would you like to
              go back and add one now?
            </Text>
            <Flex justify='right' width='70%' m='0 auto'>
              <Button
                mr='.5em'
                colorScheme='red'
                bg='red.400'
                type='button'
                onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant='outline'
                color='blue.700'
                type='button'
                onClick={handleContinue}>
                Continue
              </Button>
            </Flex>
          </ModalBody>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

export default FinishInfoModal;
