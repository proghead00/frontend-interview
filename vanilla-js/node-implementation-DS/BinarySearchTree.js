class TreeNode {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(data) {
    const newNode = new TreeNode(data);
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }
  }

  insertNode(parent, newNode) {
    if (newNode.data < parent.data) {
      if (parent.left === null) {
        parent.left = newNode;
        return;
      } else {
        this.insertNode(parent.left, newNode);
      }
    } else {
      if (parent.right === null) {
        parent.right = newNode;
        return;
      } else {
        this.insertNode(parent.right, newNode);
      }
    }
  }

  display() {
    function displayNode(node, prefix = "Root: ") {
      if (node) {
        console.log(prefix + node.data);
        displayNode(node.left, "L: ");
        displayNode(node.right, "R: ");
      }
    }

    if (this.root) {
      console.log("Binary Search Tree:");
      displayNode(this.root);
    } else {
      console.log("Empty Tree");
    }
  }
}

const bst = new BinarySearchTree();
bst.insert(3);
bst.insert(1);
bst.insert(2);
bst.insert(7);

bst.display();
