import { useState, useRef, useEffect } from "react";
import {
  setFilterDownTheTree,
  findNode,
  findParentNode,
} from "../utils/DealNavigator";
import {
  ButtonGroup,
  VStack,
  Box,
  Tooltip,
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Heading,
  Text
} from "@chakra-ui/react";
import {
  AddIcon,
  DeleteIcon,
  ChevronRightIcon,
  ChevronDownIcon,
} from "@chakra-ui/icons";
import { useDisclosure } from "@chakra-ui/react";

const DealNavigator = ({
  directories,
  filter,
  setFilter,
  allDirectories,
  setAllDirectories,
  addDirectoryToTree,
  deleteDirectoryFromTree,
}) => {
  const [chosenDirectory, setChosenDirectory] = useState(directories[0]);
  const [stopPropagation, setStopPropagation] = useState(["0"]);

  //This can be transform in the single useReducer for clarity
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("New Folder");
  const [temporaryNode, setTemporaryNode] = useState(null);
  const Ref = useRef(null);
  ////////////////////////////////////////////////////////////

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    Ref.current?.focus();
  }, [edit]);

  useEffect(() => {
    let newFilter = [];
    newFilter = setFilterDownTheTree(chosenDirectory, newFilter);
    setFilter(newFilter);
    let newAllDirectories = [];
    newAllDirectories = setFilterDownTheTree(directories[0], newAllDirectories);
    setAllDirectories(newAllDirectories);
  }, [directories]);

  const handleSelect = (key) => {
    const node = findNode(key, directories);
    setChosenDirectory(node);
    let newFilter = setFilterDownTheTree(node, []);
    setFilter(newFilter);
  };

  const handleExpand = (node) => {
    let propagation = [...stopPropagation];
    if (propagation.includes(node.key)) {
      propagation = propagation.filter((item) => item !== node.key);
      propagation = [...propagation, ...node.children.map((item) => item.key)];
    } else {
      propagation = propagation.filter(
        (item) => item.slice(0, node.key.length) !== node.key
      );
      propagation = [...propagation, node.key];
    }
    setStopPropagation(propagation);
  };

  const handleAddDirectory = () => {
    const childrenNumber = chosenDirectory.children.length;
    let newKey = "";
    if (childrenNumber) {
      newKey = chosenDirectory.children[childrenNumber - 1].key.split("-");
      newKey[newKey.length - 1] = String(childrenNumber);
    } else newKey = [...chosenDirectory.key.split("-"), "0"];
    const newTemporaryNode = {
      parentKey: chosenDirectory.key,
      key: newKey.join("-"),
      value: "New Folder",
      visibility: true,
      children: [],
    };
    setTemporaryNode(newTemporaryNode);
    setEdit(true);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleBlur = async () => {
    const newDirectories = [...directories];
    const newTemporaryNode = { ...temporaryNode };
    const parentNode = findNode(temporaryNode.parentKey, newDirectories);

    delete newTemporaryNode.parentKey;
    temporaryNode.value = name;

    parentNode.children = [...parentNode.children, temporaryNode];
    await addDirectoryToTree(newDirectories);
    setName("New Folder");
    setEdit(false);
  };

  const handleDelete = async () => {
    const newDirectories = [...directories];
    const parentNode = findParentNode(chosenDirectory, newDirectories);
    parentNode.children = parentNode.children.filter(
      (item) => item.key !== chosenDirectory.key
    );
    handleSelect(parentNode.key);
    deleteDirectoryFromTree(filter, parentNode.value, newDirectories);
    onClose();
  };

  const handleDirectories = (item, depth) => {
    return (
      <Box key={item.key}>
        <Box style={{ marginLeft: `${2 * depth}rem` }}>
          {item.children.length !== 0 ? (
            stopPropagation.includes(item.key) ? (
              <ChevronRightIcon onClick={() => handleExpand(item)} />
            ) : (
              <ChevronDownIcon onClick={() => handleExpand(item)} />
            )
          ) : null}
          {
            <span
              style={{ cursor: "pointer" }}
              onClick={() => handleSelect(item.key)}
              className={chosenDirectory.key === item.key ? "active" : ""}
            >
              {item.value}
            </span>
          }
        </Box>

        {item.children.length !== 0 && !stopPropagation.includes(item.key)
          ? item.children.map((subitem) =>
              handleDirectories(subitem, depth + 1)
            )
          : null}

        {edit && item.key === temporaryNode.parentKey
          ? handleTemporary(temporaryNode, depth + 1)
          : null}
      </Box>
    );
  };

  const handleTemporary = (node, depth) => {
    return (
      <div key={node.key}>
        <span style={{ marginLeft: `${2 * depth}rem` }}>
          <input
            ref={Ref}
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleEnter}
            onBlur={handleBlur}
          />
        </span>
      </div>
    );
  };

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Directory
            </AlertDialogHeader>

            <AlertDialogBody>
              <VStack gap={2} mb={4}>
                <Text>
                  The following directories will be deleted:
                </Text>
                <Box color="red.500" textDecoration="line-through">
                  {filter.map((item, idx) => (
                    <span key={idx}>{item}</span>
                  ))}
                </Box>
              </VStack>
              <VStack gap={2} mb={4}>
                <Text>Every deal will be automatically moved to directory:</Text>
                <Box color="green.400">{findParentNode(chosenDirectory, directories).value}</Box>
              </VStack>
              <Heading size="sm">Are you sure? You can't undo this action afterwards!</Heading>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <VStack
        w="100%"
        h="100%"
        border="2px"
        borderColor="green.700"
        borderRadius="0.5rem"
        p={3}
        gap={6}
      >
        <ButtonGroup w="100%">
          <Tooltip label="Add new folder" aria-label="A tooltip">
            <Button
              onClick={handleAddDirectory}
              isDisabled={!chosenDirectory.key ? true : false}
            >
              <AddIcon />
            </Button>
          </Tooltip>
          <Tooltip label="Remove folder" aria-label="A tooltip">
            <Button
              onClick={onOpen}
              isDisabled={chosenDirectory.key === "0" ? true : false}
            >
              <DeleteIcon />
            </Button>
          </Tooltip>
        </ButtonGroup>
        <Box w="100%">{handleDirectories(directories[0], 0)}</Box>
      </VStack>
    </>
  );
};

export default DealNavigator;
