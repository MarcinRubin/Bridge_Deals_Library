import { useState } from "react";
import NewDeal from "../pages/NewDeal";

const AllDeals = ({ client }) => {
  const [option, setOption] = useState("all")


  const handleLoadDeals = async (e) => {
    e.preventDefault;
    try {
      const response = await client.get("api/deals/");
      if (response.status !== 200)
        throw new Error("Response status is not 200");
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOptionChange = (e) =>{
    e.preventDefault;
    setOption(e.target.value);
  }

  return(
    <>
    <div className="test-container">
      <button value="1" onClick={handleOptionChange}>Show all deals</button>
      <button value="2" onClick={handleOptionChange}>Create Deal</button>
      <button value="3" onClick={handleOptionChange}>Show only the user deals</button>
      <button value="4" onClick={handleOptionChange}>Deal detail</button>
    </div>

    <div className="test-container2">
      {option === '1' && <div> Option 1</div>}
      {option === '2' && <NewDeal
        client = {client}
      />}
      {option === '3' && <div>Option 3</div>}
      {option === '4' && <div>Option 4</div>}
    </div>

  </>
  );
};

export default AllDeals;
