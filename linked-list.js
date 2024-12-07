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

  const find = function () {};

  const contains = function () {};

  const toString = function () {
    let string = "( ";
    string = traverse((node, index, result) => {
      result.value += node.value+' ) -> ( ';
      return result;
    });
    string += '\b\bnull';
    return string;
  };

  const insertAt = function () {};

  const removeAt = function () {};

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
