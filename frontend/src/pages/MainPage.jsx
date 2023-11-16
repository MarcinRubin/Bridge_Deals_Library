import Header from "../components/Header";
import AllDeals from "../components/AllDeals";

const MainPage = ({setActiveSession, client, user}) => {

  return (
    <>
      <Header
        user = {user}
        setActiveSession = {setActiveSession}
        client = {client}
      />
      <AllDeals
        client = {client}
      />
    </>
  )
}

export default MainPage
