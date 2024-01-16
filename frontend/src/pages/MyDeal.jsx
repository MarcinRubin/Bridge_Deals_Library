import { redirect, useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import client from "../hooks/axiosClient";
import { useNavigate } from "react-router-dom";
import DealCreator from "../components/DealCreator";
import DealCreatorInterface from "../components/DealCreatorInterface";
import ResultTable from "../components/ResultTable";
import TrickTable from "../components/TrickTable";
import {
  Container,
  Flex,
  Select as ChakraSelect,
  Input,
  Textarea,
  VStack,
  Button,
} from "@chakra-ui/react";
import Select from "react-select";

export async function loader({params}) {
  const deal_id = params.dealId;
  try{
      const response = await client.get(`/api/my_comments/${deal_id}/`);
      return [response.data, deal_id];
  }
  catch{
      console.log("Some kind of error in backend functionality");
  }
  return [];
};


const MyDeal = ({}) => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await client.get("/api/tags/");
        const tags = response.data.map((item) => ({
          value: item.name,
          label: item.name,
        }));
        setTags(tags);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTags();
  }, []);

  const [loaded_comment, deal_id] = useLoaderData();

  const [tags, setTags] = useState([]);
  const [currentTags, setCurrentTags] = useState(loaded_comment.tags.map( (item) => { return { "value": item, "label": item }}));
  const [deal, setDeal] = useState(loaded_comment.deal);

  const [comment, setComment] = useState({
    visibility: loaded_comment.visibility,
    difficulty: loaded_comment.difficulty,
    body: loaded_comment.body
  });

  console.log(loaded_comment);

  const handleUpdateDeal = async () => {
    try {
      console.log("lala");
      const newComment = {
        ...comment,
        tags: currentTags.map((item) => item.value),
      };
      const response = await client.patch(`/api/my_comments/${deal_id}/`, {
        ...newComment,
      });
      console.log(response);
      navigate("/mydeals");
    } catch (err) {
      console.log("Error");
    }
  };

  const handleChangeTitle = (e) => {
    const newDeal = { ...deal, name: e.target.value };
    setDeal(newDeal);
  };

  return (
      <Container maxW="900px" mt={5}>
        <Flex
          border="2px"
          borderColor="gray.500"
          alignItems="center"
          borderRadius="1rem"
          justifyContent="space-around"
          wrap="wrap"
          p={5}
          gap={2}
          mb={5}
        >
          <DealCreator deal={deal.deal_info} size="medium" />
          <DealCreatorInterface deal={deal} setDeal={setDeal} isDisabled={true}/>
        </Flex>

        <Flex
          border="2px"
          borderColor="gray.500"
          p={5}
          mb={5}
          borderRadius="1rem"
          alignItems="flex-start"
          justifyContent="center"
          gap={4}
          wrap="wrap"
          >
              {deal.result_table ?
              <ResultTable
                result_table = {deal.result_table}
                />
              : null}
              {deal.trick_table ?
              <TrickTable
                trick_table = {deal.trick_table}
                />
              : null}
        </Flex>

        <Flex
          border="2px"
          borderColor="gray.500"
          p={5}
          mb={5}
          borderRadius="1rem"
        >
          <Select
            styles={{
              container: (baseStyles, state) => ({
                ...baseStyles,
                color: "black",
                width: "75%",
              }),
              control: (baseStyles, state) => ({
                ...baseStyles,
                backgroundColor: "#1A202C",
                ":focus": {
                  border: "1px white solid",
                },
              }),
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: "rgba(255, 255, 255, 0.92)",
                backgroundColor: "#2D3748",
                ":hover": {
                  backgroundColor: "#718096",
                },
              }),
              menu: (baseStyles, state) => ({
                ...baseStyles,
                color: "rgba(255, 255, 255, 0.92)",
                backgroundColor: "#2D3748",
                border: "2px solid white",
              }),
              multiValue: (baseStyles, state) => ({
                ...baseStyles,
                color: "rgba(255, 255, 255, 0.92)",
                backgroundColor: "#2F855A",
                border: "1px solid white",
                borderRadius: "0.75rem",
              }),
              multiValueLabel: (baseStyles, state) => ({
                ...baseStyles,
                color: "rgba(255, 255, 255, 0.92)",
                fontSize: "1.1rem",
              }),
              multiValueRemove: (baseStyles, state) => ({
                ...baseStyles,
                color: "rgba(255, 255, 255, 0.92)",
                ":hover": {
                  backgroundColor: "#276749",
                },
              }),
            }}
            defaultValue={currentTags}
            onChange={setCurrentTags}
            isMulti
            name="colors"
            options={tags}
            className="basic-multi-select"
            classNamePrefix="select"
          />

          <ChakraSelect
            placeholder="Difficulty"
            w="25%"
            value={comment.difficulty}
            onChange={(e) => {
              const newComment = { ...comment, difficulty: e.target.value };
              setComment(newComment);
            }}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </ChakraSelect>
        </Flex>
        <VStack border="2px" borderColor="gray.500" p={5} borderRadius="1rem">
          <Input
            value={deal.name}
            onChange={handleChangeTitle}
            placeholder="Title"
          />
          <Textarea
            value={comment.body}
            onChange={(e) => {
              const newComment = { ...comment, body: e.target.value };
              setComment(newComment);
            }}
            placeholder="Your comment"
          />
        </VStack>
        <Flex justifyContent="flex-end" mt={1}>
          <Button
            bg="green.700"
            _hover={{
              bg: "green.600",
            }}
            onClick={handleUpdateDeal}
          >
            UPDATE
          </Button>
        </Flex>
      </Container>
  );
};

export default MyDeal
