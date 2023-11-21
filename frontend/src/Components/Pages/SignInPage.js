import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

const SignInPage = () => {
  clearPage();
  renderPageTitle('Sign In');
  renderForm();
};


function renderForm(){
    const main = document.querySelector('main');
    const form = document.createElement('form');
    form.className = 'form';
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
    const email = document.createElement('input');
    email.type = 'email';
    email.id = 'email';
    email.placeholder = 'someone@example.com';
    email.required = true;
    const password = document.createElement('input');
    password.type = 'password';
    password.id = 'password';
    password.required = true;
    password.placeholder = 'password';
    const confirmPassword = document.createElement('input');
    confirmPassword.type = 'password';
    confirmPassword.id = 'confirmPassword'
    confirmPassword.placeholder = 'confirm password';
    const submit = document.createElement('input');
    submit.value = 'Sign In';
    submit.type = 'submit';
    submit.className = 'buttonSubmit';
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
        'Content-Type': 'application/json',
      },
    };
    const response = await fetch('/api/routes/users.js/', options);
    
    if (!response.ok) throw new Error(`fetch error : ${response.status} : ${response.statusText}`);

    const newUser = await response.json();

    console.log('User : ', newUser);

    Navigate('/');
  }
  export default SignInPage;