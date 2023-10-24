const getPathFromChildToParent = (child, parent) => {
  let curNode = child;
  const pathArr = [];

  while (curNode !== parent) {
    const parentOfCurNode = curNode.parentElement;
    // console.log(
    //   `cur: ${curNode.innerText} :: parent: ${parentOfCurNode.innerText}`
    // );

    const childrenArr = Array.from(parentOfCurNode.children);
    console.log(`childrenArr: ${childrenArr}`);

    pathArr.push(childrenArr.indexOf(curNode));

    curNode = parentOfCurNode;
  }

  return pathArr;
};

const getValueFromPath = (parent, path) => {
  let curNode = parent;
  while (path.length) {
    let childIdx = path.pop();
    curNode = curNode.children[childIdx];
  }

  return curNode.innerText;
};

const getNodeValue = () => {
  const rootA = document.getElementById("rootA");
  const rootB = document.getElementById("rootB");
  const nodeA = document.getElementById("nodeA");

  const path = getPathFromChildToParent(nodeA, rootA);
  console.log(`Path: [${path}]`);
  return getValueFromPath(rootB, path);
};

console.log(getNodeValue());
