// Get form elements by ID
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Example usage:
console.log(usernameInput.value);
console.log(emailInput.value);
console.log(passwordInput.value);
console.log(confirmPasswordInput.value);

function listReqiuredFields(formName) {
  //console.log(formName);
  const requiredFields = document.forms[formName].querySelectorAll('.required');
  // requiredFields.forEach((field) => {
  //   console.log(field.id);
  // });

  return requiredFields;
}

function checkRequired(inputArr) {
  inputArr.forEach((input) => {
    //if (!input.classList.contains('error')) {
    if (input.value.trim() === '') {
      showError(input, `${getFieldName(input)} is required`);
    } else {
      showSuccess(input);
    }
    //}
  });
}

function checkInputLength(input) {
  const minLength = input.getAttribute('minlength');
  console.log(minLength);

  // if (!input.classList.contains('error')) {
  if (input.value.length < 6) {
    showError(input, `${getFieldName(input)} must be at least 6 characters`);
  } else {
    showSuccess(input);
  }
  // }
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
// Get fieldname
function getFieldName(input) {
  const label = input.parentElement.querySelector('label');
  return label.innerText; // input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

function validateEmail(email) {
  //const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

// Show input error message
function showError(input, message) {
  //const formControl = input; //.parentElement;
  input.classList.remove('success');
  input.classList.add('error');
  const small = input.parentElement.querySelector('small');
  small.classList.add('show');
  small.innerText = message;
}

// Show success outline
function showSuccess(input) {
  //const formControl = input; //.parentElement;
  input.classList.remove('error');
  input.classList.add('success');
  const small = input.parentElement.querySelector('small');
  small.classList.remove('show');
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

  checkRequired(listReqiuredFields('register'));
  checkInputLength(passwordInput);
  checkEmail(emailInput);

  // Perform form validation here
  // if (usernameInput.value === '') {
  //   showError(usernameInput, 'Username cannot be blank');
  // } else {
  //   showSuccess(usernameInput);
  // }

  // if (emailInput.value === '') {
  //   showError(emailInput, 'Email cannot be blank');
  // } else if (!validateEmail(emailInput.value)) {
  //   showError(emailInput, 'Email is not valid');
  // } else {
  //   showSuccess(emailInput);
  // }

  // if (passwordInput.value === '') {
  //   showError(passwordInput, 'Password cannot be blank');
  // } else {
  //   showSuccess(passwordInput);
  // }

  // if (confirmPasswordInput.value === '') {
  //   showError(confirmPasswordInput, 'Confirm password cannot be blank');
  // } else if (passwordInput.value !== confirmPasswordInput.value) {
  //   showError(confirmPasswordInput, 'Passwords do not match');
  // } else {
  //   showSuccess(confirmPasswordInput);
  // }
});
