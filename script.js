// let cartQuantity = 0;
// document.querySelector(
//   "#cartSummary"
// ).innerText = `your Bag has ${cartQuantity} itmes`;

let fName = "Ankit";
document.querySelector("h1").innerText = fName;

const GSTpercentage = 18;
let cartValue = Math.round(
    ((15599 -
        (10 / 100) * 15599 -
        272 +
        (2499 - (41 / 100) * 2499) -
        29 +
        25 +
        20) *
        (100 + GSTpercentage)) /
        100
);
console.log(cartValue);

// 2
let age = 21;
let gender = "female";
let finalDiscount;

if (age <= 5) {
    finalDiscount = 100;
} else if (age <= 8 || gender === "female") {
    finalDiscount = 50;
} else if (age > 65) {
    finalDiscount = 30;
} else {
    finalDiscount = 0;
}
console.log(`your discount is ${finalDiscount}`);

//3
function toCheckEvenOdd(number) {
    if (number % 2 === 0) {
        console.log("it is even");
    } else {
        console.log("it is odd");
    }
}
toCheckEvenOdd(20);

function findLargerNum(num1, num2) {
    return num1 > num2 ? num1 : num2;
}
let result = findLargerNum(97, 98);
console.log(result);

function toFarhenhit(celciusVal) {
    return (9 / 5) * celciusVal + 32;
}

let res = toFarhenhit(34);
console.log(res);

// 4
let product = {
    name: "jeans",
    size: "5",
    fit: "skinnyfit",
};
let copyProduct = product;
copyProduct.size = "xl";
console.log(product);
copyProduct.fit = "regular fit";
console.log(product);
product.deliverytime = "5minutes";
console.log(product);

let obj = {
    mesage: "good morning",
    status: "complete",
};
console.log(obj);

let { mesage, status } = obj;
console.log(mesage);
console.log(status);

function isIdenticalProduct(product, product2) {
    if (typeof product !== "object" && typeof product2) {
        console.warn("try to put object");
        return false;
    }

    if (product === product2) {
        return true;
    }
    if (product.name === product2.name && product.size === product2.size) {
        return true;
    } else {
        return false;
    }
}

let product2 = {
    name: "jeans",
    size: "M",
    fit: "skinnyfit",
};
console.log(isIdenticalProduct(product, ""));
console.log(isIdenticalProduct(product, product));
console.log(isIdenticalProduct(product, product2));

// json:- js object notation
let prod = {
    name: "jeans",
    size: "M",
    fit: "regular",
    rating: {
        stars: 4.5,
        noOfReviews: 498,
    },
};

console.log(prod);
console.log(typeof prod);

let str = JSON.stringify(prod);
console.log(str);
console.log(typeof str);

let newProd = JSON.parse(str);
console.log(newProd);
console.log(typeof newProd);

// localStorage
let pro = {
    name: "jeans",
    size: "M",
    fit: "regular",
};

localStorage.setItem("pro", JSON.stringify(pro));
console.log(pro);
let prod2 = JSON.parse(localStorage.getItem("pro"));
console.log(prod2);
localStorage;

// 5
function doGreeting(personName = "Dear") {
    let date = new Date();
    let hours = date.getHours();
    let heading = document.querySelector(".heading");

    if (hours > 5 && hours < 12) {
        heading.innerText = `Good Morning ${personName}`;
    } else if (hours > 12 && hours < 18) {
        heading.innerText = `Good Evening ${personName}`;
    } else {
        heading.innerText = `Good Night ${personName}`;
    }
}
doGreeting("ANUJ");

let noOfTimesClicked = localStorage.getItem("noOfTimesClicked") || 0;
function buttonPressed() {
    noOfTimesClicked++;
    localStorage.setItem("noOfTimesClicked", noOfTimesClicked);
    updateButton();
}

function updateButton() {
    let button = document.querySelector("#my-btn");
    if (noOfTimesClicked % 2 === 0) {
        button.classList.remove("js-odd");
        button.classList.add("js-even");
    } else {
        button.classList.remove("js-even");
        button.classList.add("js-odd");
    }
    button.innerText = noOfTimesClicked;
}
updateButton();

let num = 1;
while (num <= 10) {
    console.log(num);
    num++;
}

// let nums = [23, 24, 4, 53, 4];
let nums = "hello world";

for (const num of nums) {
    console.log(num);
}

