import { redirect, useLoaderData } from "react-router-dom";
import client from "../hooks/axiosClient";

export async function loader({params}) {
    const deal_id = params.dealId;
    try{
        const response = await client.get(`/api/comments/${deal_id}`);
        return response.data;
    }
    catch{
        console.log("Some kind of error in backend functionality");
    }
    return [];
};


const MyDeal = () => {

    const deal = useLoaderData();

  return (
    <div>
        <h1 style={{"color": "red"}}>{deal.name}</h1>
        {
            Object.keys(deal).map((item, idx) =>(
                <div key={idx}>{item}</div>
            ))
        }
    </div>
  )
}

export default MyDeal
