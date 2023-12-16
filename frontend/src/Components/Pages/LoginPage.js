import { clearPage } from '../../utils/render';
import Navigate from '../Router/Navigate'
import sky from '../../assets/sky.png';
import sun from '../../assets/sun.png';
import ground from '../../assets/longGround.png';
import catio from '../../assets/Catio.png';
import cloud01 from '../../assets/cloud1.png';
import cloud02 from '../../assets/cloud2.png';
import cloud03 from '../../assets/cloud3.png';
import cloud04 from '../../assets/cloud4.png';

const LoginPage = () => {
  clearPage();
  const main = document.querySelector('main');
  // check if the user is connected
  if (localStorage.length > 0) {
      main.innerHTML += renderMenuConnected();
      // getters
      const logoutButton = document.querySelector('#logoutButton');
      const deleteButton = document.querySelector('#deleteButton');
      // EventListener
      deleteButton.addEventListener('click',renderFormDelete);
      logoutButton.addEventListener('click',logout);
    } else {
      main.innerHTML += renderMenu();
      renderForm();
    }
  // Getter
  const backButton = document.querySelector('#backButton');
  // EventListener
  backButton?.addEventListener('click',redirectToHomePage);
};
// function to go back to the home page 
function redirectToHomePage(){
  Navigate('/');
}

