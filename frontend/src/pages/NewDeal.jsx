import DealCreator from "../components/DealCreator";
import { useState, useEffect } from "react";

const NewDeal = ({ client }) => {


  const [deal, setDeal] = useState({
    deal_info: {
      N: "10.K1095.QJ874.Q108",
      S: "976.742.K9652.A9",
      W: "QJ843.QJ8.3.J643",
      E: "AK52.A63.A10.K752",
      vul: [true, false],
      player: "N"
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

  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState("first");

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await client.get("/api/deals/tags/");
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
    const new_deal_info = {...deal.deal_info, [player]: e.target.value}
    setDeal({ ...deal, "deal_info": new_deal_info });
  };

  const handleChangeVul = (index) =>{
    const new_vul_state = [...deal.deal_info.vul];
    new_vul_state[index] = !new_vul_state[index];
    const new_deal_info = {...deal.deal_info, "vul": new_vul_state};
    setDeal({ ...deal, "deal_info": new_deal_info });
  }

  const handleChangePlayer = (e) =>{
    const new_deal_info = {...deal.deal_info, player: e.target.value}
    setDeal({ ...deal, "deal_info": new_deal_info });
  }

  const handleChangeName = (e) =>{
    const new_deal = {...deal, "name": e.target.value}
    setDeal(new_deal)
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

  const handleSaveDeal = async (e) => {
    try {
      const response = await client.post("/api/deals/", {"deal": deal, "comment": comment});
      console.log(response.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <div className="new-deal-container">
      <div className="new-deal-container-first-row">
        <div className="deal-container">
          <DealCreator deal={deal.deal_info} selectedTags={comment.tags} />
        </div>
        <div className="deal-creator-container">
          <div><span>N</span><input data-player="N" value={deal.deal_info.N} onChange={handleChange}></input></div>
          <div><span>S</span><input data-player="S" value={deal.deal_info.S} onChange={handleChange}></input></div>
          <div><span>E</span><input data-player="E" value={deal.deal_info.E} onChange={handleChange}></input></div>
          <div><span>W</span><input data-player="W" value={deal.deal_info.W} onChange={handleChange}></input></div>

          <fieldset className="option-box">
            <legend>Vulnerability</legend>
            <div>
              <input type="checkbox" id="NS" name="NS" value="NS" checked={deal.deal_info.vul[0]} onChange={() => handleChangeVul(0)}/>
              <label htmlFor="NS">NS</label>
            </div>

            <div>
              <input type="checkbox" id="EW" name="EW" value="EW" checked={deal.deal_info.vul[1]} onChange={() => handleChangeVul(1)}/>
              <label htmlFor="EW">EW</label>
            </div>
          </fieldset>
          <fieldset className="option-box">
            <legend>Player</legend>
            <div>
              <input type="radio" name="player" value="N" checked={deal.deal_info.player === "N"} onChange={handleChangePlayer}/>
              <label htmlFor="N">N</label>
            </div>
            <div>
            <input type="radio" name="player" value="S" checked={deal.deal_info.player === "S"} onChange={handleChangePlayer}/>
              <label htmlFor="S">S</label>
            </div>
            <div>
            <input type="radio" name="player" value="E" checked={deal.deal_info.player === "E"} onChange={handleChangePlayer}/>
              <label htmlFor="E">E</label>
            </div>
            <div>
            <input type="radio" name="player" value="W" checked={deal.deal_info.player === "W"} onChange={handleChangePlayer}/>
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