const set = new Set([1, 2, 3]);
for (const value of set) {
    console.log(value); // prints each value in the Set
}

let map = new Map();
map.set("name", "Jack");
map.set("age", "27");
for (const [key, value] of map) {
    console.log(key + " - " + value); // prints each key-value pair in the Map
}

const object = { a: 1, b: 2, c: 3 };
Object.keys(object).forEach((key) => {
    console.log(key, object[key]);
});

// accumulator pattern :
let arr = [1, 2, 3, 4, 5, 6];
let totSum = 0;

arr.forEach((element) => {
    totSum += element;
});
console.log(`sum of the arr is ${totSum}`);

let square = [];
for (let i = 0; i < arr.length; i++) {
    // square = arr[i] * arr[i]; //OR
    square.push(arr[i] * arr[i]);
}
console.log(square);
// accumulator pattern ends :

// 6
let array = [5, 6];
array.unshift(4);
array.push(7);
console.log(array);

// return particular position
let arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
function getElement(arr, position) {
    return arr[position - 1];
}
console.log(getElement(arr, 4));

// copy arr
let arr3 = [1, 2, 3, 4, 5, 6];
let newarr = arr3.slice();
console.log(newarr);

// create while loop that exits after counting 5 prime num
function isPrime(number) {
    for (let i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
        return true;
    }
}

// while loop
let number = 2;
let i = 0;
while (i < 5) {
    if (isPrime(number)) {
        console.log(number);
        i++;
    }
    number++;
}

//print num in reverse order
for (let i = 0; i < 10; i++) {
    console.log(10 - i);
}

// print only positive number
let arr4 = [1, -6, 5, 7, -98];
for (let i = 0; i < arr4.length; i++) {
    if (arr4[i] < 0) continue;
    console.log(arr4[i]);
}
let arr5 = ["javascript", "is", "too", "popular"];
console.log(arr5.join(" "));

// advance functions :-
let sum = function (num1, num2) {
    return num1 + num2;
};
console.log(sum(1, 3));
let newSum = sum;
console.log(newSum(6, 7));

let sumOfThreeNumbers = function (num1, num2, num3, sumOfTwoNumbers) {
    let sum1 = sumOfTwoNumbers(num1, num2);
    return sumOfTwoNumbers(sum1, num3);
};
console.log(sumOfThreeNumbers(4, 5, 6, sum));

let sum1 = (num1, num2) => {
    return num1 * num2;
};
console.log(sum1(4, 5));

// let timerId = setTimeout(() => {
//   console.log("hi iam john");
// }, 5000);
// clearTimeout(timerId);

let alarm = () => console.log(`subha hogyi", ${new Date()}`);
// setInterval(alarm, 1000);

// to run a task for specfic time
let intervalId = setInterval(alarm, 1000);
setTimeout(() => clearInterval(intervalId), 1000);

// SET-TIMEOUT MEANS 1 BAAR EXECUTE && SET-INTERVAL MEANS HAR EK INTERVAL KE BAAD BAAR^2

// event Listner :-
let button = document.querySelector("#event-btn");

let behaviour = () => console.log("hello");
button.addEventListener("click", behaviour);

let printDate = () => console.log(new Date());
button.addEventListener("click", printDate);

// foreach
let arr6 = [1, 2, 3, 4, 5, 6];
arr6.forEach((elem) => {
    console.log(elem);
});

function searchNum(arr6, num) {
    for (let i = 0; i < arr6.length; i++) {
        if (arr6[i] === num) {
            console.log(`element has found at: ${i}`);
            return;
        }
    }
    console.log("element not found");
}
searchNum(arr6, 3);

// 7
let multiply = (num1, num2) => {
    return num1 * num2;
};
console.log(multiply(2, 4));

let PrintOp = () => console.log("hello");
let runTwice = (inputFunction) => {
    inputFunction();
    inputFunction();
};
console.log(runTwice(PrintOp));

let btnElement = document.querySelector("#btn-grow");
btnElement.addEventListener("click", () => {
    setTimeout(doubleBtn, 2000);
});
function doubleBtn() {
    btnElement.classList.add("js-double-btn");
}

let arrray = [1, 2, 3, 4, 5, 6, 7];
let summ = 0;
arrray.forEach((number) => (summ += number));
console.log(summ);

let squares = arrray.map((num) => num * num);
console.log(squares);
