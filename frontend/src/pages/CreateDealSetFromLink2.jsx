import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import client from "../hooks/axiosClient";

export async function loader() {
  try {
    console.log("loading tournamnets");
    const response = await client.get("/api/tournaments/");
    return response.data;
  } catch {
    console.log("Some kind of error in backend functionality");
  }
  return [];
}

const CreateDealSetFromLink = () => {
  const [link, setLink] = useState("");
  const [tournament, setTournament] = useState("");
  const tournaments = useLoaderData();
  console.log(tournament);

  const handleLoad = async () => {
    try {
      const response = await client.post("api/scrap_tournament/", {
        url: link,
      });
      console.log(response.data);
    } catch (err) {
      console.log("ERROR");
    }
  };

  return (
    <div className="new-deal-container">
      <div className="new-deal-container-first-row">
        CreateDealSetFromLink
        <input value={link} onChange={(e) => setLink(e.target.value)} />
        <button onClick={handleLoad}>LOAD</button>
        <div>
          <label htmlFor="tournaments">Choose tournament series:</label>
          <select
            value={tournament.series}
            onChange={(e) =>setTournament(e.target.value)}
          >
            {tournaments.map((item, idx) => (
              <option key={idx} value={item.sries}>{item.series}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default CreateDealSetFromLink;
