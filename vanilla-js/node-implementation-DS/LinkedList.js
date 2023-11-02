class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  createNewNode(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let cur = this.head;
      while (cur.next) {
        cur = cur.next;
      }
      cur.next = newNode;
    }
  }

  removeNode(data) {
    if (!this.head) return;

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let cur = this.head;
    let prev = null;

    while (cur) {
      if (cur.data === data) {
        prev.next = cur.next;
        cur = null;
        return;
      }
      prev = cur;
      cur = cur.next;
    }
  }

  display() {
    let cur = this.head;
    let output = "";

    while (cur) {
      output += cur.data;
      if (cur.next) {
        output += " -> ";
      }
      cur = cur.next;
    }

    console.log(output);
  }
}

const linkedList = new LinkedList();
linkedList.createNewNode(1);
linkedList.createNewNode(2);
linkedList.createNewNode(3);
linkedList.createNewNode(4);

linkedList.display();

linkedList.removeNode(2);
linkedList.display();
