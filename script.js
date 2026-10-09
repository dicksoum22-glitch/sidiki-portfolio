// script.js
// Sidiki Camara - Portfolio Assignment
// Based strictly on JS Fundamentals course

// =====================================================
// JAVASCRIPT COMMENTS
// =====================================================
// This is a single line comment.
/* This is a
   multi-line comment. */


// =====================================================
// JS DATA TYPES
// =====================================================
let age = 21;
let gpaScore = 3.8;

let major = "Web Development";
let city = "Conakry";

let isStudent = true;
isStudent = false; // dynamic type

const student = { firstName: "Sidiki", lastName: "Camara" };
const skills = ["HTML", "CSS", "JavaScript"];
const enrollDate = new Date("2023-09-01");

console.log(age, gpaScore, major, city, isStudent);
console.log(student, skills, enrollDate);


// =====================================================
// DECLARING VARIABLES: let and const
// =====================================================
let gpa;
let studentName = "Sidiki";
let majorOfStudy = "Web Development", listOfCourses;

let numX = 10;
{
    let numX = 2;
    console.log("Inside block:", numX);
}
console.log("Outside block:", numX);

// const: cannot be reassigned, but array elements / object
// properties can still be changed
const skillsConst = ["HTML", "CSS", "JavaScript"];
skillsConst[0] = "HTML5";
skillsConst.push("React");

const laptop = { brand: "Dell", model: "Inspiron", color: "Black" };
laptop.color = "Silver";
laptop.owner = "Sidiki";

console.log(skillsConst);
console.log(laptop);


// =====================================================
// JAVASCRIPT IDENTIFIERS
// =====================================================
let firstname, firstName2;
firstName2 = "Sidiki";
firstname = "Camara";
console.log(firstname, firstName2);


// =====================================================
// JS OPERATIONS AND EXPRESSIONS
// =====================================================
let num1 = 15;
let num2 = 4;

let total = num1;
total += num2;

console.log(num1 + num2, num1 - num2, num1 * num2, num1 / num2, num1 % num2);
console.log(num1 > num2, num1 === num2);
console.log(num1 > num2 && num2 > 0);


// =====================================================
// SELECTION STATEMENT
// =====================================================
let time = 14;
let greeting;
if (time < 10) {
    greeting = "Good morning";
} else if (time < 20) {
    greeting = "Good day";
} else {
    greeting = "Good evening";
}
console.log(greeting);

let level = "1";
let levelText;
switch (level) {
    case "0":
        levelText = "Beginner";
        break;
    case "1":
        levelText = "Intermediate";
        break;
    default:
        levelText = "No value found";
}
console.log(levelText);


// =====================================================
// LOOP STATEMENTS
// =====================================================
for (let i = 0; i < 3; i++) {
    console.log("for loop:", i);
}

let w = 0;
while (w < 3) {
    console.log("while loop:", w);
    w++;
}

let d = 0;
do {
    console.log("do/while loop:", d);
    d++;
} while (d < 3);


// =====================================================
// JAVASCRIPT BREAK AND CONTINUE
// =====================================================
for (let i = 0; i < skills.length; i++) {
    if (skills[i] === "CSS") {
        continue;
    }
    if (skills[i] === "JavaScript") {
        break;
    }
    console.log("Checking:", skills[i]);
}


// =====================================================
// JAVASCRIPT STRINGS
// =====================================================
let fullNameStr = "Sidiki Camara";
console.log(fullNameStr.length);
console.log(fullNameStr.slice(0, 6));
console.log(fullNameStr.toUpperCase());
console.log(fullNameStr.toLowerCase());
console.log(fullNameStr.replace("Sidiki", "S."));
console.log(fullNameStr.trim());
console.log(fullNameStr.charAt(0));


// =====================================================
// JAVASCRIPT STRING SEARCH
// =====================================================
console.log(fullNameStr.indexOf("Camara"));
console.log(fullNameStr.includes("Sidiki"));
console.log(fullNameStr.startsWith("Sidiki"));
console.log(fullNameStr.endsWith("Camara"));


// =====================================================
// JAVASCRIPT NUMBER METHODS
// =====================================================
let score = 87.456;
console.log(score.toString());
console.log(score.toFixed(2));


// =====================================================
// ARRAY DECLARATION AND PROPERTIES/METHODS
// =====================================================
const subjects = ["HTML", "CSS", "JavaScript"];
console.log(subjects.length);
console.log(Array.isArray(subjects));

skills.sort();
console.log(skills);


// =====================================================
// LOOP ARRAY ELEMENTS
// =====================================================
const hobbies = ["Coding", "Reading", "Football", "Music"];
let hLen = hobbies.length;
let listText = "<ul>";
for (let i = 0; i < hLen; i++) {
    listText += "<li>" + hobbies[i] + "</li>";
}
listText += "</ul>";
console.log(listText);

hobbies.forEach(myFunction);
function myFunction(value) {
    console.log("forEach:", value);
}


// =====================================================
// FUNCTION
// =====================================================
function fullName(first, last) {
    return first + " " + last;
}
console.log(fullName("Sidiki", "Camara"));


// =====================================================
// JAVASCRIPT ARROW FUNCTION
// =====================================================
let multiply = (a, b) => a * b;
console.log(multiply(6, 7));


// =====================================================
// OBJECT
// =====================================================
const portfolioInfo = {
    key1: "Web Development",
    key2: "Computer Science"
};
console.log(portfolioInfo.key1);
console.log(portfolioInfo["key2"]);


// =====================================================
// OBJECTS METHOD
// =====================================================
const me = {
    firstName: "Sidiki",
    lastName: "Camara",
    id: 2026,
    fullName: function () {
        return this.firstName + " " + this.lastName;
    }
};
console.log(me.fullName());


// =====================================================
// SHOW DATA
// =====================================================
console.log("Script finished running.");
// --- Contact form: send to backend ---
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const fullname = document.getElementById('fullname').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ fullname, email, message })
            });

            const result = await response.json();

            if (response.ok) {
                alert(result.message);
                contactForm.reset();
            } else {
                alert(result.error || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            alert('Could not reach the server. Please try again later.');
            console.error(err);
        }
    });
}