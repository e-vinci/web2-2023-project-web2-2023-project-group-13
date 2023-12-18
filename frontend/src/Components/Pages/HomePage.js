// eslint-disable-next-line import/no-extraneous-dependencies
import { clearPage }  from '../../utils/render';
// import navigation
import Navigate from '../Router/Navigate';
// import images
import sky from '../../assets/sky.png';
import sun from '../../assets/sun.png';
import ground from '../../assets/longGround.png';
import catio from '../../assets/Catio.png';
import cloud01 from '../../assets/cloud1.png';
import cloud02 from '../../assets/cloud2.png';
import cloud03 from '../../assets/cloud3.png';
import cloud04 from '../../assets/cloud4.png';

const HomePage = () => {
  if (localStorage.length === 0){
    clearPage();
  // get main
  const main = document.querySelector('main');
  // add menu to main
  main.innerHTML += renderMenu();
  // get buttons
  const playButton = document.querySelector('#playButton');
  const highscoreButton = document.querySelector('#scoresButton');
  const loginButton = document.querySelector('#loginButton');
  const signinButton = document.querySelector('#signinButton');
  const catioContainer = document.querySelector('#cationContainer');
  highscoreButton?.addEventListener('click',redirectToHighScore);
  loginButton?.addEventListener('click',redirectToLogin);
  signinButton?.addEventListener('click',redirectToSignIn);
  // add eventListener to the container(s)
  catioContainer?.addEventListener('mouseover',jumpAnimation);
  playButton?.addEventListener('click', () => {
    showInstructions();
  });
} else {
    clearPage();
  // get main
  const main = document.querySelector('main');
  // add menu to main
  main.innerHTML += renderMenuConnected();
  // get buttons
  const playButton = document.querySelector('#playButton');
  const highscoreButton = document.querySelector('#scoresButton');
  const loginButton = document.querySelector('#loginButton');
  const catioContainer = document.querySelector('#catioContainer');
  highscoreButton?.addEventListener('click',redirectToHighScore);
  loginButton?.addEventListener('click',redirectToLogin);
  // add eventListener to the container(s)
  catioContainer?.addEventListener('mouseover',jumpAnimation);

  playButton?.addEventListener('click', () => {
    showInstructions();
  });
}
 
   // Fonction pour afficher les instructions
   function showInstructions() {
     // Naviguez vers la scène du jeu pour afficher les instructions
     Navigate('/game');
   }
 };

// Animation de la HomePage
function jumpAnimation(){
  const catioContainer = document.querySelector('#catioContainer');
  catioContainer.classList.add('jump-effect');
  setTimeout(() => {
    catioContainer.classList.remove('jump-effect');
  }, 300);
}

function renderMenu(){

  const menu = `
    <div id="skyContainer">
      <img id="skyImage" src="${sky}">
      <div id="groundContainer">
        <img id="groundImage" src="${ground}">
      </div>
      <div id="textContainer">
        <h1 id="pageTitle">
            WELCOME TO CATIO ! 
        </h1>
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
      <div id="buttonContainer">
        <button id="playButton" class="retro-btn">PLAY</button>
        <br>
        <button id="scoresButton" class="retro-btn">HIGH SCORES</button>
        <br>
        <button id="loginButton" class="retro-btn">LOG IN</button>
        <br>
        <button id="signinButton" class="retro-btn">SIGN IN</button>
      </div>
    </div>
  `;
  return menu;
}

function renderMenuConnected(){

  const menu = `
    <div id="skyContainer">
      <img id="skyImage" src="${sky}">
      <div id="groundContainer">
        <img id="groundImage" src="${ground}">
      </div>
      <div id="textContainer">
        <h1 id="pageTitle">
            WELCOME TO CATIO ! 
        </h1>
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
      <div id="buttonContainer">
        <button id="playButton" class="retro-btn">PLAY</button>
        <br>
        <button id="scoresButton" class="retro-btn">HIGH SCORES</button>
        <br>
        <button id="loginButton" class="retro-btn">ACCOUNT/LOG OUT</button>
      </div>
    </div>
  `;
  return menu;
}
function redirectToLogin(){
  Navigate('/login');
}

function redirectToHighScore(){
  Navigate('/highscore');
}

function redirectToSignIn(){
  Navigate('/signIn');
}

export default HomePage;
