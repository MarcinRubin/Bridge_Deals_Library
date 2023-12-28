import MyDealListElement from "../components/MyDealListElement";
import DealNavigator from "../components/DealNavigator";
import client from "../hooks/axiosClient";
import { useState, useEffect } from "react";
import LoadingElement from "../components/LoadingElement";
import { setFilterDownTheTree } from "../utils/DealNavigator";
import useDualFetch from "../hooks/useDualFetch";

const MyDeals = () => {
  const [allDirectories, setAllDirectories] = useState([]);
  const [filter, setFilter] = useState([{ key: 0, value: 0 }]);

  const [deals, setDeals, directories, setDirectories, error, loading] =
    useDualFetch("/api/my_comments", "/api/directories/");

    const handleChangeDealDirectory = (id, newDirectory) => {
    const newDeals = [...deals];
    const deal = newDeals.filter((item) => item.id === id)[0];
    deal.directory = newDirectory;
    setDeals(newDeals);
  };

  const handleRemoveDeal = (id) => {
    let newDeals = [...deals];
    newDeals = newDeals.filter((item) => item.id !== id);
    setDeals(newDeals);
  };

  const addDirectoryToTree = async (newDirectories) => {
    try {
      const response = await client.patch("/api/directories/", {
        directories: newDirectories,
      });
      setDirectories(response.data.directories);
    } catch (err) {
      console.log(err.message);
    }
  };

  const deleteDirectoryFromTree = async (toMove, moveTo, newDirectoryTree) => {
    try {
      const newDeals = await client.patch(
        "/api/my_comments/remove_directory/",
        {
          toDelete: toMove,
          moveTo: moveTo,
        }
      );
      const newDirectories = await client.patch("/api/directories/", {
        directories: newDirectoryTree,
      });
      setDirectories(newDirectories.data.directories);
      setDeals(newDeals.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loader"></div>
      ) : (
        <div className="all-deals-wrapper">
          <DealNavigator
            directories={directories}
            filter={filter}
            setFilter={setFilter}
            allDirectories={allDirectories}
            setAllDirectories={setAllDirectories}
            addDirectoryToTree={addDirectoryToTree}
            deleteDirectoryFromTree={deleteDirectoryFromTree}
          />
          <div className="all-deals-container">
            {deals.length === 0 ? (
              <LoadingElement spinnerWidth={50} thickness={5} />
            ) : null}
            {Object.keys(deals).length !== 0 &&
              deals
                .filter((item) => filter.includes(item.directory))
                .map((item) => (
                  <MyDealListElement
                    myDeal={item}
                    key={item.id}
                    allDirectories={allDirectories}
                    handleChangeDealsList={handleChangeDealDirectory}
                    handleRemoveFromDealList={handleRemoveDeal}
                  />
                ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyDeals;
