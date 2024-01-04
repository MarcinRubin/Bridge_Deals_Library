import DealCreator from "./DealCreator";
import TagsContainer from "./TagsContainer";
import { useNavigate } from "react-router-dom";
import DeleteDealButton from "./DeleteDealButton";
import MoveDealButton from "./MoveDealButton";
import { useRef } from "react";
import client from "../hooks/axiosClient";
import {
  Card,
  CardBody,
  CardFooter,
  VStack,
  Flex,
  ButtonGroup,
  Button,
  Text,
  Divider,
  Tooltip,
  Heading,
  Box,
} from "@chakra-ui/react";

const MyDealListElement = ({
  myDeal,
  allDirectories,
  handleChangeDealsList,
  handleRemoveFromDealList,
}) => {
  const navigate = useNavigate();
  const deal = myDeal.deal;


  const handleClick = () => {
    return navigate(`/mydeals/${myDeal.id}`);
  };

  const handleDealMove = async (newDirectory) => {
    try {
      const response = await client.patch(`/api/my_comments/${myDeal.id}/`, {
        directory: newDirectory,
      });
      handleChangeDealsList(myDeal.id, newDirectory);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDealDelete = async () => {
    try {
      const response = await client.delete(`/api/my_comments/${myDeal.id}/`);
      handleRemoveFromDealList(myDeal.id);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <Card maxW="md" p={4} bg="gray.800" border="2px" borderColor="green.700">
        <CardBody>
          <VStack gap={2}>
            <Box cursor="pointer" _hover={{"transform": "scale(1.05)" }} onClick={handleClick}>
              <DealCreator deal={deal.deal_info} size="small" />
            </Box>
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
              s
              px={2}
              w="100%"
            >
              <Heading size="sm">{deal.name}</Heading>
              <ButtonGroup>
                <MoveDealButton handleDealMove={handleDealMove} allDirectories={allDirectories}/>
                <DeleteDealButton handleDealDelete={handleDealDelete}/>
              </ButtonGroup>
            </Flex>
            <Divider />
            <Flex
              alignItems="center"
              justifyContent="space-between"
              flexDirection="row"
              w="100%"
            >
              <TagsContainer tags={myDeal.tags} />
              <Box>diff: {myDeal.difficulty}</Box>
            </Flex>
          </VStack>
        </CardBody>
        <CardFooter
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          fontSize="10px"
        >
          <Text>{deal.author}</Text>
          <Text>{deal.created_at.substring(0, 10)}</Text>
        </CardFooter>
      </Card>
    </>
  );
};

export default MyDealListElement;
