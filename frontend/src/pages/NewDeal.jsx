import DealCreator from "../components/DealCreator";
import DealCreatorInterface from "../components/DealCreatorInterface";
import CommentEditor from "../components/CommentEditor";
import { useState } from "react";
import client from "../hooks/axiosClient";
import { useNavigate } from "react-router-dom";
import TagsManager from "../components/TagsManager";

const NewDeal = ({}) => {
  const navigate = useNavigate();

  const [currentTags, setCurrentTags] = useState([]);
  const [deal, setDeal] = useState({
    deal_info: {
      N: {
        Spades: "10",
        Hearts: "K1095",
        Diamonds: "QJ874",
        Clubs: "Q108",
      },
      S: {
        Spades: "976",
        Hearts: "742",
        Diamonds: "K9652",
        Clubs: "A9",
      },
      W: {
        Spades: "QJ843",
        Hearts: "QJ8",
        Diamonds: "3",
        Clubs: "J643",
      },
      E: {
        Spades: "AK52",
        Hearts: "A63",
        Diamonds: "A10",
        Clubs: "K752",
      },
      vulnerability: [true, false],
      dealer: "N",
    },
    name: "Test",
    visibility: true,
  });

  const [comment, setComment] = useState({
    tags: [],
    visibility: true,
    difficulty: "1",
    body: "Comment",
  });

  const handleSaveDeal = async (e) => {
    try {
      const newComment = { ...comment, tags: currentTags };
      const response = await client.post("/api/my_comments/", {
        deal: deal,
        ...newComment,
      });
      console.log(response.data);
      navigate("/mydeals");
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
        <DealCreatorInterface deal={deal} setDeal={setDeal} />
      </div>

      <div className="new-deal-container-tag-row">
        <span>TAGS</span>
        <TagsManager
          currentTags={currentTags}
          setCurrentTags={setCurrentTags}
        />

        <div className="difficulty-row">
          <span>DIFFICULTY</span>
          <select
            value={comment.difficulty}
            onChange={(e) =>
              setComment({ ...comment, difficulty: e.target.value })
            }
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div className="create-comment-section">
        <CommentEditor deal={deal} setDeal={setDeal} comment={comment} setComment={setComment}/>
      </div>
      <div className="create-save-section">
        <button onClick={handleSaveDeal}>SAVE</button>
      </div>
    </div>
  );
};

export default NewDeal;
