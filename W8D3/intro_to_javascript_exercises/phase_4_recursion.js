/**
 * Receives a start and end value, returns an array from start up to end
 *
 * @param {number} start
 * @param {number} end
 * @returns {number[]}
 */
function range(start, end) {
    if (end <= start) return [];
    const result = range(start, end - 1);
    result.push(end - 1);
    return result;
}

// console.log(range(2, 5));

function sumRec(array) {
    if (array.length === 0) return 0;

    return sumRec(array.slice(1)) + array[0];
}

// console.log(sumRec([1,2,3,4]));

function exponent(base, exp) {
    if (exp === 0) return 1;

    return base * exponent(base, exp - 1);
}

// console.log(exponent(2,10));

function fastExponent(base, exp) {
    if (exp === 0) return 1;
    if (exp === 1) return base;

    if (exp % 2 === 0) {
        const temp = exponent(base, exp / 2);
        return temp * temp;
    } else {
        const temp = exponent(base, (exp - 1) / 2);
        return base * temp * temp;
    }
}

// console.log(fastExponent(2,10));

/**
 * receives an integer, n, and returns the first n Fibonacci numbers.
 *
 * @param {number} n
 * @returns {number[]}
 */
function fibonacci(n) {
    if (n === 0) return [];
    if (n === 1) return [1];
    if (n === 2) return [1, 1];

    const seq = fibonacci(n - 1);
    seq.push(seq[seq.length - 1] + seq[seq.length - 2]);
    return seq;
}

// console.log(fibonacci(10));

function deepDup(array) {
    if (!(array instanceof Array)) return array;
    const result = [];
    array.forEach((ele) => {
        result.push(deepDup(ele));
    })
    return result;
}

// console.log(deepDup([[12], 1, [2, [3]]]));

/**
 * Receives a sorted array, returns the index of the target or -1 if not found.
 *
 * @param {Array<any>} array
 * @param {any} target
 * @returns {number}
 */
function bsearch(array, target) {
    if (array.length === 0) return -1;
    const mid = array.length >> 1;
    if (array[mid] === target) {
        return mid;
    } else if (array[mid] > target) {
        const left = array.slice(0, mid);
        return bsearch(left, target);
    } else {
        const right = array.slice(mid + 1);
        const result = bsearch(right, target);
        if (result === -1) return -1;
        return result + mid + 1;
    }
}

// console.log(bsearch([1, 2, 3, 4, 5], 1));
// console.log(bsearch([1, 2, 3, 4, 5], 2));
// console.log(bsearch([1, 2, 3, 4, 5], 5));
// console.log(bsearch([1, 2, 3, 4, 5], 4));
// console.log(bsearch([1, 2, 3, 4, 5, 6], 4));
// console.log(bsearch([1, 2, 3, 4, 5, 6], -100));

/**
 * Receives an array, returns a sorted copy of the array by implementing merge sort sorting algorithm.
 *
 * @param {Array<any>} array
 * @returns {Array<any>}
 */
function mergesort(array) {

    /**
     * Merge two arrays while maintaining their orders.
     *
     * @param {Array<any>} left
     * @param {Array<any>} right
     * @returns {Array<any>}
     */
    function merge(left, right) {
        const result = [];

        while (left.length > 0 && right.length > 0) {
            if (left[0] < right[0]) {
                result.push(left.shift());
            } else {
                result.push(right.shift());
            }
        }

        result.push(...left, ...right);
        return result;
    }

    if (array.length <= 1) return array;
    const mid = array.length >> 1;
    const left = array.slice(0, mid);
    const right = array.slice(mid);
    const sortedLeft = mergesort(left);
    const sortedRight = mergesort(right);

    return merge(sortedLeft, sortedRight);
}

// console.log(mergesort([1,-3,6,19,1,-10]));

/**
 * Receives an array, returns an array containing all the subsets of the original array.
 *
 * @param {Array<any>} array
 * @returns {Array<Array<any>>}
 */
function subsets(array) {
    if (array.length === 0) return [];
    if (array.length === 1) return [array];

    const left = array.slice(0, array.length - 1);
    const right = array.slice(1);

    return [...new Set([...subsets(left).concat(subsets(right)), left, right, array])];
}

console.log(subsets([1, 2, 3, 4])) /* [[1],[2],[3],[1,2],[1,2,3],[2,3]] */
// [1][2][1,2]
// first = first ele (1)
// add to result

// iterate through remaining elements
// for each:
//     add to result
//     add to first and add to result