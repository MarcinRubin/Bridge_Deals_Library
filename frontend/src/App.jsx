import client from "./hooks/axiosClient";
import { Outlet} from "react-router-dom";
import { redirect, useLoaderData } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "@chakra-ui/react";

export async function loader() {
  try{
    const token_retrieve = await client.get("/api/csrf_cookie/");
    const session = await client.get("/api/active_session");
    if (!session.data.isAuthenticated){
      return redirect("/login");
    }
    return session.data;
  } catch(err) {
    return redirect("/login");
  }
}

function App() {

  const {profile, profile_pic} = useLoaderData();
  return (
    <Container Container maxW="100%" display="flex" flexDirection="column" gap={0} p={0} m={0} justifyContent="flex-start" alignItems="center">
    <Header
        profile = {profile}
        profile_pic = {profile_pic}
      />
      <Outlet context={[profile, profile_pic]}/>
    </Container>
  )
}

export default App;
