import React, { useEffect } from "react";
import { useState, useRef } from "react";
import client from "../hooks/axiosClient";
import useToggle from "../hooks/useToggle";
import DeleteDirectoryModal from "./DeleteDirectoryModal";

const DealNavigator = ({
  directories,
  setDirectories,
  filter,
  setFilter,
  setDeals,
}) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("newDirectory");
  const [isDelete, toggleDelete] = useToggle(false);
  const [chosenDirectory, setChosenDirectory] = useState("0");
  const Ref = useRef(null);

  useEffect(() => {
    let newFilter = [];
    newFilter = setFilterDownTheDirectoryTree(directories[0], newFilter);
  }, [directories]);

  useEffect(() => {
    Ref.current?.focus();
  }, [edit]);

  const findNode = (key, directoryStructure) => {
    const path = key.split("-");
    let node = directoryStructure[parseInt(path[0])];
    for (let edge of path.slice(1)) {
      node = node.children[parseInt(edge)];
    }
    return node;
  };

  const findNodeParent = (key, directoryStructure) => {
    const path = key.split("-");
    path.pop();
    const node = findNode(path.join("-"), directoryStructure);
    return [node.value, node.key];
  };

  const handleSelect = (key) => {
    const node = findNode(key, directories);
    setChosenDirectory(node.key);
    let newFilter = [];
    newFilter = setFilterDownTheDirectoryTree(node, newFilter);
    setFilter(newFilter);
  };

  const setFilterDownTheDirectoryTree = (node, newFilter) => {
    newFilter = [...newFilter, node.value];
    for (let children of node.children) {
      newFilter = setFilterDownTheDirectoryTree(children, newFilter);
    }
    return newFilter;
  };

  const handleExpand = (key) => {
    const newDirectories = [...directories];
    const node = findNode(key, newDirectories);
    node.visibility = !node.visibility;
    for (let children of node.children) {
      setVisibilityDownTheDirectoryTree(children);
    }
    setDirectories(newDirectories);
  };

  const setVisibilityDownTheDirectoryTree = (children) => {
    children.visibility = false;
    for (let subchildren of children.children) {
      setVisibilityDownTheDirectoryTree(subchildren);
    }
  };

  const handleAddDirectory = () => {
    const newDirectories = [...directories];
    const node = findNode(chosenDirectory, newDirectories);
    node.visibility = true;

    let newKey = null;
    if (node.children.length) {
      newKey = node.children[node.children.length - 1].key.split("-");
      newKey[newKey.length - 1] = String(
        parseInt(newKey[newKey.length - 1]) + 1
      );
    } else newKey = [...node.key.split("-"), "0"];
    const newNode = {
      key: newKey.join("-"),
      value: "new_node",
      visibility: node.visibility,
      children: [],
      temp: true,
    };
    node.children = [...node.children, newNode];
    setDirectories(newDirectories);
    setEdit(true);
  };

  const handleEnter = (e, key) => {
    if (e.key === "Enter") {
      handleBlur(key);
    }
  };

  const handleBlur = async (key) => {
    const newDirectories = [...directories];
    const node = findNode(key, newDirectories);
    delete node.temp;
    node.value = name;

    try {
      const response = await client.patch("/api/directories/", {
        directories: newDirectories,
      });
    } catch (err) {
      console.log(err.message);
    }

    setDirectories(newDirectories);
    setEdit(false);
    setName("newDirectory");
  };

  const handleDelete = async () => {
    const moveTo = findNodeParent(chosenDirectory, directories);
    try {
      const response = await client.patch(
        "/api/my_comments/remove_directory/",
        {
          toDelete: filter,
          moveTo: moveTo[0],
        }
      );
      setDeals(response.data);
    } catch (err) {
      console.log(err.message);
    }
    const newDirectories = [...directories];
    const node = findNode(moveTo[1], newDirectories);
    node.children = node.children.filter((item) => item.value !== filter[0]);
    node.children = node.children.map((item, idx) => ({
      ...item,
      key: moveTo[1] + "-" + String(idx),
    }));

    try {
      const response = await client.patch("/api/directories/", {
        directories: newDirectories,
      });
    } catch (err) {
      console.log(err.message);
    }
    setDirectories(newDirectories);
    handleSelect(moveTo[1]);
    toggleDelete();
  };

  const handleDirectories = (item, depth) => {
    return (
      <div key={item.key}>
        <span style={{ marginLeft: `${2 * depth}rem` }}>
          {item.children.length !== 0 && (
            <i
              className={`bi bi-caret-${
                item.visibility ? "down" : "right"
              }-fill`}
              onClick={() => handleExpand(item.key)}
            ></i>
          )}
          {edit && item?.temp ? (
            <input
              ref={Ref}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => handleEnter(e, item.key)}
              onBlur={() => handleBlur(item.key)}
            />
          ) : (
            <span
              onClick={(e) => handleSelect(item.key)}
              className={chosenDirectory === item.key ? "active" : ""}
            >
              {item.value}
            </span>
          )}
        </span>
        {item.children.length !== 0 && item.visibility
          ? item.children.map((subitem) =>
              handleDirectories(subitem, depth + 1)
            )
          : null}
      </div>
    );
  };

  return (
    <div className="deal-navigator-wrapper">
      {isDelete ? (
        <DeleteDirectoryModal handleDelete={handleDelete} toggle={toggleDelete}>
            <div>
              <div>The following directories will be deleted:</div>
              {filter.map((item, idx) => (
                <span key={idx}>{item}</span>
              ))}
              <div>
                Every deal will be automatically moved to directory: {findNodeParent(chosenDirectory, directories)[0]}
              </div>
            </div>
        </DeleteDirectoryModal>
      ) : null}
      <div>
        <button
          onClick={handleAddDirectory}
          disabled={!chosenDirectory ? true : false}
        >
          Add
        </button>
        <button
          onClick={toggleDelete}
          disabled={chosenDirectory === "0" ? true : false}
        >
          Remove
        </button>
      </div>
      <div className="directory-structure">
        {handleDirectories(directories[0], 0)}
      </div>
    </div>
  );
};

export default DealNavigator;
