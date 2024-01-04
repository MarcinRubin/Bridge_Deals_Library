import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  VStack} from "@chakra-ui/react";

const TrickTable = ({trick_table}) => {

  const suits_map = ["non-trump", "spade", "heart", "diamond", "club"];

  const suit_order = ["Nt", "Spades", "Hearts", "Diamonds", "Clubs"];

  return (
    <VStack>
    <Heading size="md">Trick Table</Heading>
    <TableContainer bg="green.900">
      <Table variant="striped" colorScheme="green">
        <Thead>
          <Tr>
            <Th></Th>
            {suits_map.map((suit, idx) => (
              <Th key={idx}>
                <i className={`bi bi-suit-${suit}-fill`} />
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>N</Td>
            {suit_order.map((item, idx) => (
                <Td key={idx}>{trick_table.NTricks[item]}</Td>
            ))}
        </Tr>
        <Tr>
            <Td>S</Td>
            {suit_order.map((item, idx) => (
                <Td key={idx}>{trick_table.STricks[item]}</Td>
            ))}
        </Tr>
        <Tr>
            <Td>W</Td>
            {suit_order.map((item, idx) => (
                <Td key={idx}>{trick_table.WTricks[item]}</Td>
            ))}
        </Tr>
        <Tr>
            <Td>E</Td>
            {suit_order.map((item, idx) => (
                <Td key={idx}>{trick_table.ETricks[item]}</Td>
            ))}
          </Tr>
        </Tbody>
      </Table>
      </TableContainer>
      </VStack>
  );
};

export default TrickTable;
