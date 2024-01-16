import {
  Container,
  Flex,
  Image,
  Text,
  VStack,
  HStack,
  Heading,
  Tag,
  TagLabel,
  Table,
  Td,
  Tr,
  Tbody,
  TableContainer,
} from "@chakra-ui/react";
import useFetch from "../hooks/useFetch";
import DifficultyPlot from "../components/DifficultyPlot";

const Profile = () => {
  const [stats, error, loading] = useFetch("api/my_comments/get_statistics");
  const [profile, error2, loading2] = useFetch("api/profile_data")

  console.log(profile);

  return (
    <Container
      maxW="1000px"
      borderWidth="4px"
      borderColor="green.500"
      borderRadius="1rem"
      mt={6}
      p={8}
    >
      <Flex
        alignItems="center"
        justifyContent="space-around"
        gap={10}
        flexDirection="row"
      >
        <Flex flexDirection="column" borderWidth='4px' borderColor='green.400' borderRadius='1rem' p={8} bgColor='green.700'>
          {!loading2 ? <>
          <Image
            borderRadius="full"
            boxSize="300px"
            src={profile.image_url}
            alt="Avatar"
            objectFit='cover'
            mb={4}
          />
          <VStack w="100%" alignItems="center" gap={4}>
            <Text>username: {profile.username}</Text>
            <Text>e-mail: {profile.user}</Text>
          </VStack>
          </> : null
          }
        </Flex>

        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p={4}
        >
          <Heading size="md" mb={4}>
            STATISTICS
          </Heading>
          {!loading ? (
            <>
              <Flex w="300px" h="300px" p={1}>
                <DifficultyPlot
                  difficulty_data={stats.difficulty_distribution}
                />
              </Flex>
              <Flex
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mt={3}
                borderWidth="4px"
                borderColor="green.400"
                borderRadius="1rem"
                p={3}
                w="300px"
              >
                <Text>Most popular Tags:</Text>
                <HStack mt={3}>
                  {stats.most_common_tags.map((item, idx) => (
                    <Tag
                      size="lg"
                      key={idx}
                      borderRadius="full"
                      variant="solid"
                      colorScheme="green"
                    >
                      <TagLabel>{item.tags__name}</TagLabel>
                    </Tag>
                  ))}
                </HStack>
              </Flex>
              <Flex
                alignItems="center"
                justifyContent="center"
                mt={3}
                borderWidth="4px"
                borderColor="green.400"
                borderRadius="1rem"
                p={3}
                w="300px"
              >
                <TableContainer>
                  <Table variant="simple">
                    <Tbody>
                      <Tr>
                        <Td># of saved deals</Td>
                        <Td>{stats.all_deals}</Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </TableContainer>
              </Flex>
            </>
          ) : null}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Profile;
