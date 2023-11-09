import throttle from 'lodash.throttle';

//знаходимо форму
const refs = {
formEl: document.querySelector('.feedback-form'),
}
//вішаємо на форму слухачів input, submit
refs.formEl.addEventListener('input', throttle(onFormInput, 500))
refs.formEl.addEventListener('submit', onFormSubmit)

//функція зберігання в localeStorage при інпуті
function onFormInput(event) {
    // console.dir(event.currentTarget);
    const userForm = {};
    const formData = new FormData(refs.formEl);    
    // console.log(formData);
    formData.forEach((value, key) => {
        userForm[key] = value;
        // console.log(key, userForm[key]);
    })
saveToLs('userData',userForm)
}

function onFormSubmit(event) {
    event.preventDefault();
    console.log(loadFromLs('userData'));
    localStorage.removeItem('userData');
    refs.formEl.reset();
}
// функція заповнення полів
function dataToForm() {
    const userData = loadFromLs('userData') || {}
    // console.log(userData);
     for (const key of Object.keys(userData)) {
         refs.formEl.elements[key].value = userData[key];
        //  console.log(refs.formEl.elements[key].value);
        //  console.log(key);
        //  console.log(userData[key]);
  }
}

dataToForm()
// зберігання в localStorage
function saveToLs(key, value) { 
    localStorage.setItem(key, JSON.stringify(value));
  } 
// завантаження з localStorage
function loadFromLs(key) {
 const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    console.log(err);
    return data;
  }
}