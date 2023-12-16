import { clearPage} from '../../utils/render';
import Navigate from '../Router/Navigate'
import sky from '../../assets/sky.png';
import sun from '../../assets/sun.png';
import ground from '../../assets/longGround.png';
import catio from '../../assets/Catio.png';
import cloud01 from '../../assets/cloud1.png';
import cloud02 from '../../assets/cloud2.png';
import cloud03 from '../../assets/cloud3.png';
import cloud04 from '../../assets/cloud4.png';

const SignInPage = () => {
  clearPage();
  const main = document.querySelector('main');
  // add the menu
  main.innerHTML += renderMenu();
  renderForm();
  // getters
  const backButton = document.querySelector('#backButton');
  // EventListener
  backButton?.addEventListener('click',redirectToHomePage);
};
// function to go back to the home page
function redirectToHomePage(){
  Navigate('/')
}
// function to go back to the sign in page
function redirectToSignInPage(){
  Navigate('/signIn')
}
// function to add the register form to the page
function renderForm(){
  const main = document.querySelector('main');
  const form = document.createElement('form');
  const firstname = document.createElement('input');
  firstname.type = 'text';
  firstname.id = 'firstname';
  firstname.placeholder = 'firstname';
  firstname.required = true;
  firstname.className = 'input';
  const lastname = document.createElement('input');
  lastname.type = 'text';
  lastname.id = 'lastname';
  lastname.placeholder = 'lastname';
  lastname.required = true;
  lastname.className = 'input';
  const email = document.createElement('input');
  email.type = 'email';
  email.id = 'email';
  email.placeholder = 'someone@example.com';
  email.required = true;
  email.className='input';
  const password = document.createElement('input');
  password.type = 'password';
  password.id = 'password';
  password.required = true;
  password.placeholder = 'password';
  password.className = 'input';
  const confirmPassword = document.createElement('input');
  confirmPassword.type = 'password';
  confirmPassword.id = 'confirmPassword'
  confirmPassword.placeholder = 'confirm password';
  confirmPassword.className = 'input';
  const submit = document.createElement('input');
  submit.value = 'Sign In';
  submit.type = 'submit';
  submit.className = 'buttonSubmit';
  form.className = 'form';
  form.appendChild(firstname);
  form.appendChild(lastname);
  form.appendChild(email);
  form.appendChild(password);
  form.appendChild(confirmPassword);
  form.appendChild(submit);
  main.appendChild(form);
  form.addEventListener('submit', addUser);

}
// function to add the user into the json database
async function addUser(e) {
  e.preventDefault();
  const firstname = document.querySelector('#firstname').value;
  const lastname = document.querySelector('#lastname').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;
  // check if the password is long enough
  if (password.length <= 8){
      renderError("Le mot de passe n'est pas assez long");
      redirectToSignInPage();
    return;
  }
  // check if the password is the same than the confirmPassword
  if (password !== confirmPassword){
    renderError("Le mot de passe n'est pas le même que celui de confirmation");
    redirectToSignInPage();
    return;
  }


  const options = {
    method: 'POST',
    body: JSON.stringify({
      firstname,
      lastname,
      email,
      password
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch(`${process.env.API_BASE_URL}/users/addUser`, options);

  
  if (response.status === 404) {
    renderError("Vous êtes déjà inscrit")
    return;
  };
  const newUser = await response.json();
  // Set the item into the localStorage to take it later
  localStorage.setItem('email', newUser.email);
  redirectToHomePage();
}
// function to render the page with an error
function renderError(message){
  clearPage();
  const main = document.querySelector('main');
  main.innerHTML += renderMenuError(message);
  renderForm();
}
// function containing the menu with the error
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
      <div id="errorMessage">
        "${message}"    
      </div>
      <div id="backButtonContainer">
        <button id="backButton" class="backButton">BACK</button>
      </div>`

      return menuError;
  }
// function containing the menu  
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
      <img id="cloud04Image" src="${cloud04}"></div>
      <div id="backButtonContainer">
    <button id="backButton" class="backButton">BACK</button>
    </div>
    `
    return menu;
  }
  export default SignInPage;