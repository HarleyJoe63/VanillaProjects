// Get form elements by ID
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

const trueTypeOf = (value) => {
  const type = typeof value;

  if (type === 'number') {
    if (Number.isInteger(value)) return 'integer';
    return 'float';
  }
  if (type === 'function') {
    if (/^\s*class\s+/.test(value.toString())) return 'class';
    return 'function';
  }
  if (type !== 'object') return type;
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (value.constructor.name === 'Object') return 'dictionary';
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
};

// Message constructor function
class Message {
  inputField;
  message;
  order;

  constructor(inputField, message, order) {
    this.inputField = inputField;
    this.message = message;
    this.order = order;
  }
}

class MessageList {
  constructor() {
    this.messages = [];
  }

  #index = 1;

  addMessage(message) {
    message.order = this.#index++;
    this.messages.push(message);
  }

  getMessages() {
    return this.messages;
  }
}

var messages = new MessageList();

function listReqiuredFields(formName) {
  const requiredFields = document.forms[formName].querySelectorAll('.required');
  return requiredFields;
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    const minLen = input.dataset.minlen;
    const maxLen = input.dataset.maxlen;

    if (input.value.trim() === '') {
      //showError(input, `${getFieldName(input)} is required`);
      addValidationMessage(input, `${getFieldName(input)} is required`);
    } else {
      if (minLen !== undefined && input.value.length < minLen) {
        //showError(input, `${getFieldName(input)} must be at least ${minLen} characters`);
        addValidationMessage(input, `${getFieldName(input)} must be at least ${minLen} characters`);
      } else if (maxLen !== undefined && input.value.length > maxLen) {
        //showError(input, `${getFieldName(input)} must be less than ${maxLen} characters`);
        addValidationMessage(input, `${getFieldName(input)} must be less than ${maxLen} characters`);
      } else {
        showSuccess(input);
      }
    }
  });
}

function checkInputLength(input) {
  const minLen = input.dataset.minlen;
  const maxLen = input.dataset.maxlen;

  // if (!input.classList.contains('error')) {
  if (input.value.length < minLen) {
    //showError(input, `${getFieldName(input)} must be at least ${minLen} characters`);
    addValidationMessage(input, `${getFieldName(input)} must be at least ${minLen} characters`);
  } else if (input.value.length > maxLen) {
    //showError(input, `${getFieldName(input)} must be less than${maxLen} characters`);
    addValidationMessage(input, `${getFieldName(input)} must be less than${maxLen} characters`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  if (!input.classList.contains('error')) {
    if (!validateEmail(input.value)) {
      //showError(input, `${getFieldName(input)} is not valid`);
      addValidationMessage(input, `${getFieldName(input)} is not valid`);
    } else {
      showSuccess(input);
    }
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    //showError(input2, `${getFieldName(input2)} must match ${getFieldName(input1)}`);
    addValidationMessage(input2, `${getFieldName(input2)} must match ${getFieldName(input1)}`);
  } else {
    showSuccess(input2);
  }
}

function checkPasswordRequirements(input) {
  const minValid = input.dataset.valid;

  if (minValid !== undefined) {
    var msg = '';

    minValid.split('').forEach((item) => {
      if (item === 'A') {
        if (input.value.match(/[A-Z]/) === null) {
          msg = `${getFieldName(input)} must contain at least one uppercase letter`;
          addValidationMessage(input, msg);
        }
      }

      if (item === 'a') {
        if (input.value.match(/[a-z]/) === null) {
          msg = `${getFieldName(input)} must contain at least one lowercase letter`;
          addValidationMessage(input, msg);
        }
      }

      if (item === '0') {
        if (input.value.match(/[0-9]/) === null) {
          msg = `${getFieldName(input)} must contain at least one number`;
          addValidationMessage(input, msg);
        }
      }

      if (item === '$') {
        if (input.value.match(/[^A-Za-z0-9]/) === null) {
          msg = `${getFieldName(input)} must contain at least one special character`;
          addValidationMessage(input, msg);
        }
      }
    });
  }
}

function addValidationMessage(input, message) {
  const msg = new Message(getFieldName(input), message);
  messages.addMessage(msg);
}

// Get fieldname
function getFieldName(input) {
  const label = input.parentElement.querySelector('label');
  const fieldName = label.dataset.name;
  return fieldName === undefined ? label.innerText : fieldName; //; // input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

function clearErrors(inputArr) {
  inputArr.forEach((input) => {
    input.classList.remove('error');
    input.classList.remove('success');
    const small = input.parentElement.querySelector('small');
    small.classList.remove('show');
    small.innerText = '#';
  });
}

// Show input error message
function showError(input, message) {
  input.classList.remove('success');
  input.classList.add('error');
  const small = input.parentElement.querySelector('small');
  small.classList.add('show');
  if (small.innerText === '#') small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  input.classList.remove('error');
  input.classList.add('success');
  const small = input.parentElement.querySelector('small');
  small.classList.remove('show');
  small.innerText = '#';
}

function showValidationMessages(fields) {
  const msgList = messages.getMessages();

  fields.forEach((input) => {
    const fieldName = getFieldName(input);
    const topMessage = Array.from(
      messages
        .getMessages()
        .filter((i) => i.inputField === fieldName)
        .sort((a, b) => a.order - b.order)
    )[0];

    if (topMessage !== undefined) {
      showError(input, topMessage.message);
    } else {
      showSuccess(input);
    }
  });
}

// Add submit event listener to the form
const form = document.getElementById('register');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  messages = new MessageList();

  const checkFields = listReqiuredFields('register');

  clearErrors(checkFields);
  checkRequired(checkFields);
  checkInputLength(passwordInput);
  checkEmail(emailInput);
  checkPasswordRequirements(passwordInput);
  checkPasswordsMatch(passwordInput, confirmPasswordInput);

  showValidationMessages(checkFields);

  // console.log(messages.getMessages());
  // console.log(messages.getMessages().filter((i) => i.inputField === 'Password').length);

  // var x = messages
  //   .getMessages()
  //   .filter((i) => i.inputField === 'Password')
  //   .sort((a, b) => a.order - b.order);
  // console.log(x[x.length - 1].message);

  // try {
  //   const x = Array.from(
  //     messages
  //       .getMessages()
  //       .filter((i) => i.inputField === 'Password')
  //       .sort((a, b) => a.order - b.order)
  //   )[0];
  //   console.log(x.message);
  // } catch (error) {
  //   console.log(`Error: ${error}`);
  // }

  //.forEach((element) => {
  //console.log(`${element.inputField}: Order ${element.order} says "${element.message}"`);
  //});
});
