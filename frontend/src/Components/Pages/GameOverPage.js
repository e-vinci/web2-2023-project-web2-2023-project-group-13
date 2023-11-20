import { clearPage } from '../../utils/render';
// import images
import sky from '../../assets/sky.png';
import ground from '../../assets/longGround.png';
import cryingCatio from '../../assets/cryingCatio.png';
import bush from '../../assets/bush.png';
import fish from '../../assets/Fish.png';

const GameOverPage = () => {
  clearPage();
  // get main
  const main = document.querySelector('main');
  // add content
  main.innerHTML += renderContent();

};

function renderContent(){
    const content = `
        <div id="skyContainer">
            <img id="skyImage" src="${sky}">
            <div id="textContainerGameOver">
                <h1 class=gameOverFont>GAME OVER!</h1>
                <p class="pGameOverFont">Timer : </p>
                
                <p class="pGameOverFont"> : </p>
            </div>
            <div id="fishContainer">
                <img id="fishImage" src="${fish}">
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

export default GameOverPage;