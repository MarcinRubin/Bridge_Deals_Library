import DealCreator from "./DealCreator";
import TagsContainer from "./TagsContainer";
import { useNavigate } from "react-router-dom";

const MyDealListElement = ({ myDeal }) => {
  const navigate = useNavigate();
  const deal = myDeal.deal;

  const handleClick = () => {
    console.log("Clicked");
    return navigate(`/mydeals/${myDeal.id}`);
  };
  return (
    <div className="deal-list-item">
      <div className="list-item-first-column">
        <div className="deal-container-small">
          <DealCreator deal={deal.deal_info} />
        </div>
      </div>
      <div className="list-item-second-column">
        <div className="list-item-title-section">
          <h3>{deal.name}</h3>
        <div>
            <span><i className="bi bi-list"></i></span>
        </div>
        </div>

        <div className="list-item-tags-section">
            <p>Tags:</p>
          <TagsContainer tags={myDeal.tags} />
        </div>

        <div className="list-item-diff-section">
            <span>Tournament: {myDeal.tournament ? myDeal.tournament : "-" }</span>
            <span>diff: {myDeal.difficulty}</span>

        </div>

        <div className="list-item-author-section">
          <span>{deal.author}</span>
          <span>{deal.created_at.substring(0,10)}</span>
        </div>
      </div>
    </div>
  );
};

export default MyDealListElement;
