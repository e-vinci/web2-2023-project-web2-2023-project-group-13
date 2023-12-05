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
  main.innerHTML += renderMenu();
  renderForm();
};
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
async function addUser(u) {
  u.preventDefault();

  const firstname = document.querySelector('#firstname').value;
  const lastname = document.querySelector('#lastname').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;
  const confirmPassword = document.querySelector('#confirmPassword').value;

  if (password !== confirmPassword){
    Navigate('/');
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
      'Content-Type' : 'application/json',
    },
  };
  

  const newUser = await response.json();

  console.log('User : ', newUser);

  Navigate('/');
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
    `
    return menu;
  }
  export default SignInPage;