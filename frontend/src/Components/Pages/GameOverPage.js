import { clearPage } from '../../utils/render';
// import navigation
import Navigate from '../Router/Navigate';
// import images
import sky from '../../assets/sky.png';
import ground from '../../assets/longGround.png';
import cryingCatio from '../../assets/cryingCatio.png';
import bush from '../../assets/bush.png';

const GameOverPage = () => {
  clearPage();
  // get main
  const main = document.querySelector('main');
  // add content
  main.innerHTML += renderContent();
  if (localStorage.getItem('email') !== null){
    addScore();
  }
  
  // get buttons
  const replayButton = document.querySelector('#replayButton');
  const scoreButton = document.querySelector('#scores');
  const HomeButton = document.querySelector('#homepage');

  // add EventListener
  replayButton?.addEventListener('click',redirectGamePage);
  scoreButton?.addEventListener('click',redirectHighScorePage);
  HomeButton?.addEventListener('click',redirectToHomePage);
};
async function addScore(){
  const email = localStorage.getItem('email');
  let fish = localStorage.getItem('fish');
  let timer = localStorage.getItem('timer');
  if (fish === null){
    fish = 0;
  }
  if (timer === null){
    timer = 0;
  }
  const options = {
    method: 'POST',
    body: JSON.stringify({
      email,
      fish,
      timer
    }),
    headers:{
      'Content-Type': 'application/json',
    },
  };
  const response = await fetch('http://localhost:3000/scores/addScore', options);
  console.log(response);
}

function renderContent(){
    const content = `
        <div id="skyContainer">
            <img id="skyImage" src="${sky}">
            <div id="textContainerGameOver">
                <h1 class=gameOverFont>GAME OVER!</h1>
                <p class="pGameOverFont"> Timer : ${localStorage.getItem('timer')} </p>
                <p class="pGameOverFont"> FISH : ${localStorage.getItem('fish')}</p>
            </div>
            <div id="buttonContainer">
                <button id="replayButton" class="gameoverButton">REPLAY</button>
                <br>
                <br>
                <button id="scores" class="gameoverButton">HIGH SCORES</button>
                <br>
                <br>
                <button id="homepage" class="gameoverButton">BACK TO MENU</button>
                <br>
                <br>
            </div>
            <div id="groundContainer">
                <img id="groundImage" src="${ground}">
            </div>
            <div id="cryingCatioContainer">
                <img id="cryingCatioImage" src="${cryingCatio}">
            </div>
            <div id="bushContainer">
                <img id="bushImage" src="${bush}">
            </div>
        </div>
    `;
    return content;
}
function redirectGamePage(){
    localStorage.removeItem('timer');
    localStorage.removeItem('fish');
    Navigate('/game');
}

function redirectToHomePage(){
    localStorage.removeItem('timer');
    localStorage.removeItem('fish');
    Navigate('/');
}

function redirectHighScorePage(){
    localStorage.removeItem('timer');
    localStorage.removeItem('fish');
    Navigate('/highscore');
}

export default GameOverPage;