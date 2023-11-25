import { clearPage } from '../../utils/render';
// import Navigation
import Navigate from '../Router/Navigate';
// import images
import water from "../../assets/water.png";

const personnalFish = () => {
  clearPage();
  // get main
  const main = document.querySelector('main');
  // add menu
  main.innerHTML += renderContent();
  const backButton = document.querySelector('#backButton');
  // add EventListener
  backButton?.addEventListener('click',redirectToUniversalScoreMenu);
};

function renderContent(){
  const content = `
  <div id="waterBackGround">
    <img id="waterImage" src="${water}">
    <div id="waterTextContainer">
      <h1>My High Scores By Fish</h1>
      <p>1000x</p>
      <p>756x</p>
      <p>461x</p>
      <p>222x</p>
      <p>travailler avec base de donnée pour récuperer le nom et le score respectif.</p>
    </div>
    <div id="scorePagesButtonContainer">
        <button id="backButton" class="retro-btn">GO BACK</button>
    </div>
  </div>
  `;
  return content;
}

function redirectToUniversalScoreMenu(){
  Navigate('/personnal');
}

export default personnalFish;