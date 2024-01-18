import MyDealListElement from "../components/MyDealListElement";
import DealNavigator from "../components/DealNavigator";
import client from "../hooks/axiosClient";
import { useState, useEffect } from "react";
import useDualFetch from "../hooks/useDualFetch";
import { Spinner, Container, Flex } from "@chakra-ui/react";

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
     <Flex display="flex" w="100%" flexDirection="row" mt={8} gap={4} px={8} b={0} justifyContent="flex-start">
      {loading ? (
        <Spinner color="green.500" size="xl"/>
      ) : (
        <>
          <Flex minW="200px" minH="100%">
            <DealNavigator
              directories={directories}
              filter={filter}
              setFilter={setFilter}
              allDirectories={allDirectories}
              setAllDirectories={setAllDirectories}
              addDirectoryToTree={addDirectoryToTree}
              deleteDirectoryFromTree={deleteDirectoryFromTree}
            />
          </Flex>
          <Flex wrap="wrap" gap={8} alignItems="flex-start">
            {deals.length === 0 ? (
              <Spinner/>
            ) : null}
            {Object.keys(deals).length !== 0 &&
              deals
                .filter((item) => filter.includes(item.directory))
                .map((item) => (
                  <MyDealListElement
                    key={item.id}
                    myDeal={item}
                    allDirectories={allDirectories}
                    handleChangeDealsList={handleChangeDealDirectory}
                    handleRemoveFromDealList={handleRemoveDeal}
                  />
                ))}
          </Flex>
          </>

      )}
      </Flex>
  );
};

export default MyDeals;
