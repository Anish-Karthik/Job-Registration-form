import { validateRadioButtons, validateSelectBox, validateFile, validateCheckbox } from './validate.js';
import validateTextField from './validateTextField.js';

const textFields = ['firstName', 'lastName', 'phone', 'email', 'address',
  'college', 'cgpa', 'coverLetter', 'expectedSalary', 'reference'];	
const GenderRadioButtons = ['male', 'female', 'other'];
const SelectBoxes = ['country', 'state', 'city', 'experience', 'role'];
const Files = ['resume'];
const RadioButtonContainer = ['gender-container'];
const CheckboxContainer = ['howDidYouHearAboutUs', 'terms-details'];

export const data = {};
const form = document.querySelector('form');

form.addEventListener('submit', (e) => {
  let allValid = true;
  removeErrors();
  allValid = validateInput('text', textFields, validateTextField) && allValid;
  if(allValid)
  allValid = validateInput('select', SelectBoxes, validateSelectBox) && allValid;
  if(allValid)
  allValid = validateInput('file', Files, validateFile) && allValid;
  if(allValid)
  allValid = GenderValidation() && allValid;
  if(allValid)
  allValid = validateCheckbox("howDidYouHearAboutUs", 2) && allValid;
  if(allValid)
  allValid = validateCheckbox("terms-details") && allValid;
  if(!allValid) {
    e.preventDefault();
    return false;
  }
  alert('form submitted');
  console.log(data);
});
form.addEventListener('reset', () => {
  removeErrors();
});


function GenderValidation() {
  try {
    const {isValid, value} = validateRadioButtons(
      GenderRadioButtons.map((field) => document.getElementById(field)), 
      "gender-container"
    );
    console.log(isValid, value);
    data.gender = value;
    return isValid;
  } catch (err) {
    console.log(err);
  }
}

function validateInput(type, values, callback) {
  let allValid = true;
  for(const field of values) {
    try{
      const element = document.getElementById(field);
      data[field] = type=='file'?element.files[0]:element.value;
      allValid = callback(data[field], field) && allValid;
      if(allValid == false) return false;
    } catch (err) {
      console.log(err);
      console.log(field);
    }
  }
  return allValid;
}

function setError(type, values) {
  for(const field of values) {
    try{
      const element = document.getElementById(field);
      const parent = element.parentNode;
      const error = document.createElement('div');
      error.classList.add('error');
      error.id = `${type}-${field}`;
      error.innerText = "";
      parent.appendChild(error);
    } catch (err) {
      console.log(err);
      console.log(field);
    }
  }
}
function setErrorMultiple(type, field) {
  const parent = document.getElementById(field);
  const error = document.createElement('div');
  error.classList.add('error');
  error.id = `${type}-${field}`;
  error.innerText = "";
  error.style.left = '7%';
  console.log('inside setting',error);
  parent.appendChild(error);
}

function removeErrors() {
  const errors = document.querySelectorAll('.error');
  errors.forEach((error) => {
    error.innerHTML = '';
  });
  const invalids = document.querySelectorAll('.invalid');
  invalids.forEach((invalid) => {
    invalid.classList.remove('invalid');
  });
}

function main() {
  setError('text', textFields);
  setError('select', SelectBoxes);
  setError('file', Files);
  for(const field of RadioButtonContainer) {
    setErrorMultiple('radio',field);
  }
  for(const field of CheckboxContainer) {
    setErrorMultiple('checkbox',field);
  }
}
main();	
