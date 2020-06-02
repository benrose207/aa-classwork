
// function sum(...nums) {
//     let sum = 0;
//     nums.forEach(num => sum += num);
//     return sum;
// }

function sum() {
    let sum = 0;
    // let args = Array.from(arguments);
    for (let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}

// console.log(sum(1, 2, 3, 4) === 10);
// console.log(sum(1, 2, 3, 4, 5) === 14);


class Cat {
    constructor(name) {
        this.name = name;
    }

    says(sound, person) {
        console.log(`${this.name} says ${sound} to ${person}!`);
        return true;
    }
}

class Dog {
    constructor(name) {
        this.name = name;
    }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");


Function.prototype.myBind = function() {
    const args = Array.from(arguments);
    let context = args.shift();
    let that = this;

    return function () {
        let newArgs = Array.from(arguments);
        that.apply(context, args.concat(newArgs));
    };
};

Function.prototype.myBind = function(context, ...args) {
    // let that = this;
    return (...newArgs) => {                      //fat arrow too good
        this.apply(context, args.concat(newArgs));
    };
};

// markov.says.myBind(pavlov, "meow", "Kush")(); 
// markov.says.myBind(pavlov)("meow", "a tree");
// markov.says.myBind(pavlov, "meow")("Markov");
// const notMarkovSays = markov.says.myBind(pavlov);
// notMarkovSays("meow", "me");

//Non-curried version
// function sumThree(num1, num2, num3) {
//     return num1 + num2 + num3;
// }

function curriedSum(numArgs) {
    const numbers = [];
    function _curriedSum(num) {
        numbers.push(num);
        if (numbers.length === numArgs) {
            let sum = 0;
            numbers.forEach(n => sum += n);
            return sum
        } else { return _curriedSum; }
    }
    return _curriedSum;
}

// const currySum = curriedSum(4);
// // console.log(sum)
// console.log(currySum(5)(30)(20)(1)); // => 56
function sumThree(num1, num2, num3) {
    return num1 + num2 + num3;
};

Function.prototype.curry = function(numArgs) {
    const numbers = []; 
    let that = this;

    return function _curriedSum(num) {
        numbers.push(num);
        if (numbers.length === numArgs) {
            return that.apply(null, numbers);
        } else { return _curriedSum; }
    }
};

Function.prototype.curry = function (numArgs) {
    const args = [];
    let that = this;

    return function _curriedFunction(arg) {
        args.push(arg);
        if (args.length === numArgs) {
            return that(...args);
        } else { return _curriedFunction; }
    }
};

let f1 = sumThree.curry(3); // tells `f1` to wait until 3 arguments are given before running `sumThree`
f1 = f1(4); // [Function]
f1 = f1(20); // [Function]
f1 = f1(6); // = 30
console.log(f1);

// or more briefly:
console.log(sumThree.curry(3)(4)(20)(6)); // == 30