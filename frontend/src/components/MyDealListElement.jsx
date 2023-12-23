import DealCreator from "./DealCreator";
import TagsContainer from "./TagsContainer";
import { useNavigate } from "react-router-dom";
import { DropMenu, DropMenuElement, DropMenuElementParams, DropMenuElementText } from "./DropMenu";
import useToggle from "../hooks/useToggle";
import { useState } from "react";
import client from "../hooks/axiosClient";

const MyDealListElement = ({ myDeal, allDirectories, handleChangeDealsList, handleRemoveFromDealList }) => {
  const navigate = useNavigate();
  const deal = myDeal.deal;

  const [active, toggle] = useToggle(false);
  const [moveToactive, toggleMoveTo] = useToggle(false);

  const handleClick = () => {
    console.log("Clicked");
    return navigate(`/mydeals/${myDeal.id}`);
  };

  const handleDirectoryChange = async (newDirectory) => {
    try {
      const response = await client.patch(`/api/my_comments/${myDeal.id}/`, {"directory": newDirectory});
      handleChangeDealsList(myDeal.id, newDirectory);
    } catch (err) {
      console.log(err.message);
    }
  }

  const handleDealDelete = async () => {
    try {
      const response = await client.delete(`/api/my_comments/${myDeal.id}/`);
      handleRemoveFromDealList(myDeal.id);
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className="deal-list-item">
      <div className="list-item-first-column">
        <div className="deal-container-small" onClick={handleClick}>
          <DealCreator deal={deal.deal_info} />
        </div>
      </div>
      <div className="list-item-second-column">
        <div className="list-item-title-section">
          <h3>{deal.name}</h3>
        <div className="list-item-drop-menu-section">
            <button onClick={toggle}><i className="bi bi-list"></i></button>
            <DropMenu isActive={active} toggle={toggle} xtranslate={0} ytranslate={40}>
              <DropMenuElementText
                text={"Move to"} icon={"bi bi-bag-plus"} onClick={toggleMoveTo}
              />
              <DropMenuElementText
                text={"Delete"} icon={"bi bi-bag-plus"} onClick={handleDealDelete}
              />
            </DropMenu>
            <DropMenu isActive={moveToactive} xtranslate={100} ytranslate={40}>
                {allDirectories.map((item, idx) => (
                  <DropMenuElementParams
                    onClick={handleDirectoryChange}
                    key={idx}
                    text={item}
                    icon={"bi bi-bag-plus"}
                  />
                ))}
              </DropMenu>
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
