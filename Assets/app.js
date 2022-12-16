/*
Name: Sandeep Singh
Student Number: 162054217
Email: ssingh1224@myseneca.ca
Section: NFF
*/

let menu = document.querySelector('.menu-icon');
let navbar = document.querySelector('.nav-links');

menu.addEventListener('click', function() {
    navbar.classList.toggle('sidebar');
    menu.classList.toggle('change');
});

window.onscroll = () => {
    navbar.classList.remove('sidebar');
    menu.classList.remove('change');
}

let hiringRadioButton = document.getElementById('hiring');
let questionRadioButton = document.getElementById('question');
let commentRadioButton = document.getElementById('comment');

var clicked = 0;

hiringRadioButton.addEventListener('click', function() {
    if (clicked == 0) {
        generatePayRateInput();
        clicked++;
    }
});

questionRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

commentRadioButton.addEventListener('click', function() {
    if (clicked > 0) {
        deletePayRateInput();
        clicked = 0;
    }
});

function generatePayRateInput() {
    let break1 = document.createElement('br');
    break1.id = 'b1';
    let break2 = document.createElement('br');
    break2.id = 'b2';
    let break3 = document.createElement('br');
    break3.id = 'b3';

    const node1 = document.createElement("label");
    const textNode = document.createTextNode("Expected Hourly Rate: ");
    node1.appendChild(textNode);
    node1.id = 'payRateLabel';

    const node2 = document.createElement("input");
    node2.id = 'payRate';
    node2.type = 'number';
    node2.step = '0.1';
    node2.placeholder = 'Hourly Pay';
    node2.classList.add('format')

    document.querySelector(".radio-btns").appendChild(break1);
    document.querySelector(".radio-btns").appendChild(break2);
    document.querySelector(".radio-btns").appendChild(node1);
    document.querySelector(".radio-btns").appendChild(break3);
    document.querySelector(".radio-btns").appendChild(node2);
}

function deletePayRateInput() {
    let label = document.getElementById('payRateLabel');
    let input = document.getElementById('payRate');
    let div = document.querySelector(".radio-btns");
    let b1 = document.getElementById('b1');
    let b2 = document.getElementById('b2');
    let b3 = document.getElementById('b3');

    div.removeChild(b1);
    div.removeChild(b2);
    div.removeChild(b3);
    div.removeChild(input);
    div.removeChild(label);
}

// *************** VALIDATIONS ********************
let errors = [];
const form = document.getElementById('contact-form');
const errorList = document.getElementById('error');

form.addEventListener('submit', (e) => {
    errors = [];

    validateName();
    validateEmail();
    validateAddress();
    validateCity();
    validatePostalCode();
    validateMessage();

    if (clicked > 0) {
        validatePay();
    }

    if (errors.length > 0) {
        e.preventDefault();
        errorList.innerHTML = `
        <h3>Incorrect Inputs Provided:</h3>
        <pre>${errors.join('\r\n')}</pre>
        `;
    }
})

form.addEventListener('reset', (e) => {
    errors = [];
    errorList.innerHTML = '';
})

function validateName() {
    const name = document.getElementById('name');
    if(isRequired(name, 'Name')) {
        areAlphabets(name, '- Please enter a valid Name with all alphabetic characters.');
    }
}

function validateEmail() {
    const email = document.getElementById('email');
    if (isRequired(email, 'Email')) {
        let validEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        if (!(email.value.match(validEmail))) {
            errors.push("- Please enter a valid Email Address.");
        }
    }    
}

function validateAddress() {
    const address = document.getElementById('address');
    if (isRequired(address, 'Address')) {
        if (address.value.length < 10) {
            errors.push("- Please enter a valid Address 10 or more characters long.");
        }
    }
}

function validateCity() {
    const city = document.getElementById('city');
    if(isRequired(city, 'City')) {
        areAlphabets(city, '- Please enter a valid City with all alphabetic characters (or choose from the list).');
    }
}

function validatePostalCode() {
    let postalCode = document.getElementById('pCode');
    let validPostal = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
    if (!(postalCode.value.match(validPostal))) {
        errors.push("- Invalid Postal Code");
    }
}

function validateMessage() {
    const message = document.getElementById('message');
    if (isRequired(message, 'Message')) {
        if (message.value.length < 10) {
            errors.push("- Message should be atleast 5 characters long");
        }
    }
}

function validatePay() {
    let input = document.getElementById('payRate');
    if (input.value <= 0) {
        errors.push("- Please Enter an appropriate expected hourly pay rate")
    }
}

function isRequired(element, elementName) {
    result = true;
    if (element.value === '' || element.value == null) {
        errors.push(`- ${elementName} is required`);
        result = false;
    }

    return result;
}

function areAlphabets(element, error) {
    let validRegex = /^[A-Za-z\s]+$/;
    if (!(element.value.match(validRegex))) {
        errors.push(error);
    }
}
