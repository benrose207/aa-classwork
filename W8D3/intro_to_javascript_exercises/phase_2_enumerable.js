Array.prototype.myEach = function (callback) {
    for (let i = 0; i < this.length; i++) {
        callback(this[i]);
    }
};

// [1, 2, 3].myEach(num => console.log(num * 2));

Array.prototype.myMap = function (callback) {
    const result = [];
    this.myEach(ele => {
        result.push(callback(ele));
    });
    return result;
};

// const a = [1, 2, 3];

// console.log(a.myMap(num => num * 2));
// console.log(a);

Array.prototype.myReduce = function (callback, initialValue = null) {
    if (initialValue === null) {
        initialValue = this[0];
        for (let i = 1; i < this.length; i++) {
            initialValue = callback(initialValue, this[i]);
        }
    } else {
        for (const v of this) {
            initialValue = callback(initialValue, v);
        }
    }

    return initialValue;
}

// without initialValue
// const a = [1, 2, 3].myReduce(function (acc, el) {
//     return acc + el;
// }); // => 6
// console.log(a);
// with initialValue
// const b = [1, 2, 3].myReduce(function (acc, el) {
//     return acc + el;
// }, 25); // => 31
// console.log(b);