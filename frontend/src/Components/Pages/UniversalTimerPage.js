import { clearPage } from '../../utils/render';
// import Navigation
import Navigate from '../Router/Navigate';
// import images
import timerGif from '../../assets/Timer.gif'
import sky from '../../assets/sky.png';

const UniversalTimerPage = () => {
  clearPage();
 // get main
 const main = document.querySelector("main");
 // getters
 main.innerHTML += renderContent();
 const backButton = document.querySelector('#backButton');
 // add EventListener
 backButton?.addEventListener('click',redirectToUniversalScoreMenu);
};

function renderContent(){
  const content= `
  <div id="waterBackGround">
    <img id="waterImage" src="${sky}">
    <div id="timergif">
      <img id="timerImage" src="${timerGif}">
    </div>
    <div id="waterTextContainer">
      <h1>High Scores By Timer</h1>
      <p>Bastien: 600.00s</p>
      <p>Wissal: 456.56s</p>
      <p>Nisrine: 279.00s</p>
      <p>Erica: 214.99s</p>
      <p>travailler avec base de donnée pour récuperer le nom et le timer respectif.</p>
    </div>
    <div id="scorePagesButtonContainer">
        <button id="backButton" class="retro-btn">GO BACK</button>
    </div>
  </div>
  `;
  return content;
}

function redirectToUniversalScoreMenu(){
  Navigate('/highscore');
}


export default UniversalTimerPage;