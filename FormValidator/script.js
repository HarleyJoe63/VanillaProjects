// Get form elements by ID
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

var message = {
  inputField: '',
  priority: 0,
  message: '',
};

// Example usage:
console.log(usernameInput.value);
console.log(emailInput.value);
console.log(passwordInput.value);
console.log(confirmPasswordInput.value);

function listReqiuredFields(formName) {
  const requiredFields = document.forms[formName].querySelectorAll('.required');
  return requiredFields;
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    const minLen = input.dataset.minlen;
    const maxLen = input.dataset.maxlen;

    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      if (minLen !== undefined && input.value.length < minLen) {
        showError(input, `${getFieldName(input)} must be at least ${minLen} characters`);
      } else if (maxLen !== undefined && input.value.length > maxLen) {
        showError(input, `${getFieldName(input)} must be less than ${maxLen} characters`);
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
    showError(input, `${getFieldName(input)} must be at least ${minLen} characters`);
  } else if (input.value.length > maxLen) {
    showError(input, `${getFieldName(input)} must be less than${maxLen} characters`);
  } else {
    showSuccess(input);
  }
}

function checkEmail(input) {
  if (!input.classList.contains('error')) {
    if (!validateEmail(input.value)) {
      showError(input, `${getFieldName(input)} is not valid`);
    } else {
      showSuccess(input);
    }
  }
}

function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, `${getFieldName(input2)} must match ${getFieldName(input1)}`);
  } else {
    showSuccess(input2);
  }
}

function checkPasswordRequirements(input) {
  const minValid = input.dataset.valid;

  if (minValid !== undefined) {
    var reMsg = '';

    minValid.split('').forEach((item) => {
      if (item === 'A') {
        if (input.value.match(/[A-Z]/) === null) reMsg = `${getFieldName(input)} must contain at least one uppercase letter`;
      } else if (item === 'a') {
        if (input.value.match(/[a-z]/) === null) reMsg = `${getFieldName(input)} must contain at least one lowercase letter`;
      } else if (item === '0') {
        if (input.value.match(/[0-9]/) === null) reMsg = `${getFieldName(input)} must contain at least one number`;
      } else if (item === '$') {
        if (input.value.match(/[^A-Za-z0-9]/) === null) reMsg = `${getFieldName(input)} must contain at least one special character`;
      }
    });

    if (reMsg !== '') showError(input, reMsg);
    else showSuccess(input);
  }
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

// Example usage:
const email = 'test@example.com';
if (validateEmail(email)) {
  console.log('Email is valid');
} else {
  console.log('Email is invalid');
}

listReqiuredFields('register');

// Add submit event listener to the form
const form = document.getElementById('register');
form.addEventListener('submit', function (event) {
  event.preventDefault();

  // console.log(usernameInput.value);
  // console.log(emailInput.value);
  // console.log(passwordInput.value);
  // console.log(confirmPasswordInput.value);

  const checkFields = listReqiuredFields('register');

  clearErrors(checkFields);
  checkRequired(checkFields);
  checkInputLength(passwordInput);
  checkEmail(emailInput);
  checkPasswordRequirements(passwordInput);
  checkPasswordsMatch(passwordInput, confirmPasswordInput);
});
