import { useState } from "react";
import client from "../hooks/axiosClient";
import { useNavigate, Link, redirect } from "react-router-dom";
import {
  Container,
  FormControl,
  FormLabel,
  Input,
  Text,
  Button,
  Heading,
  Flex,
} from "@chakra-ui/react";

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [registerError, setRegisterError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await client.post("/api/register/", {
        email: email,
        password: password,
        confirm_password: password2,
      });
      navigate("/login");
    } catch (err) {
      const response = JSON.parse(err.request.response);
      const err_msg = Object.values(response)[0];
      setRegisterError(
        err_msg[0].charAt(0).toUpperCase() + err_msg[0].slice(1)
      );
    }
  };

  return (
    <Container maxW="400px" h="100vh" centerContent justifyContent="center">
      <Flex
        border="2px"
        borderColor="white"
        borderRadius="1rem"
        p={8}
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <form onSubmit={handleRegister}>
          <FormControl>
            <Heading textAlign='center' mb={4}>Register Now!</Heading>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter Email"
              name="email"
              autoComplete="off"
              required
              onChange={(e) => setEmail(e.target.value)}
              mb={4}
            />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              mb={4}
            />
            <FormLabel>Confirm password</FormLabel>
            <Input
              type="password"
              placeholder="Enter Password"
              name="password2"
              required
              onChange={(e) => setPassword2(e.target.value)}
              mb={4}
            />
            <Flex w='100' justifyContent='center' alignItems='center'>
            <Button type="submit" colorScheme="green" mb={4}>Register</Button>
            </Flex>
            {registerError && (
              <Text as ='span' className="error-message">{registerError}</Text>
            )}
            <Text>
              Have an account already? <Link to={"/login"}><Text as='span' color='green.500' _hover={{'color': 'green.400'}}>Login Now!</Text></Link>
            </Text>
            </FormControl>
        </form>
      </Flex>
    </Container>
  );
};

export default RegisterForm;
