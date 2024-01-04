import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  VStack,
  Heading
} from "@chakra-ui/react";

const ResultTable = ({result_table}) => {

  const suits_map = {
    H: "heart",
    S: "spade",
    D: "diamond",
    C: "club",
    NT: "non-trump",
  };

  return (
    <VStack>
      <Heading size="md">Result Table</Heading>
    <TableContainer bg="green.900">
      <Table variant='striped' colorScheme='green'>
        <Thead>
          <Tr>
            <Th>Contract</Th>
            <Th>Player</Th>
            <Th>Lead</Th>
            <Th>Result</Th>
          </Tr>
        </Thead>
        <Tbody>
          {result_table.map((row, idx) => (
            <Tr key={idx}>
              <Td>
                {row.height}
                <i className={`bi bi-suit-${suits_map[row.suit]}-fill`} />
                {row.double}{" "}
              </Td>
              <Td>{row.player}</Td>
              <Td>
                <i className={`bi bi-suit-${suits_map[row.lead_suit]}-fill`} />
                {row.lead_card}
              </Td>
              <Td>{row.overtricks === 0 ? "=" : (row.overtricks > 0) ? ("+" + row.overtricks) : (row.overtricks) }</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      </TableContainer>
      </VStack>
  );
};

export default ResultTable;
