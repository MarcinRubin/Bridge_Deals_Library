import DealCreator from "../components/DealCreator";
import DealCreatorInterface from "../components/DealCreatorInterface";
import CommentEditor from "../components/CommentEditor";
import LoadingElement from "../components/LoadingElement";
import ResultTable from "../components/ResultTable";
import TrickTable from "../components/TrickTable";
import { useState } from "react";
import client from "../hooks/axiosClient";
import { useNavigate } from "react-router-dom";
import TagsManager from "../components/TagsManager";

const CreateDealFromLink = () => {
  const [currentTags, setCurrentTags] = useState([]);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [link, setLink] = useState("");
  const [deal, setDeal] = useState({
    deal_info: {
      N: {
        Spades: "",
        Hearts: "",
        Diamonds: "",
        Clubs: "",
      },
      S: {
        Spades: "",
        Hearts: "",
        Diamonds: "",
        Clubs: "",
      },
      W: {
        Spades: "",
        Hearts: "",
        Diamonds: "",
        Clubs: "",
      },
      E: {
        Spades: "",
        Hearts: "",
        Diamonds: "",
        Clubs: "",
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
      const response = await client.post("/api/comments/", {
        deal: deal,
        ...newComment,
      });
      console.log(response.data);
      navigate("/mydeals");
    } catch (err) {
      console.log("Blad");
    }
  };

  const handleSubmit = async (e) => {
    try {
      setIsLoading(true);
      const response = await client.post("/api/scrap_deal/", { url: link });
      const deal_data = response.data;
      const new_deal = { ...deal, ...deal_data};
      console.log(new_deal);
      setIsLoading(false);
      setIsLoaded(true);
      setDeal(new_deal);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new-deal-container">
      <div className="new-deal-container-first-row">
        {isLoaded ? (
          <>
            <div className="deal-container">
              <DealCreator deal={deal.deal_info} selectedTags={comment.tags} />
            </div>
            <DealCreatorInterface deal={deal} setDeal={setDeal} />
          </>
        ) : isLoading ? (
            <LoadingElement
              spinnerWidth={50}
              thickness={0.8}
            />
        ) : (
          <div className="link-loader-container">
            <input
              value={link}
              onChange={(e) => setLink(e.target.value)}
            ></input>
            <button onClick={handleSubmit}>Load Deal</button>
          </div>
        )}
      </div>

      <div className="new-deal-container-second-row">
      {isLoaded ? (
          <>
              <ResultTable
                result_table = {deal.result_table}
                />
              <TrickTable
                trick_table = {deal.trick_table}
                />
          </>
        ) : isLoading ? (
            <LoadingElement
              spinnerWidth={50}
              thickness={0.8}
            />
        ) : (
          <span>RESULTS AND TRICK TABLE</span>
        )}
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
        <CommentEditor
          deal={deal}
          setDeal={setDeal}
          comment={comment}
          setComment={setComment}
        />
      </div>
      <div className="create-save-section">
        <button onClick={handleSaveDeal} disabled={!isLoaded}>SAVE</button>
      </div>
    </div>
  );
};

export default CreateDealFromLink;
