import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import client from "../hooks/axiosClient";
import {
  Container,
  Heading,
  VStack,
  Input,
  Select,
  Button,
  Flex
} from "@chakra-ui/react";

export async function loader() {
  try {
    console.log("loading tournamnets");
    const response = await client.get("/api/tournaments/");
    return response.data;
  } catch {
    console.log("Some kind of error in backend functionality");
  }
  return [];
}

const CreateDealSetFromLink = () => {
  const [link, setLink] = useState("");
  const [tournament, setTournament] = useState("");
  const tournaments = useLoaderData();
  const [isPending, setIsPending] = useState(false);

  const handleLoad = async () => {
    try {
      const response = await client.post("api/scrap_tournament/", {
        url: link,
      });
      setIsPending(true);
      console.log(response.data);
    } catch (err) {
      console.log("ERROR");
    }
  };

  return (
    <Container mt={8}>
      {isPending ? <Heading size="sm">
         Your request has been accepted!
        </Heading> :
      <VStack gap={4}>
        <Heading size="sm">
          Write down the link to the tournament and tournament series
        </Heading>
        <Input value={link} onChange={(e) => setLink(e.target.value)}></Input>

        <Select
          placeholder="Select Tournament series"
          value={tournament.series}
          onChange={(e) => setTournament(e.target.value)}
        >
          {tournaments.map((item, idx) => (
            <option key={idx} value={item.series}>
              {item.series}
            </option>
          ))}
        </Select>
        <Button onClick={handleLoad}>LOAD</Button>
      </VStack>}
    </Container>
  );
};

export default CreateDealSetFromLink;
