import DealCreator from "./DealCreator";
import TagsContainer from "./TagsContainer";
import { useNavigate } from "react-router-dom";


const DealListElement = ({deal}) => {

const navigate = useNavigate();

const handleClick = () =>{
    console.log("Clicked");
    return navigate(`/deals/${deal.id}`)
}

return (
    <div className="deal-list-item" onClick={handleClick}>
    <>
    <div className="deal-container">
        <DealCreator
            deal = {deal.deal_info}
        />
    </div>

    <div>
        <h2>{deal.name}</h2>
    </div>
    <div>
    <TagsContainer
        tags = {deal.most_popular_tags}
    />
    <div><span>diff: {deal.avg_difficulty}</span></div>
    </div>

    <div>
        <span>{deal.author}</span>
        <span>{deal.created_at}</span>
    </div>

    </>
    </div>
  )
}

export default DealListElement
