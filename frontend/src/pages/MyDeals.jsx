import MyDealListElement from "../components/MyDealListElement";
import client from "../hooks/axiosClient";
import DealNavigator from "../components/DealNavigator";
import { useState, useEffect } from "react";
import LoadingElement from "../components/LoadingElement";

const MyDeals = () => {

  const [directories, setDirectories] = useState([{ key: "0", value: "", visibility: true, children: []}]);
  const [allDirectories, setAllDirectories] = useState([]);
  const [filter, setFilter] = useState([]);
  const [deals, setDeals] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetch");
      let [dirData, dealData] = [null, null];
      try {
        dirData = await client.get("/api/directories/");
        dealData = await client.get("/api/my_comments/");
      } catch (err) {
        console.log(err.message);
      }
      setDirectories(dirData.data.directories);
      setDeals(dealData.data);
      let newAllDirectories = [];
      newAllDirectories = setFilterDownTheTree(dirData.data.directories[0], newAllDirectories);
      setAllDirectories(newAllDirectories);
      setFilter(newAllDirectories);
    };

    fetchData();
  }, []);

  useEffect(() => {
    let newAllDirectories = [];
    newAllDirectories = setFilterDownTheTree(directories[0], newAllDirectories);
    setAllDirectories(newAllDirectories);
  }, [directories])

  const setFilterDownTheTree = (node, newAllDirectories) => {
    newAllDirectories = [...newAllDirectories, node.value];
    for (let children of node.children) {
      newAllDirectories = setFilterDownTheTree(children, newAllDirectories);
    }
    return newAllDirectories;
  };

  const handleChangeDealsList = (id, newDirectory) =>{
    const newDeals = [...deals];
    const deal = newDeals.filter(item => item.id === id)[0]
    deal.directory = newDirectory;
    setDeals(newDeals);
  }

  const handleRemoveFromDealList = (id) => {
    let newDeals = [...deals];
    newDeals = newDeals.filter(item => item.id !== id);
    setDeals(newDeals);
  }

  return (
    <div className="all-deals-wrapper">

    <DealNavigator
      directories = {directories}
      setDirectories = {setDirectories}
      filter={filter}
      setFilter={setFilter}
      setDeals = {setDeals}
    />
    <div className="all-deals-container">
    {deals.length === 0 ? <LoadingElement spinnerWidth={50} thickness={5}/> : null}
    {Object.keys(deals).length !== 0 && deals.filter(item => filter.includes(item.directory)).map( (item) => (
      <MyDealListElement
        myDeal = {item}
        key = {item.id}
        allDirectories = {allDirectories}
        handleChangeDealsList={handleChangeDealsList}
        handleRemoveFromDealList={handleRemoveFromDealList}
      />
    ))
    }
  </div>
  </div>
  )
}

export default MyDeals
