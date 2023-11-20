
import Navigate from '../Router/Navigate';
// eslint-disable-next-line no-unused-vars
import GameScene from '../Game/GameScene';


const HomePage = () => {
  const main = document.querySelector('main');

  // Ajoutez le contenu de votre page d'accueil
  main.innerHTML = `
    <p>Deal with the content of your HomePage</p>
    <button id="helpButton">Help</button>
  `;

  // Ajoutez un gestionnaire d'événements pour le bouton Help
  const helpButton = document.getElementById('helpButton');
  helpButton.addEventListener('click', showInstructions);

  // Fonction pour afficher les instructions
  function showInstructions() {
    // Naviguez vers la scène du jeu pour afficher les instructions
    Navigate('/game');
  }
};

export default HomePage;
