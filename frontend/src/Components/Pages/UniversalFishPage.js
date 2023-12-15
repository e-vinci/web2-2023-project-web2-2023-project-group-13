import { clearPage } from '../../utils/render';
// import Navigation
import Navigate from '../Router/Navigate';
// import images
import water from "../../assets/water.png";

const UniversalFishPage = async () => {
  clearPage();
  // get main
 const main = document.querySelector("main");
 // get all the scores sorted by fish
 const table = await getBestScoreByFish();
 const content= `
 <div id="waterBackGround">
   <img id="waterImage" src="${water}">
   </div>
   <div id="waterTextContainer">
     <h1>My High Scores By Fish</h1>
     ${table.map((score) => `
   <div class="timer">
      ${score.fish} fish
   </div>
 `).join('')}
   </div>
   <div id="scorePagesButtonContainer">
      <button id="backButton" class="retro-btn">GO BACK</button>
   </div>
 </div>
 
`;
 // display the table and the menu
 main.innerHTML += content;
 // getters
 const backButton = document.querySelector('#backButton');
 // add EventListener
 backButton?.addEventListener('click',redirectToUniversalScoreMenu);
};
// function to get all the scores sorted by fish
async function getBestScoreByFish(){
  const options = {
    method: 'GET',
    headers:{
      'Content-Type': 'application/json',
    },
  };
  try {
    const response = await fetch('http://localhost:3000/scores/getFish', options);
    if (!response.ok) {
      throw new Error(`Status: ${response.status}`);
    }
  
    const data = await response.json();
  
    return data;
  } catch (error) {
    console.error('Error user score:', error);
    return null;
    }
}

// function to go back to the highscore page
function redirectToUniversalScoreMenu(){
  Navigate('/highscore');
}

export default UniversalFishPage;