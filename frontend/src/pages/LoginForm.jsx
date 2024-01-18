import { useState } from "react";
import { useNavigate, Link, redirect } from "react-router-dom";
import client from "../hooks/axiosClient";
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

export async function loader() {
  const session = await client.get("/api/active_session");
  if (session.data.isAuthenticated) {
    return redirect("/");
  }
  return session.data;
}

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const retrieve_csrf_cookie = await client.get("/api/csrf_cookie/");
      const response = await client.post("/api/login/", {
        email: email,
        password: password,
      });
      navigate("/");
    } catch (err) {
      setLoginError(true);
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
        <form onSubmit={handleLogin}>
          <FormControl>
            <Heading textAlign="center" mb={4}>
              Please sign in
            </Heading>
            <FormLabel htmlFor="email">Email</FormLabel>
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
            <Flex
              width="100%"
              justifyContent="center"
              alignItems="center"
              mb={4}
            >
              <Button type="submit" colorScheme="green">
                Login
              </Button>
            </Flex>
            {loginError ? <Text color='red.500'>
              Invalid login and/or password! Try again!
            </Text> : null}
          </FormControl>
        </form>
        <Text>
          Don't have an account?{" "}
          <Link to={"/register"}>
            <Text as="span" color="green.500" _hover={{ color: "green.400" }}>
              Register Now!
            </Text>
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

export default LoginForm;