// function to disconnect the user
function logout(){
  localStorage.clear();
  Navigate('/');
}
// function to display the menu with an error for an user not connected
function renderError(message){
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML += renderMenuError(message);
  renderForm();
  const backButton = document.querySelector('#backButton');
  backButton?.addEventListener('click',redirectToHomePage);
}
// function to display the menu with an error for an user who wanted to delete his account
function renderErrorDelete(message){
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML += renderMenuConnectedDelete(message);
  renderFormDelete();
  const logoutButton = document.querySelector('#logoutButton');
  const deleteButton = document.querySelector('#deleteButton');
  deleteButton.addEventListener('click',renderFormDelete);
  logoutButton.addEventListener('click',logout);
  const backButton = document.querySelector('#backButton');
  backButton?.addEventListener('click',redirectToHomePage);
}
// function for the form to delete an account
function renderFormDelete(){
  const main = document.querySelector('main');
  const form = document.createElement('form');
  const email = document.createElement('input');
  email.type = 'email';
  email.id = 'email';
  email.placeholder = 'someone@example.com';
  email.required = true;
  email.className = 'input';
  const submit = document.createElement('input');
  submit.value = 'Delete account'
  submit.type = 'submit';
  submit.className = 'buttonSubmit';
  form.className = 'form';
  form.appendChild(email);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', deleteUser);
}
// function for the form to log in
function renderForm(){
  const main = document.querySelector('main');
  const form = document.createElement('form');
  const email = document.createElement('input');
  email.type = 'email';
  email.id = 'email';
  email.placeholder = 'someone@example.com';
  email.required = true;
  email.className='input';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.placeholder = '*********';
  password.className = 'input';
  const submit = document.createElement('input');
  submit.value = 'Connect';
  submit.type = 'submit';
  submit.className = 'buttonSubmit';
  form.className = 'form';
  form.appendChild(email);
  form.appendChild(password);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', loginUser);
}
// function to delete an user
async function deleteUser(e){
  e.preventDefault();
  const email = document.querySelector('#email').value;
  if (email !== localStorage.getItem('email')){
    renderErrorDelete("Le compte que vous voulez supprimer ne vous appartient pas");
    return; 
  }
  const options = {
    method: 'POST',
    body: JSON.stringify({
      email
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch('http://localhost:3000/users/deleteUser', options);
  console.log(response);
  localStorage.clear();
  redirectToHomePage();
} 
// function to log in an user
async function loginUser(e){
  e.preventDefault();
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const options = {
    method: 'POST',
    body: JSON.stringify({
      email,
      password
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch('http://localhost:3000/users/loginUser', options);
  
  if (response.status === 404) {
    renderError("L'adresse email ou le mot de passe n'est pas bon");
    return;
  }

  const newUser = await response.json();

  console.log('User : ', newUser);
  localStorage.setItem('email', newUser.email);
  redirectToHomePage();
} 
// function for the menu log in page
function renderMenu(){
  const menu = `
    <div id="skyContainer">
    <img id="skyImage" src="${sky}">
    <div id="groundContainer">
      <img id="groundImage" src="${ground}">
    </div>
    <div id="catioContainer">
      <img id="catioImage" src="${catio}">
    </div>
    <div id="cloud02Container">
      <img id="cloud02Image" src="${cloud02}">
    </div>
    <div id="cloud01Container">
      <img id="cloud01Image" src="${cloud01}">
    </div>
    <div id="cloud03Container">
      <img id="cloud03Image" src="${cloud03}">
    </div>
    <div id="sunContainer">
      <img id="sunImage" src="${sun}">
    </div>
    <div id="cloud04Container">
      <img id="cloud04Image" src="${cloud04}">
    </div>
    <div id="backButtonContainer">
    <button id="backButton" class="backButton">BACK</button>
    </div>
    `
    return menu;
  }
  // function for the menu when an user is connected
  function renderMenuConnected(){
    const menu = `<div id="skyContainer">
    <img id="skyImage" src="${sky}">
    <div id="groundContainer">
      <img id="groundImage" src="${ground}">
    </div>
    <div id="catioContainer">
      <img id="catioImage" src="${catio}">
    </div>
    <div id="cloud02Container">
      <img id="cloud02Image" src="${cloud02}">
    </div>
    <div id="cloud01Container">
      <img id="cloud01Image" src="${cloud01}">
    </div>
    <div id="cloud03Container">
      <img id="cloud03Image" src="${cloud03}">
    </div>
    <div id="sunContainer">
      <img id="sunImage" src="${sun}">
    </div>
    <div id="cloud04Container">
      <img id="cloud04Image" src="${cloud04}">
    </div>
    <div id="backButtonContainer">
    <button id="backButton" class="backButton">BACK</button>
    </div>
    <div id="logoutButtonContainer">
    <button id="logoutButton" class="logoutButton">LOG OUT</button>
    </div>
    <div id="deleteButtonContainer">
  <button id="deleteButton" class="deleteButton">DELETE ACCOUNT</button>
    </div>
    <div id="connected">
      Vous êtes déjà connecté
    </div>`

    return menu;
  }
  // function for the menu with an error before the user is log in
  function renderMenuError(message){
    const menuError = `<div id="skyContainer">
    <img id="skyImage" src="${sky}">
    <div id="groundContainer">
      <img id="groundImage" src="${ground}">
    </div>
    <div id="catioContainer">
      <img id="catioImage" src="${catio}">
    </div>
    <div id="cloud02Container">
      <img id="cloud02Image" src="${cloud02}">
    </div>
    <div id="cloud01Container">
      <img id="cloud01Image" src="${cloud01}">
    </div>
    <div id="cloud03Container">
      <img id="cloud03Image" src="${cloud03}">
    </div>
    <div id="sunContainer">
      <img id="sunImage" src="${sun}">
    </div>
    <div id="cloud04Container">
      <img id="cloud04Image" src="${cloud04}">
    </div>
    <div id="errorMessage2">
      "${message}"    
    </div>
    <div id="backButtonContainer">
      <button id="backButton" class="backButton">BACK</button>
    </div>`

    return menuError;
}
// function for the menu when an user want to delete his account
function renderMenuConnectedDelete(message){
  const menu = `<div id="skyContainer">
  <img id="skyImage" src="${sky}">
  <div id="groundContainer">
    <img id="groundImage" src="${ground}">
  </div>
  <div id="catioContainer">
    <img id="catioImage" src="${catio}">
  </div>
  <div id="cloud02Container">
    <img id="cloud02Image" src="${cloud02}">
  </div>
  <div id="cloud01Container">
    <img id="cloud01Image" src="${cloud01}">
  </div>
  <div id="cloud03Container">
    <img id="cloud03Image" src="${cloud03}">
  </div>
  <div id="sunContainer">
    <img id="sunImage" src="${sun}">
  </div>
  <div id="cloud04Container">
    <img id="cloud04Image" src="${cloud04}">
  </div>
  <div id="backButtonContainer">
  <button id="backButton" class="backButton">BACK</button>
  </div>
  <div id="logoutButtonContainer">
  <button id="logoutButton" class="logoutButton">LOG OUT</button>
  </div>
  <div id="deleteButtonContainer">
<button id="deleteButton" class="deleteButton">DELETE ACCOUNT</button>
  </div>
  <div id="errorMessage2">
      "${message}"    
    </div>
  <div id="connected">
    Vous êtes déjà connecté
  </div>`
  return menu;
}

export default LoginPage;