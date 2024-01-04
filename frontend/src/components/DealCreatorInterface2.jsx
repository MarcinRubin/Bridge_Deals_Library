import React from 'react'


const DealCreatorInterface2 = ({deal, setDeal}) => {

    const handleChange = (e) => {
        const player = e.target.dataset.player;
        const hand = e.target.value;
        const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
        const new_hand = ["", "", "", ""];

        hand.split(".").map((item, idx) => {
          new_hand[idx] = item;
        });

        const new_hand_obj = Object.fromEntries(
          suits.map((item, idx) => [item, new_hand[idx]])
        );

        const new_deal_info = { ...deal.deal_info, [player]: new_hand_obj };
        setDeal({ ...deal, deal_info: new_deal_info });
      };

      const handleChangeVul = (index) => {
        const new_vul_state = [...deal.deal_info.vulnerability];
        new_vul_state[index] = !new_vul_state[index];
        const new_deal_info = { ...deal.deal_info, vulnerability: new_vul_state };
        setDeal({ ...deal, deal_info: new_deal_info });
      };

      const handleChangePlayer = (e) => {
        const new_deal_info = { ...deal.deal_info, dealer: e.target.value };
        setDeal({ ...deal, deal_info: new_deal_info });
      };

  return (
    <div className="deal-creator-container">
          <div>
            <span>N</span>
            <input
              data-player="N"
              value={Object.values(deal.deal_info.N).join(".")}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span>S</span>
            <input
              data-player="S"
              value={Object.values(deal.deal_info.S).join(".")}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span>E</span>
            <input
              data-player="E"
              value={Object.values(deal.deal_info.E).join(".")}
              onChange={handleChange}
            ></input>
          </div>
          <div>
            <span>W</span>
            <input
              data-player="W"
              value={Object.values(deal.deal_info.W).join(".")}
              onChange={handleChange}
            ></input>
          </div>

          <fieldset className="option-box">
            <legend>Vulnerability</legend>
            <div>
              <input
                type="checkbox"
                id="NS"
                name="NS"
                value="NS"
                checked={deal.deal_info.vulnerability[0]}
                onChange={() => handleChangeVul(0)}
              />
              <label htmlFor="NS">NS</label>
            </div>

            <div>
              <input
                type="checkbox"
                id="EW"
                name="EW"
                value="EW"
                checked={deal.deal_info.vulnerability[1]}
                onChange={() => handleChangeVul(1)}
              />
              <label htmlFor="EW">EW</label>
            </div>
          </fieldset>
          <fieldset className="option-box">
            <legend>Player</legend>
            <div>
              <input
                type="radio"
                name="dealer"
                value="N"
                checked={deal.deal_info.dealer === "N"}
                onChange={handleChangePlayer}
              />
              <label htmlFor="N">N</label>
            </div>
            <div>
              <input
                type="radio"
                name="dealer"
                value="S"
                checked={deal.deal_info.dealer === "S"}
                onChange={handleChangePlayer}
              />
              <label htmlFor="S">S</label>
            </div>
            <div>
              <input
                type="radio"
                name="dealer"
                value="E"
                checked={deal.deal_info.dealer === "E"}
                onChange={handleChangePlayer}
              />
              <label htmlFor="E">E</label>
            </div>
            <div>
              <input
                type="radio"
                name="dealer"
                value="W"
                checked={deal.deal_info.dealer === "W"}
                onChange={handleChangePlayer}
              />
              <label>W</label>
            </div>
          </fieldset>
        </div>
  )
}

export default DealCreatorInterface2
