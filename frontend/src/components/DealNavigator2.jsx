import { useState, useRef, useEffect } from "react";
import useToggle from "../hooks/useToggle";
import DeleteDirectoryModal from "./DeleteDirectoryModal";
import {setFilterDownTheTree, findNode, findParentNode} from "../utils/DealNavigator";

const DealNavigator2 = ({
  directories,
  filter,
  setFilter,
  allDirectories,
  setAllDirectories,
  addDirectoryToTree,
  deleteDirectoryFromTree
}) => {

  const [chosenDirectory, setChosenDirectory] = useState(directories[0]);
  const [stopPropagation, setStopPropagation] = useState(["0"]);

  //This can be transform in the single useReducer for clarity
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("New Folder");
  const [temporaryNode, setTemporaryNode] = useState(null);
  const Ref = useRef(null);
  ////////////////////////////////////////////////////////////


  const [isDelete, toggleDelete] = useToggle(false);

  useEffect(() => {
    Ref.current?.focus();
  }, [edit]);

   useEffect(() => {
     let newFilter = [];
     newFilter = setFilterDownTheTree(chosenDirectory, newFilter);
     setFilter(newFilter);
     let newAllDirectories = []
     newAllDirectories = setFilterDownTheTree(directories[0], newAllDirectories);
     setAllDirectories(newAllDirectories);
   }, [directories]);

  const handleSelect = (key) => {
    const node = findNode(key, directories);
    setChosenDirectory(node);
    let newFilter = setFilterDownTheTree(node, []);
    console.log(newFilter);
    setFilter(newFilter);
  };

  const handleExpand = (node) => {
    let propagation = [...stopPropagation];
    if (propagation.includes(node.key)){
      propagation = propagation.filter(item => item !== node.key);
      propagation = [...propagation, ...node.children.map(item => item.key)];
    }
    else{
      propagation = propagation.filter(item => item.slice(0, node.key.length) !== node.key);
      propagation = [...propagation, node.key];
    }
    setStopPropagation(propagation);
    setChosenDirectory(node);
    handleSelect(node.key);
  }

  const handleAddDirectory = () => {
    const childrenNumber = chosenDirectory.children.length
    let newKey = "";
    if (childrenNumber) {
      newKey = chosenDirectory.children[childrenNumber - 1].key.split("-");
      newKey[newKey.length - 1] = String(childrenNumber);
    } else newKey = [...chosenDirectory.key.split("-"), "0"];
    const newTemporaryNode = {
      parentKey: chosenDirectory.key,
      key: newKey.join("-"),
      value: "New Folder",
      visibility: true,
      children: [],
    };
    setTemporaryNode(newTemporaryNode);
    setEdit(true);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

  const handleBlur = async () => {
    const newDirectories = [...directories];
    const newTemporaryNode = {...temporaryNode};
    const parentNode = findNode(temporaryNode.parentKey, newDirectories);

    delete newTemporaryNode.parentKey;
    temporaryNode.value = name;

    parentNode.children = [...parentNode.children, temporaryNode];
    await addDirectoryToTree(newDirectories);
    // setChosenDirectory(newTemporaryNode);
    setName("New Folder");
    setEdit(false);
  };

  const handleDelete = async () => {
    const newDirectories = [...directories];
    const parentNode = findParentNode(chosenDirectory, newDirectories);
    parentNode.children = parentNode.children.filter(item => item.key !== chosenDirectory.key)
    handleSelect(parentNode.key);
    toggleDelete();
    deleteDirectoryFromTree(filter, parentNode.value, newDirectories);
  };

  const handleDirectories = (item, depth) => {
    return (
      <div key={item.key}>
        <span style={{ marginLeft: `${2 * depth}rem` }}>
          {item.children.length !== 0 ? (
            <i
              className={`bi bi-caret-${
                stopPropagation.includes(item.key) ? "right" : "down"
              }-fill`}
              onClick={() => handleExpand(item)}
            ></i>
          ) : null}

          {
            <span
              onClick={() => handleSelect(item.key)}
              className={chosenDirectory.key === item.key ? "active" : ""}
            >
              {item.value}
            </span>
          }
        </span>

        {item.children.length !== 0 && !stopPropagation.includes(item.key)
          ? item.children.map((subitem) =>
              handleDirectories(subitem, depth + 1)
            )
          : null}

        {
          edit && item.key === temporaryNode.parentKey ? handleTemporary(temporaryNode, depth + 1) : null
        }
      </div>
    );
  };

  const handleTemporary = (node, depth) =>{
    return (
      <div key={node.key}>
        <span style={{ marginLeft: `${2 * depth}rem` }}>
        <input
              ref={Ref}
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={handleEnter}
              onBlur={handleBlur}
            />
        </span>
        </div>
    )
  }

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
                Every deal will be automatically moved to directory: {findParentNode(chosenDirectory, directories).value}
              </div>
            </div>
        </DeleteDirectoryModal>
      ) : null}
      <div>
        <button
          onClick={handleAddDirectory}
          disabled={!chosenDirectory.key ? true : false}
        >
          Add
        </button>
        <button
          onClick={toggleDelete}
          disabled={chosenDirectory.key === "0" ? true : false}
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

export default DealNavigator2;
