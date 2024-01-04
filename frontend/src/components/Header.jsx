import {
  Flex,
  Box,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Link as ChakraLink,
  Avatar,
} from "@chakra-ui/react";
import { ChevronDownIcon, AddIcon, LinkIcon, PlusSquareIcon } from "@chakra-ui/icons";
import client from "../hooks/axiosClient";
import { Link as ReactRouterLink } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Header = ({ profile, profile_pic }) => {

    const handleLogout = async (e) =>{
        e.preventDefault;
        try{
          const response = await client.post("/api/logout/");
          Navigate("/login");
        }
        catch(err){
          console.log(err);
        }
      }

    const linkStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    px: 4,
    _hover: {
      backgroundColor: "green.600",
    },
    borderRadius: "md",
  };

  const menuItemStyle= {
    backgroundColor: "green.700",
    _hover: {
        backgroundColor: "green.600",
      },
  }

  return (
    <Flex
      className="my-box"
      flexDirection="row"
      bg="green.700"
      h="70px"
      px="2"
      justifyContent="space-between"
    >
      <HStack spacing="3" h="100%">
        <Box color="black" width="56px">
          LOGO
        </Box>
        <HStack as="nav" gap="0" h="100%">
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<ChevronDownIcon />}
              bg="green.700"
              h="100%"
              _hover={{
                bg: "green.600",
              }}
              _active={{
                bg: "green.600",
              }}
            >
              Create Deal
            </MenuButton>
            <MenuList backgroundColor="green.700">
              <MenuItem as={ReactRouterLink} to="/create" icon={<AddIcon />} sx={menuItemStyle}>Custom</MenuItem>
              <MenuItem as={ReactRouterLink} to="/link_create" icon={<LinkIcon/>}sx={menuItemStyle}>From Link</MenuItem>
              <MenuItem as={ReactRouterLink} to="/batch_create" icon={<PlusSquareIcon/>}sx={menuItemStyle}>From Tournament</MenuItem>
            </MenuList>
          </Menu>
          <ChakraLink sx={linkStyle} as={ReactRouterLink} to="/mydeals">
            My Deals
          </ChakraLink>
          <ChakraLink sx={linkStyle} as={ReactRouterLink} to="/all_deals">
            All Deals
          </ChakraLink>
        </HStack>
      </HStack>
      <HStack>
        <Box as="span">Hello {profile}!</Box>
        <Menu>
          <MenuButton
            borderRadius="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            padding="2px"
            _hover={{
              bg: "green.600",
            }}
            _active={{
              bg: "green.600",
            }}
          >
            <Avatar size="lg" src={profile_pic} />
          </MenuButton>
          <MenuList bg="green.700">
            <MenuItem sx={menuItemStyle}><i className="bi bi-person-fill"></i><span style={{"marginLeft": "0.75rem"}}>Profile</span></MenuItem>
            <MenuItem sx={menuItemStyle} onClick={handleLogout}><i className="bi bi-box-arrow-left"></i><span style={{"marginLeft": "0.75rem"}}>Logout</span></MenuItem>
          </MenuList>
        </Menu>
      </HStack>
    </Flex>
  );
};

export default Header;
