import Header from "../components/Header";
import { Outlet} from "react-router-dom";
import { redirect, useLoaderData } from "react-router-dom";
import client from "../hooks/axiosClient";

export async function loader() {
    const session = await client.get("/api/active_session");
    if (!session.data.isAuthenticated){
      return redirect("/login");
    }
    //console.log(session.data);
    return session.data;
};


const MainPage = ({}) => {

  const {user, profile_pic} = useLoaderData();
  return (
    <>
      <Header
        user = {user}
        profile_pic = {profile_pic}
      />

    <div className="main-page-container">
      <Outlet context={user}/>
    </div>
    </>
  )
}

export default MainPage
