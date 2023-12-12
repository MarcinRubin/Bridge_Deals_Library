import MyDealListElement from "../components/MyDealListElement";
import client from "../hooks/axiosClient";
import { useLoaderData, useOutletContext } from "react-router-dom";

export async function loader() {
  try{
      const response = await client.get("/api/comments/my_comments");
      //console.log(response.data);
      return response.data;
  }
  catch(err){
      console.log(err.message);
  }
  return [];
};

const MyDeals = () => {

  const deals = useLoaderData();
  //const user = useOutletContext();

  return (
    <div className="all-deals-container">
    {Object.keys(deals).length !== 0 && deals.map( (item) => (
      <MyDealListElement
        myDeal = {item}
        key = {item.id}
      />
    ))
    }
  </div>
  )
}

export default MyDeals
