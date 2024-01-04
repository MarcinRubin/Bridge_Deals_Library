import React from "react";
import {
  Input,
  VStack,
  HStack,
  Checkbox,
  InputGroup,
  InputLeftAddon,
  Flex,
  Text,
  Radio,
  RadioGroup,
  CheckboxGroup,
} from "@chakra-ui/react";

const DealCreatorInterface = ({ deal, setDeal, isDisabled }) => {

  const handleChange = (e, player) => {
    const hand = e.target.value;
    const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    const new_hand = ["", "", "", ""];

    hand.split(".").map((item, idx) => {
      new_hand[idx] = item;
    });

    const new_hand_obj = Object.fromEntries(
      suits.map((item, idx) => [item, new_hand[idx]])
    );

    const new_deal_info = { ...deal.deal_info, [player]: new_hand_obj };
    setDeal({ ...deal, deal_info: new_deal_info });
  };

  const handleChangeVul = (index) => {
    const new_vul_state = [...deal.deal_info.vulnerability];
    new_vul_state[index] = !new_vul_state[index];
    const new_deal_info = { ...deal.deal_info, vulnerability: new_vul_state };
    setDeal({ ...deal, deal_info: new_deal_info });
  };

  const handleChangePlayer = (value) => {
    const new_deal_info = { ...deal.deal_info, dealer: value};
    setDeal({ ...deal, deal_info: new_deal_info });
  };

  return (
    <Flex direction="column">
      <VStack spacing={4}>
        <InputGroup>
          <InputLeftAddon w="45px" bg="green.700">N</InputLeftAddon>
          <Input
            value={Object.values(deal.deal_info.N).join(".")}
            onChange={(e) => handleChange(e, "N")}
            isDisabled={isDisabled}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon w="45px" bg="green.700">S</InputLeftAddon>
          <Input
            value={Object.values(deal.deal_info.S).join(".")}
            onChange={(e) => handleChange(e, "S")}
            isDisabled={isDisabled}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon w="45px" bg="green.700">E</InputLeftAddon>
          <Input
            value={Object.values(deal.deal_info.E).join(".")}
            onChange={(e) => handleChange(e, "E")}
            isDisabled={isDisabled}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftAddon w="45px" bg="green.700">W</InputLeftAddon>
          <Input
            value={Object.values(deal.deal_info.W).join(".")}
            onChange={(e) => handleChange(e, "W")}
            isDisabled={isDisabled}
          />
        </InputGroup>
      </VStack>

      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Text p={2}> Vulnerability</Text>
        <CheckboxGroup defaultValue={["NS", "EW"].filter((item, idx) => deal.deal_info.vulnerability[idx])} isDisabled={isDisabled}>
        <HStack spacing={1}>
          <Checkbox
            colorScheme="green"
            value="NS"
            onChange={() => handleChangeVul(0)}
          >
            NS
          </Checkbox>
          <Checkbox
            colorScheme="green"
            value="EW"
            onChange={() => handleChangeVul(1)}
          >
            EW
          </Checkbox>
        </HStack>
        </CheckboxGroup>
      </Flex>

      <Flex flexDirection="column" alignItems="center" justifyContent="center">
        <Text p={2}>Player</Text>
        <RadioGroup onChange={handleChangePlayer} value={deal.deal_info.dealer} isDisabled={isDisabled}>
          <HStack direction="row">
            <Radio
              colorScheme="green"
              value="N"
            >
              N
            </Radio>
            <Radio
              colorScheme="green"
              value="S"
            >
              S
            </Radio>
            <Radio
              colorScheme="green"
              value="E"
            >
              E
            </Radio>
            <Radio
              colorScheme="green"
              value="W"
            >
              W
            </Radio>
          </HStack>
        </RadioGroup>
      </Flex>
    </Flex>
  );
};

export default DealCreatorInterface;
