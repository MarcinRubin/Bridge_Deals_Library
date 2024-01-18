import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
  Tooltip,
  Button,
  Text,
  Heading,
} from "@chakra-ui/react";

import { DeleteIcon } from "@chakra-ui/icons";

const DeleteDealButton = ({ handleDealDelete }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <>
      <Tooltip label="Delete" aria-label="A tooltip">
        <Button onClick={onOpen}>
          <DeleteIcon boxSize={3} />
        </Button>
      </Tooltip>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Deal
            </AlertDialogHeader>

            <AlertDialogBody>
              <Text>Deal will be deleted</Text>
              <Heading size="sm" mt={4}>
                Are you sure? You can't undo this action afterwards!
              </Heading>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDealDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteDealButton;
