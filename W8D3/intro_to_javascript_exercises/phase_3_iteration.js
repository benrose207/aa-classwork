Array.prototype.bubbleSort = function () {
  let sorted = false;

  while (!sorted) {
      sorted = true;

      for (let i = 0; i < this.length - 1; i++) {
          if (this[i] > this[i + 1]) {
              [this[i], this[i + 1]] = [this[i + 1], this[i]];
              sorted = false;
          }
      }
  }
  return this;
}

// console.log([2, 4, 1, -1, 200, -1000, 300].bubbleSort())

String.prototype.substrings = function () {
  const result = []
  for (let i = 0; i < this.length; i++) {
      for (let j = i; j < this.length; j++) {
          result.push(this.slice(i, j + 1));
      }
  }
  return result;
}

// console.log("word".substrings());