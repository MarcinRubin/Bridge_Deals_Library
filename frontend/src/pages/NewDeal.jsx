import DealCreator from "../components/DealCreator";
import { useState, useEffect } from "react";
import client from "../hooks/axiosClient";
import { useNavigate } from "react-router-dom";

const NewDeal = ({}) => {

  const navigate = useNavigate();
  const [link, setLink] = useState("");
  const [deal, setDeal] = useState({
    deal_info: {
      N: {
          "Spades": "10",
          "Hearts": "K1095",
          "Diamonds": "QJ874",
          "Clubs": "Q108",
      },
      S: {
        "Spades": "976",
        "Hearts": "742",
        "Diamonds": "K9652",
        "Clubs": "A9",
      },
      W: {
        "Spades": "QJ843",
        "Hearts": "QJ8",
        "Diamonds": "3",
        "Clubs": "J643"
      },
      E: {
        "Spades": "AK52",
        "Hearts": "A63",
        "Diamonds": "A10",
        "Clubs": "K752"
      },
      vulnerability: [true, false],
      dealer: "N"
    },
    name: "Test",
    visibility: true
  });

  const [comment, setComment] = useState({
    tags: [],
    visibility: true,
    difficulty: "1",
    body: "Comment"
  })

  const handleSaveDeal = async (e) => {
    try {
      const response = await client.post("/api/comments/", {"deal": deal, ...comment});
      console.log(response.data);
      //navigate("/deals");
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const handleSubmit = async (e) =>{
    try {
      const response = await client.post("/api/scrap_deal/", {url: link});
      const new_deal_info = response.data;
      const new_deal = {...deal, deal_info: new_deal_info}
      setDeal(new_deal)
    } catch (err) {
      console.log(err.response.data);
    }
  }

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("first");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await client.get("/api/tags/");
        setTags(response.data);
        setCurrentTag(response.data[0].name);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchTags();
  }, []);

  const handleChange = (e) => {
    const player = e.target.dataset.player;
    const hand = e.target.value;
    const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
    const new_hand = ["", "", "", ""];

    hand.split(".").map( (item, idx) =>{
      new_hand[idx] = item;
    });

    const new_hand_obj = Object.fromEntries(
      suits.map((item, idx) => [item, new_hand[idx]]
      )
    );

    const new_deal_info = {...deal.deal_info, [player]: new_hand_obj};
    setDeal({ ...deal, "deal_info": new_deal_info });
  };

  const handleChangeVul = (index) =>{
    const new_vul_state = [...deal.deal_info.vulnerability];
    new_vul_state[index] = !new_vul_state[index];
    const new_deal_info = {...deal.deal_info, "vulnerability": new_vul_state};
    setDeal({ ...deal, "deal_info": new_deal_info });
  }

  const handleChangePlayer = (e) =>{
    const new_deal_info = {...deal.deal_info, dealer: e.target.value};
    setDeal({ ...deal, "deal_info": new_deal_info });
  }

  const handleChangeName = (e) =>{
    const new_deal = {...deal, "name": e.target.value};
    setDeal(new_deal);
  }

  //To do przeniesienia do tag component
  const handleTagChange = (e) => {
    setCurrentTag(e.target.value);
  };

  const handleTagAdd = (e) => {
    let new_tags = [...comment.tags];
    if (!new_tags.includes(currentTag)){
      new_tags = [...new_tags, currentTag]
      setComment({...comment, tags: new_tags});
    }
  };

  const handleTagRemove = (e) => {
    let new_tags = [...comment.tags];
    new_tags = new_tags.filter(item => item !==currentTag);
    setComment({...comment, tags: new_tags});
  };
  ///////////////////////////////////////



  return (
    <div className="new-deal-container">
      <div className="link-section">
        <input style={{width: "100%"}} type="text" placeholder="paste your link here..." value={link} onChange={(e) => setLink(e.target.value)}/>
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="new-deal-container-first-row">
        <div className="deal-container">
          <DealCreator deal={deal.deal_info} selectedTags={comment.tags} />
        </div>
        <div className="deal-creator-container">
          <div><span>N</span><input data-player="N" value={Object.values(deal.deal_info.N).join(".")} onChange={handleChange}></input></div>
          <div><span>S</span><input data-player="S" value={Object.values(deal.deal_info.S).join(".")} onChange={handleChange}></input></div>
          <div><span>E</span><input data-player="E" value={Object.values(deal.deal_info.E).join(".")} onChange={handleChange}></input></div>
          <div><span>W</span><input data-player="W" value={Object.values(deal.deal_info.W).join(".")} onChange={handleChange}></input></div>

          <fieldset className="option-box">
            <legend>Vulnerability</legend>
            <div>
              <input type="checkbox" id="NS" name="NS" value="NS" checked={deal.deal_info.vulnerability[0]} onChange={() => handleChangeVul(0)}/>
              <label htmlFor="NS">NS</label>
            </div>

            <div>
              <input type="checkbox" id="EW" name="EW" value="EW" checked={deal.deal_info.vulnerability[1]} onChange={() => handleChangeVul(1)}/>
              <label htmlFor="EW">EW</label>
            </div>
          </fieldset>
          <fieldset className="option-box">
            <legend>Player</legend>
            <div>
              <input type="radio" name="dealer" value="N" checked={deal.deal_info.dealer === "N"} onChange={handleChangePlayer}/>
              <label htmlFor="N">N</label>
            </div>
            <div>
            <input type="radio" name="dealer" value="S" checked={deal.deal_info.dealer === "S"} onChange={handleChangePlayer}/>
              <label htmlFor="S">S</label>
            </div>
            <div>
            <input type="radio" name="dealer" value="E" checked={deal.deal_info.dealer === "E"} onChange={handleChangePlayer}/>
              <label htmlFor="E">E</label>
            </div>
            <div>
            <input type="radio" name="dealer" value="W" checked={deal.deal_info.dealer === "W"} onChange={handleChangePlayer}/>
              <label>W</label>
            </div>

          </fieldset>
        </div>
      </div>

      <div className="new-deal-container-tag-row">
        <div>
          <span>
            Tags
            <select value={currentTag} onChange={handleTagChange}>
              {tags.map((item, idx) => (
                <option key={idx} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
            <button onClick={handleTagAdd}>Add</button>
            <button onClick={handleTagRemove}>Remove</button>
          </span>
          <span>
            Difficulty
            <select value={comment.difficulty} onChange={(e) => setComment({...comment, difficulty: e.target.value})}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>
          </span>
        </div>

        <div className="tags-container">
        {[...comment.tags].map((item, idx) => (<span key={idx}>{item}</span>))}
        </div>
      </div>
      <div className="create-comment-section">
        <input placeholder="Title" value={deal.name} onChange={handleChangeName}></input>
        <textarea rows="10" placeholder="Comment" value={comment.body} onChange={(e) => setComment({...comment, body: e.target.value})}></textarea>
      </div>
      <div className="create-save-section">
        <button onClick={handleSaveDeal}>SAVE</button>
      </div>
    </div>
  );
};

export default NewDeal;
