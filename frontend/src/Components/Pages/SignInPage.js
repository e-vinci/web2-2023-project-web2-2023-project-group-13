import { clearPage, renderPageTitle } from '../../utils/render';
import Navigate from '../Router/Navigate';

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
  const main()
  renderPageTitle('Sign In');
  renderForm();
};


function renderForm(){
    const main = document.querySelector('main');
    const form = document.createElement('form');
    main.innerHTML += renderMenu();
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
    <form>
      <input type="text" id="firstname" placeholder="firstname">
      <input type="submit" id="submit">
    </form>
    `
    return menu;
  }
  export default SignInPage;