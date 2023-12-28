export function setFilterDownTheTree(node, newFilters){
    newFilters = [...newFilters, node.value];
    for (let children of node.children) {
      newFilters = setFilterDownTheTree(children, newFilters);
    }
    return newFilters;
  };

export function findNode(key, directoryStructure){
    const path = key.split("-");
    let node = directoryStructure[parseInt(path[0])];
    for (let edge of path.slice(1)) {
      node = node.children[parseInt(edge)];
    }
    return node;
  };

export function findParentNode(node, directoryStructure){
  console.log(node);
  const path = node.key.split("-");
    path.pop();
    const parentNode = findNode(path.join("-"), directoryStructure);
    return parentNode;
  };
