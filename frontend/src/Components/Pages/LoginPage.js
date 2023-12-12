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
  if (localStorage.length > 0) {
      main.innerHTML += renderMenuConnected();
      const logoutButton = document.querySelector('#logoutButton');
      logoutButton.addEventListener('click',logout);
    } else {
      main.innerHTML += renderMenu();
      renderForm();
    }
  const backButton = document.querySelector('#backButton');
  backButton?.addEventListener('click',redirectToHomePage);
};

function redirectToHomePage(){
  Navigate('/');
}

function logout(){
  localStorage.clear();
  Navigate('/');
}
function renderError(message){
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML += renderMenuError(message);
  renderForm();
}

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
  localStorage.setItem('token', newUser.token);
  redirectToHomePage();
} 

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
    <div id="connected">
      Vous êtes déjà connecté
    </div>`

    return menu;
  }
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


export default LoginPage;