import { SimpleGrid, Box, VStack, Text, Flex } from "@chakra-ui/react";

const DealCreator = ({deal, size}) => {

    const scaler = {
        width: {
            medium: "110px",
            small: "80px",
        },
        height: {
            medium: "110px",
            small: "80px",
        },
        fontSize: {
            medium: "1rem",
            small: "0.70rem"
        },
        padding: {
            medium: "4px",
            small: "2px"
        }
    }

    const suits = ["spade", "heart", "diamond", "club"];
    const color = ["Spades", "Hearts", "Diamonds", "Clubs"]

    const singleCellStyle = {
        bg: 'green.700',
        h: scaler.height[size],
        w: scaler.width[size],
        alignItems: 'left',
        gap: "1px",
        justifyContent: "center",
        p: "2px"
    }

  return (
    <SimpleGrid columns={3} spacing={1} fontSize={scaler.fontSize[size]}>
        <Flex alignItems="center" justifyContent="center" bg= 'green.700' fontSize="2em" w={scaler.width[size]} h={scaler.height[size]}>
            <Text>{deal.dealer}</Text>
        </Flex>
        <VStack sx={singleCellStyle}>{
                color.map( (item, idx) => (
                    <span key={idx}><i className={`bi bi-suit-${suits[idx]}-fill`}></i>{deal.N[item]}</span>
                ))
            }</VStack>
        <Box sx={singleCellStyle}></Box>
        <VStack sx={singleCellStyle}>
        {
                color.map( (item, idx) => (
                    <span key={idx}><i className={`bi bi-suit-${suits[idx]}-fill`}></i>{deal.W[item]}</span>
                ))
            }

        </VStack>
        <Flex justifyContent="space-between" alignItems="center" flexDirection="column" p={scaler.padding[size]} w={scaler.width[size]} h={scaler.height[size]}>
            <Flex alignItems="center" justifyContent="center">
                    <Text border="2px" borderColor={deal.vulnerability[0] ? "red" : "green.400"} borderRadius="1em" w="2em" h="2em"textAlign="center">N</Text>
            </Flex>
            <Flex w="100%" alignItems="center" justifyContent="space-between">
                <Text border="2px" borderColor={deal.vulnerability[1] ? "red" : "green.400"} borderRadius="1em" w="2em" h="2em"textAlign="center">W</Text>
                <Text border="2px" borderColor={deal.vulnerability[1] ? "red" : "green.400"} borderRadius="1em" w="2em" h="2em"textAlign="center">E</Text>
            </Flex>
            <Flex justifyContent="center" alignItems="center">
            <Text border="2px" borderColor={deal.vulnerability[0] ? "red" : "green.400"} borderRadius="1em" w="2em" h="2em"textAlign="center">S</Text>
            </Flex>
        </Flex>
        <VStack sx={singleCellStyle}>
        {
                color.map( (item, idx) => (
                    <span key={idx}><i className={`bi bi-suit-${suits[idx]}-fill`}></i>{deal.E[item]}</span>
                ))
            }
        </VStack>
        <Box sx={singleCellStyle}></Box>
        <VStack sx={singleCellStyle}>
        {
                color.map( (item, idx) => (
                    <span key={idx}><i className={`bi bi-suit-${suits[idx]}-fill`}></i>{deal.S[item]}</span>
                ))
            }
        </VStack>
        <Box sx={singleCellStyle}></Box>
    </SimpleGrid>

  )
}

export default DealCreator
