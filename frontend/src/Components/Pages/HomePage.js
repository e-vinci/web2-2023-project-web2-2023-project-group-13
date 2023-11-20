// eslint-disable-next-line import/no-extraneous-dependencies
import { clearPage }  from '../../utils/render';
// import navigation
import Navigate from '../Router/Navigate';
// import images
import sky from '../../assets/sky.png';
import sun from '../../assets/sun.png';
import ground from '../../assets/ground.png';
import catio from '../../assets/Catio.png';
import cloud01 from '../../assets/cloud1.png';
import cloud02 from '../../assets/cloud2.png';
import cloud03 from '../../assets/cloud3.png';
import cloud04 from '../../assets/cloud4.png';

const HomePage = () => {
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
  const gameOverButton = document.querySelector('#gameOverButton');
  // getCatioContainer and image
  const catioContainer = document.querySelector('#catioContainer');
  // add eventListener to the buttons
  playButton?.addEventListener('click',startGame);
  highscoreButton?.addEventListener('click',redirectToHighScore);
  loginButton?.addEventListener('click',redirectToLogin);
  signinButton?.addEventListener('click',redirectToSignIn);
  gameOverButton?.addEventListener('click',redirectToGameOver);
  // add eventListener to the container(s)
  catioContainer?.addEventListener('mouseover',jumpAnimation);
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
        <br>
        <button id="gameOverButton" class="retro-btn">GAMEOVER</button>
      </div>
    </div>
  `;
  return menu;
}


// EventListener for every button
function startGame(){
  Navigate('/game');
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

function redirectToGameOver(){
  Navigate('/gameOver');
}

export default HomePage;
