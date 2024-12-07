const Node = function (value, nextNode) {
  return {
    value: value,
    nextNode: nextNode,
  };
};

const linkedList = function () {
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
    while (currentNode.nextNode != null) {
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
    } else tailNode.nextNode = newNode;
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
    let node = traverse((node, index) => {
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
    string = traverse((node, index, result) => {
      result.value += node.value + " ) -> ( ";
      return result;
    });
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
    if (targetIndex == length-1) pop();
    else {
      let currentNode = at(targetIndex);
      let next = currentNode.nextNode;
      length--;
      if (targetIndex == 0) {
        headNode = next;
      }
      else{
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
