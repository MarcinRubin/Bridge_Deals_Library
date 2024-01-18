import { useRef, useState } from "react";
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
  Select,
  Box,
} from "@chakra-ui/react";

import { ArrowRightIcon } from "@chakra-ui/icons";

const MoveDealButton = ({ handleDealMove, allDirectories }) => {
    const [chosenDir, setChosenDir] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  const handleMove = () => {
    if (chosenDir !== ""){
        onClose();
        handleDealMove(chosenDir);
    }
  }

  return (
    <>
      <Tooltip label="Change Directory" aria-label="A tooltip">
        <Button onClick={onOpen}>
          <ArrowRightIcon boxSize={3} />
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
              Move Deal
            </AlertDialogHeader>

            <AlertDialogBody
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
              gap={3}
            >
              <Box>
                <Text>Select the directory to move the deal to:</Text>
              </Box>
              <Select placeholder="Select Directory" value={chosenDir} onChange={(e) => setChosenDir(e.target.value)}>
                {allDirectories.map((item, idx) => (
                    <option key={idx} value={item}>{item}</option>
                ))}
              </Select>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="green" onClick={handleMove} ml={3}>
                Move
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default MoveDealButton;
