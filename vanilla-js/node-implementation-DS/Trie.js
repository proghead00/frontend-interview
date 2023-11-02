class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children.has(char)) {
        node.children.set(char, new TrieNode());
      }
      node = node.children.get(char);
    }
    node.isEndOfWord = true;
  }

  find(word) {
    let node = this.root;
    for (const char of word) {
      if (node.children.has(char)) {
        node = node.children.get(char);
      } else {
        return false; // the word or prefix is not found
      }
    }
    return true; // the word or prefix is found
  }
}

const trie = new Trie();
trie.insert("apple");
trie.insert("app");
trie.insert("banana");

console.log(trie.find("apple")); // true
console.log(trie.find("app")); // true
console.log(trie.find("appl")); // false (partial match)
console.log(trie.find("banana")); // true
console.log(trie.find("ban")); // false (partial match)
console.log(trie.find("cherry")); // false
