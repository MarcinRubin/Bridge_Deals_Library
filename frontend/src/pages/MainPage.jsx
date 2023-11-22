import { useState } from "react";
import Header from "../components/Header";
import AllDeals from "./AllDeals";
import NewDeal from "./NewDeal";


const MainPage = ({setActiveSession, client, user}) => {

  const [option, setOption] = useState("all");

  const query_selector = "my_deals"
  return (
    <>
      <Header
        user = {user}
        setActiveSession = {setActiveSession}
        client = {client}
        setOption = {setOption}
      />

    <div className="main-page-container">
      {option === '1' && <NewDeal
        client = {client}
      />}
      {option === '2' && <AllDeals
        client = {client}
        query_selector = {""}
      />}
      {option === '3' && <AllDeals
        query_selector={query_selector}
        client = {client}
      />}
      {option === '4' && <div>Option 4</div>}
    </div>
    </>
  )
}

export default MainPage
