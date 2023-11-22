import DealCreator from "./DealCreator";
import TagsContainer from "./TagsContainer";

const DealListElement = ({deal}) => {

return (
    <div className="deal-list-item">
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
