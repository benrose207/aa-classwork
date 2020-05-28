Array.prototype.uniq = function () {
    return [...new Set(this)];
}

// console.log([1, 2, 2, 2, 2, 3].uniq());

Array.prototype.twoSum = function () {
    const result = [];
    this.forEach((num1, i) => {
        this.slice(i).forEach((num2, j) => {
            if (num1 + num2 === 0) {
                result.push([i, j + i]);
            }
        })
    })
    return result;
}

// console.log([1,-1,2,3,-2].twoSum());

Array.prototype.transpose = function () {
    return this.map((row, i) => {
        return row.map((_, j) => this[j][i])
    })
}

// console.log([[1, 2], [3, 4]].transpose(()));