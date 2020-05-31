class Clock {
    constructor() {
        // 1. Create a Date object.
        // 2. Store the hours, minutes, and seconds.
        // 3. Call printTime.
        // 4. Schedule the tick at 1 second intervals.
        let currentDate = new Date();
        this.hours = currentDate.getHours();
        this.minutes = currentDate.getMinutes();
        this.seconds = currentDate.getSeconds();
        this.printTime();
        // let timer = setInterval(this._tick, 1000);
        // let that = this;
        // let timer = setInterval(function(){ console.log(that) }, 1000);
        let timer = setInterval(this._tick.bind(this), 1000)
    }

    printTime() {
        // Format the time in HH:MM:SS
        // Use console.log to print it.
        console.log(`${this.hours}:${this.minutes}:${this.seconds}`);
    }

    _tick() {
        // 1. Increment the time by one second.
        // 2. Call printTime.
        this.seconds += 1;
        this.printTime();
    }
}

// const clock = new Clock();


const readline = require("readline");

reader = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function addNumbers(sum = 0, numsLeft, completionCallback) {
    if (numsLeft > 0) {
        reader.question("Enter a number: ", input => {
            let num = parseInt(input);
            sum += num;
            console.log(sum);
            addNumbers(sum, numsLeft - 1, completionCallback);
        });
    } else {
        completionCallback(sum);
        reader.close();
    }
}
// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

function askIfGreaterThan(el1, el2, callback) {
    reader.question(`is ${el1} greater than ${el2}?`, input => {
        if (input === 'yes') {
            callback(true);
        } else {
            callback(false);
        }
    });
}
// askIfGreaterThan(1, 2, answer => console.log(answer));

function innerBubbleSortLoop(arr, i = 0, madeAnySwaps, outerBubbleSortLoop) {
    if (i < arr.length - 1) {
        askIfGreaterThan(arr[i], arr[i + 1], input => {
            if (input === true) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                madeAnySwaps = true;
            }
            innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
        })
    } else if (i == arr.length - 1) {
        outerBubbleSortLoop(madeAnySwaps);
    }
}

// innerBubbleSortLoop([3,2,7,5,1], 0, false, () => console.log("In outer bubble sort loop"));

function absurdBubbleSort(arr, sortCompletionCallback) {
    function outerBubbleSortLoop(madeAnySwaps) {
        if (madeAnySwaps) {
            innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
        } else {
            sortCompletionCallback(arr);
            reader.close();
        }
    }
    outerBubbleSortLoop(true);
}

reader.close();
// absurdBubbleSort([2,1]), function (arr) {
//     console.log("Sorted array: " + JSON.stringify(arr));
// });

// 
Function.prototype.myBind = function (context) {
    let that = this
    return (function() {that.apply(context)})
} 

class Lamp {
    constructor() {
        this.name = "a lamp";
    }
}

const turnOn = function () {
    console.log("Turning on " + this.name);
};

const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"

Function.prototype.myThrottle = function(interval) {
    let tooSoon = false;

    return () => {
        if (!tooSoon) {
            tooSoon = true;
            setTimeout(() => tooSoon = false, interval);
            this();
        } 
    }
}

class Neuron {
    fire() {
        console.log("Firing!");
    }
}

const neuron = new Neuron();
// When we create a new Neuron,
// we can call #fire as frequently as we want

// The following code will try to #fire the neuron every 10ms. Try it in the console:
// const interval = setInterval(() => {
//     neuron.fire();
// }, 1000);

// You can use clearInterval to stop the firing:
// clearInterval(interval);

// Using Function#myThrottle, we should be able to throttle
// the #fire function of our neuron so that it can only fire
// once every 500ms:

// neuron.fire();
neuron.fire = neuron.fire.myThrottle(5000);

// const interval = setInterval(() => {
//     neuron.fire();
// }, 1000);

// This time, if our Function#myThrottle worked correctly,
// the Neuron#fire function should only be able to execute
// every 500ms, even though we're still trying to invoke it
// every 10ms!

// If we want this behavior for ALL neurons, we can do the same logic in the constructor:

// class Neuron {
//     constructor() {
//         this.fire = this.fire.myThrottle(5000);
//     }

//     fire() {
//         console.log("Firing!");
//     }
// }

class SearchBar {
    constructor() {
        this.query = "";

        this.type = this.type.bind(this);
        this.search = this.search.bind(this);
    }

    type(letter) {
        this.query += letter;
        this.search();
    }

    search() {
        console.log(`searching for ${this.query}`);
    }
}

const searchBar = new SearchBar();

const queryForHelloWorld = () => {
    searchBar.type("h");
    searchBar.type("e");
    searchBar.type("l");
    searchBar.type("l");
    searchBar.type("o");
    searchBar.type(" ");
    searchBar.type("w");
    searchBar.type("o");
    searchBar.type("r");
    searchBar.type("l");
    searchBar.type("d");
};

Function.prototype.myDebounce = function (interval) {
    let timeout;

    return (...args) => {
        const newFunction = () => {
            timeout = null;
            this(...args);
        }
        clearTimeout(timeout);
        timeout = setTimeout(newFunction, interval);
    }
}
searchBar.search = searchBar.search.myDebounce(2000);

queryForHelloWorld();