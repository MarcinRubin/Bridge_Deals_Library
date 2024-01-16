import client from "./hooks/axiosClient";
import { Outlet} from "react-router-dom";
import { redirect, useLoaderData } from "react-router-dom";
import Header from "./components/Header";

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
    <>
    <Header
        profile = {profile}
        profile_pic = {profile_pic}
      />
    <div className="main-page-container">
      <Outlet context={[profile, profile_pic]}/>
    </div>
    </>
  )
}

export default App;
