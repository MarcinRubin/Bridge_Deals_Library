import { useState, useEffect } from "react"
import DealListElement from "../components/DealListElement";


const AllDeals = ({client, query_selector}) => {
  console.log(query_selector);

  const [deals, setDeals] = useState({})

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await client.get("/api/deals/");
        setDeals(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchDeals();
  }, []);


  return (
    <div className="all-deals-container">
    {Object.keys(deals).length !== 0 && deals.map( (item, idx) => (
      <DealListElement
        deal = {item}
        key ={idx}
      />
    ))
  }
  </div>
  )
}

export default AllDeals
