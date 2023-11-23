import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';
import gameConfig  from "./gameConfig";

import skyAsset from '../../assets/sky2.jpg';
import platformAsset from '../../assets/ground.png';
import fishAsset from '../../assets/Fish.png';
import catAsset from '../../assets/catio_play.png';
import bushAsset from '../../assets/bush_test.png';
import cadreAsset from '../../assets/Button.png';
import flecheAsset from '../../assets/fleche_haut.png';
import catioAsset from '../../assets/catio_help.png'
import buissonAsset from '../../assets/buisson_help.png';


const GROUND_KEY = 'ground';
const CAT_KEY = 'Catio';
const FISH_KEY = 'Fish';
const SKY_KEY = 'sky';
const BUSH_KEY = 'bush';
const CADRE_KEY='cadre';
const FLECHE_KEY='fleche';
const CATIO_HELP='catHelp';
const BUISSON_HELP='buisson';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.fishs = undefined;
    this.bush= undefined;
    this.gameOver = false;
    this.sky=undefined;
    this.ground1=undefined;
    this.ground2=undefined;
    this.skySpeed = 3;  // Vitesse de défilement du ciel
    this.groundSpeed=5;// Vitesse de défilement du sol
  }



  preload() {
    this.load.image(SKY_KEY, skyAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(FISH_KEY, fishAsset);
    this.load.image(CAT_KEY, catAsset);
    this.load.image(BUSH_KEY,bushAsset);
    this.load.image(FLECHE_KEY, flecheAsset);
    this.load.image(CADRE_KEY,cadreAsset);
    this.load.image(CATIO_HELP,catioAsset);
    this.load.image(BUISSON_HELP,buissonAsset);
   
  }

  create() {
    
    // Initialisation des images du ciel
    this.sky1 = this.add.image(0, 0, 'sky');
    this.sky1.setScale(1);// Échelle du ciel (taille d'origine)
    this.sky2 = this.add.image(this.sky1.width, 0, 'sky');// Deuxième image du ciel décalée d'une largeur du ciel
    this.sky2.setScale(1);// Échelle du ciel (taille d'origine)
    this.sky1.y += 110;  // Décalage vertical de la première image du ciel
    this.sky2.y += 110;  // Décalage vertical de la deuxième image du ciel
    

   // Dans GameScene
if (!gameConfig.instructionsShown) {
  this.showInstructions();
  gameConfig.instructionsShown = true;
}
    
    const platform = this.createPlatform();
    this.player = this.createPlayer();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    // creatre bush dans le but de test hitBush et mene a gameOver
     this.bush = this.createBush();
    this.physics.add.collider(this.player, platform);
    this.physics.add.collider(this.bush, platform);
    this.fishs= this.createFishs();
    this.physics.add.collider(this.fishs,platform);
    this.physics.add.collider(this.fishs,this.bush);
    this.physics.add.overlap(this.player, this.fishs, this.collectFishs, null, this);
    this.physics.add.overlap(this.player, this.bush, this.hitBush, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();
    
    
  }

  showInstructions() {
    // Ajoutez le cadre en premier plan
    const cadre = this.add.sprite(400, 300, CADRE_KEY);
  
    
    const scaleX = 800 / cadre.width;
    const scaleY = 600 / cadre.height;
    cadre.setScale(scaleX, scaleY);
  
   // Ajoutez les images au cadre
  const poisson = this.add.image(cadre.x - cadre.displayWidth / 2 + 150, cadre.y - cadre.displayHeight / 2 + 150, 'Fish');
  const buisson = this.add.image(poisson.x + poisson.displayWidth + 70, cadre.y - cadre.displayHeight / 2 + 150, BUISSON_HELP);
  const fleche = this.add.image(buisson.x + buisson.displayWidth + 70, cadre.y - cadre.displayHeight / 2 + 150, FLECHE_KEY);
  const chat = this.add.image(fleche.x + fleche.displayWidth + 90, cadre.y - cadre.displayHeight / 2 + 150, CATIO_HELP);
    // Ajoutez le texte pour chaque image
    const style = { font: '20px Arial', fill: '#000' };
    const poissonText =this.add.text(poisson.x, poisson.y + poisson.displayHeight / 2 + 10, 'Points', style).setOrigin(0.5);
    const buissonText=this.add.text(buisson.x, buisson.y + buisson.displayHeight / 2 + 10, 'Danger', style).setOrigin(0.5);
    const flecheText=this.add.text(fleche.x, fleche.y + fleche.displayHeight / 2 + 15, 'Jump', style).setOrigin(0.5);
    const chatText =this.add.text(chat.x, chat.y + chat.displayHeight / 2 + 10, 'Main Character', style).setOrigin(0.5);
    
    // Ajoutez le texte dans le cadre
    const instructionsText = `
    Welcome to Catio!

    Instructions:
    - Press the up arrow key to make the cat jump.
    - Collect as many fish as possible to score points.
    - Avoid obstacles and try to stay alive as long as you can.
    
    Have a good time!
    
    `;
  
    // Calculez la position du texte en fonction de la position du cadre
    const textX = cadre.x - cadre.displayWidth / 2 + 70;
    const textY = cadre.y - cadre.displayHeight / 2 + 200; // déplace le texte plus bas
  
    const text = this.add.text(textX, textY, instructionsText, style);
  
    // Ajoutez un bouton "OK" dans le cadre
    const okButton = this.add.text(cadre.x, text.y + text.displayHeight +30, 'OK', { fontSize: '24px', fill: '#000', backgroundColor: '#ddd', padding: { x: 10, y: 5 } })
      .setOrigin(0.5)
      .setInteractive(); // Permet d'ajouter des événements interactifs

      cadre.setDepth(1);
      poisson.setDepth(1);
      buisson.setDepth(1);
      fleche.setDepth(1);
      chat.setDepth(1);
      poissonText.setDepth(1);
      buissonText.setDepth(1);
      flecheText.setDepth(1);
      chatText.setDepth(1);
      text.setDepth(1);
      okButton.setDepth(1);

  
    // Ajoutez un gestionnaire d'événements pour le bouton "OK"
    okButton.on('pointerdown', () => {
      cadre.destroy();
      text.destroy();
      okButton.destroy();
      poisson.destroy();
      buisson.destroy();
      fleche.destroy();
      chat.destroy();
      poissonText.destroy();
      buissonText.destroy();
      chatText.destroy();
      poissonText.destroy();
      flecheText.destroy();

    });
  }


  update() {
    if (this.gameOver) {
      //  return;
      // aller sur la nouvelle page game over
     window.location.href= '/gameOver';
    }

    
    
     this.sky1.x -= this.skySpeed;// Déplacement horizontal de la première image du ciel
     this.sky2.x -= this.skySpeed;  // Déplacement horizontal de la deuxième image du ciel

     // Réinitialisation de la première image du ciel lorsqu'elle sort de l'écran
     if (this.sky1.x <= -this.sky1.width) {
         this.sky1.x = this.sky2.x + this.sky2.width;
     }

     // Réinitialisation de la deuxième image du ciel lorsqu'elle sort de l'écran
     if (this.sky2.x <= -this.sky2.width) {
         this.sky2.x = this.sky1.x + this.sky1.width;
     }

     
      // Déplacez les deux images du sol
      this.ground1.x -= this.groundSpeed;
      this.ground2.x -= this.groundSpeed;
    
      // Réinitialisez la première image du sol lorsqu'elle sort de l'écran
      if (this.ground1.x <= -this.ground1.width) {
        this.ground1.x = this.ground2.x + this.ground2.width;
      }
    
      // Réinitialisez la deuxième image du sol lorsqu'elle sort de l'écran
      if (this.ground2.x <= -this.ground2.width) {
        this.ground2.x = this.ground1.x + this.ground1.width;
      }
    
    
  

  
    if(this.cursors.space.isDown && this.player.body.touching.down ){
      this.player.setVelocityY(-300);
    }
    // cette partie du code doit etre supprimer car ce n'est pas le chat qui doit bouger
    //  mais le decor , elle ne sert qu'a tester d'autre fonctionalité 
    if(this.cursors.right.isDown ){
      this.player.setVelocityX(300);
    } else if (this.cursors.left.isDown){
      this.player.setVelocityX(-300);
    } else {
      this.player.setVelocityX(0);
    }
    // if(this.cursors.left.isDown ){
    // this.player.setVelocityX(-300);
    // } else {
    // this.player.setVelocityX(0);
// }
    // 
    if (this.cursors.up.isDown && this.player.body.touching.down ){  
      this.player.setVelocityY(-300);
    }
    else if (this.cursors.down.isDown)
    {
     this.player.setVelocityY(300);
    }
  }

  createPlatforms() {
    const platforms = this.physics.add.staticGroup();

    this.ground1 = platforms.create(0, this.game.config.height, GROUND_KEY).setOrigin(0, 1);
    this.ground2 = platforms.create(this.ground1.width, this.game.config.height, GROUND_KEY).setOrigin(0, 1);

    this.ground1.setScale(1, 1.2);
    this.ground2.setScale(1, 1.2);
    return platforms;
}


  createPlayer() {
    const player = this.physics.add.sprite(100,0, CAT_KEY);
    player
      .setBounce(0.1)
      .setScale(0.3);
      return player;
  }

  /* totalement a recréer tout ce qui est poisson */
//  a revoir //
  createFishs() {
    const fishs = this.physics.add.group({
      key: FISH_KEY,
      repeat: 2,
      setXY: { x: 400, y: 300, stepX: 50 },

    });

    return fishs;
  }

  collectFishs(player, fish) {
    fish.disableBody(true, true);
    this.scoreLabel.add(1);
    // cette partie du code sert a remetrre des posson qui ont ete manger
    // exactement au meme endroit et au meme nombre
    // if (this.fishs.countActive(true) === 0) {
    //   this.fishs.children.iterate((child) => {
    //     child.enableBody(true, child.x, 0, true, true);
    //   });
  }

  

  createScoreLabel(x, y, score) {
    const style = { fontSize: '32px', fill: '#000' };
    const label = new ScoreLabel(this, x, y, score, style);
    console.log('score:', label);
    this.add.existing(label);
    return label;
  }

/* totalement a recréer lors de la creation du decor 
mouvant cette metode sert uniquement a voir si la methode 
hitBush fonctionne 
*/
  createBush(){
    const bush = this.physics.add.group();
    // const bush1 = bush.create(229, 0.5, BUSH_KEY)
    const bush2 = bush.create(700, 0.5, BUSH_KEY)
    // bush1.setScale(0.2);
    bush2.setScale(0.2);
    return bush;
  }

  hitBush() {
    this.scoreLabel.setText(`GAME OVER  \nYour Score = ${this.scoreLabel.score}`);
    this.gameOver = true;
  }
}

export default GameScene;