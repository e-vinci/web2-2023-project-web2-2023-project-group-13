import { clearPage, renderPageTitle } from '../../utils/render';

const RegisterPage = () => {
  clearPage();
  renderPageTitle('Register');
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
    confirmPassword.type = 'password';
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
  }

export default RegisterPage;
