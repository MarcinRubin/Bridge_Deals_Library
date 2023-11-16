import DealCreator from "../components/DealCreator"
import { useState } from "react"

const NewDeal = () => {
  const [deal, setDeal] = useState({
    N: "",
    S: "",
    W: "",
    E: "",
    vul: "",
    player: ""
  });

  const handleChange = (e) =>{
    e.preventDefault;
    const player = e.target.dataset.player;
    const new_deal = {...deal, [player]: e.target.value};
    setDeal(new_deal)
    console.log(e.target.dataset.player);
  }

  console.log(deal);

  return (
  <>
    <DealCreator
      deal = {deal}
    />
    <div className="deal-creator-container">
      <span>N<input data-player="N" onChange={handleChange}></input></span>
      <span>S<input data-player="S" onChange={handleChange}></input></span>
      <span>W<input data-player="W" onChange={handleChange}></input></span>
      <span>E<input data-player="E" onChange={handleChange}></input></span>
      <span>Vulnerable<input data-player="vul" onChange={handleChange}></input></span>
      <span>Player<input data-player="player" onChange={handleChange}></input></span>
    </div>
  </>
  )
}

export default NewDeal
