import { redirect, useLoaderData } from "react-router-dom";
import DealCreator from "../components/DealCreator";
import DealCreatorInterface from "../components/DealCreatorInterface";
import ResultTable from "../components/ResultTable";
import TrickTable from "../components/TrickTable";
import TagsManager from "../components/TagsManager";
import CommentEditor from "../components/CommentEditor";
import { useState } from "react";
import client from "../hooks/axiosClient";

export async function loader({params}) {
    const deal_id = params.dealId;
    try{
        const response = await client.get(`/api/my_comments/${deal_id}`);
        return response.data;
    }
    catch{
        console.log("Some kind of error in backend functionality");
    }
    return [];
};


const MyDeal = () => {

    const loaded_comment = useLoaderData();
    const [currentTags, setCurrentTags] = useState(loaded_comment.tags);
    const [comment, setComment] = useState(loaded_comment);

    return (
        <div className="new-deal-container">
          <div className="new-deal-container-first-row">
                <div className="deal-container">
                  <DealCreator deal={comment.deal.deal_info} selectedTags={comment.tags} />
                </div>
                <DealCreatorInterface deal={comment.deal} setDeal={setComment} />
          </div>

          <div className="new-deal-container-second-row">
                  {comment.deal.result_table && <ResultTable
                    result_table = {comment.deal.result_table}
                    />}
                  {comment.deal.trick_table && <TrickTable
                    trick_table = {comment.deal.trick_table}
                    />}
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
              deal={comment.deal}
              setDeal={setComment}
              comment={comment}
              setComment={setComment}
            />
          </div>
          <div className="create-save-section">
            <button>UPDATE</button>
          </div>
        </div>
      );
}

export default MyDeal
