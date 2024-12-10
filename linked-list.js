const Node = function (value, nextNode = null) {
  return {
    value: value,
    nextNode: nextNode,
  };
};

const LinkedList = function () {
  let headNode = null;
  let tailNode = null;
  let length = 0;

  const traverse = function (func) {
    let currentNode = headNode;
    let result = {
      value: null,
      done: false,
    };
    let index = 0;
    while (currentNode != null) {
      result = func(currentNode, index, result);
      index++;
      if (result.done == true) break;
      currentNode = currentNode.nextNode;
    }
    return result.value;
  };

  const append = function (value) {
    let newNode = Node(value);
    if (tailNode == null) {
      headNode = newNode;
      tailNode = newNode;
    } else {
      tailNode.nextNode = newNode;
      tailNode = newNode;
    }
    length++;
  };

  const prepend = function (value) {
    let newNode = Node(value);
    if (headNode == null) {
      newNode.nextNode = null;
      headNode = newNode;
      tailNode = newNode;
    } else {
      newNode.nextNode = headNode;
      headNode = newNode;
    }
    length++;
  };

  const size = function () {
    return length;
  };

  const head = function () {
    return headNode;
  };

  const tail = function () {
    return tailNode;
  };

  const backstep = function (targetNode) {
    let previous = traverse((node, index, result) => {
      if (node.nextNode == targetNode)
        result = {
          value: node,
          done: true,
        };
      return result;
    });
    return previous;
  };

  const pop = function () {
    let last = tailNode;
    let previous = backstep(last);
    previous.nextNode = null;
    tailNode = previous;
    length--;
    return last;
  };

  const at = function (targetIndex) {
    let node = traverse((node, index, result) => {
      if (index == targetIndex) {
        result.value = node;
        result.done = true;
      }
      return result;
    });
    return node;
  };

  const find = function (targetValue) {
    let index = null;
    index = traverse((node, index, result) => {
      if (node.value == targetValue) {
        result.value = index;
        result.done = true;
      }
      return result;
    });
    return index;
  };

  const contains = function (targetValue) {
    let found = false;
    if (find(targetValue) != null) {
      found = true;
    }
    return found;
  };

  const toString = function () {
    let string = "( ";
    let newString = traverse((node, index, result) => {
      result.value += result.value == null ? '\b\b\b\b'+node.value : node.value;
      result.value += " ) -> ( ";
      return result;
    });
    string += newString == null ? '' : newString;
    string += "\b\bnull";
    return string;
  };

  const insertAt = function (value, targetIndex) {
    if (targetIndex == 0) prepend(value);
    else if (targetIndex == length) append(value);
    else {
      let currentNode = at(targetIndex);
      let previous = backstep(currentNode);
      let newNode = Node(value, currentNode);
      previous.nextNode = newNode;
      length++;
    }
  };

  const removeAt = function (targetIndex) {
    if (targetIndex == length - 1) pop();
    else {
      let currentNode = at(targetIndex);
      let next = currentNode.nextNode;
      length--;
      if (targetIndex == 0) {
        headNode = next;
      } else {
        let previous = backstep(currentNode);
        previous.nextNode = next;
      }
    }
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    pop,
    at,
    find,
    contains,
    insertAt,
    removeAt,
    toString,
  };
};

let list = LinkedList();

console.log(list.toString());
list.append("cat");
console.log(list.toString());
list.append("parrot");
console.log(list.toString());
list.append("hamster");
console.log(list.toString());
list.prepend("dog");
console.log(list.toString());
list.append("snake");
console.log(list.toString());
list.append("turtle");
console.log(list.toString());
list.prepend("rabbit");
console.log(list.toString());
console.log(list.head());
console.log(list.tail());
console.log(list.at(list.size() - 3));
console.log(list.find("cat"));
console.log(list.contains("hamster"));

list.insertAt("wolf", 3);
console.log(list.toString());

console.log(list.pop());
console.log(list.toString());

list.removeAt(4);
console.log(list.toString());
