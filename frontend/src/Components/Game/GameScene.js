import Phaser from 'phaser';
import ScoreLabel from './ScoreLabel';

import skyAsset from '../../assets/sky.png';
import platformAsset from '../../assets/ground.png';
import fishAsset from '../../assets/Fish.png';
import catAsset from '../../assets/Catio.png';
import bushAsset from '../../assets/bush.png';

const GROUND_KEY = 'ground';
const CAT_KEY = 'Catio';
const FISH_KEY = 'Fish';
const SKY_KEY = 'sky';
const BUSH_KEY = 'bush';

class GameScene extends Phaser.Scene {
  constructor() {
    super('game-scene');
    this.player = undefined;
    this.cursors = undefined;
    this.scoreLabel = undefined;
    this.fishs = undefined;
    this.bush= undefined;
    this.gameOver = false;
  }

  preload() {
    this.load.image(SKY_KEY, skyAsset);
    this.load.image(GROUND_KEY, platformAsset);
    this.load.image(FISH_KEY, fishAsset);
    this.load.image(GROUND_KEY,platformAsset);
    this.load.image(CAT_KEY, catAsset);
    this.load.image(BUSH_KEY,bushAsset);
   
  }

  create() {
    const sky = this.add.image(400, 250, 'sky');
    sky.setScale(0.29);
    const platform = this.createPlatform();
    this.player = this.createPlayer();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    // creatre bush dans le but de test hitBush et mene a gameOver
    this.bush = this.createBush();
     this.physics.add.collider(this.player, platform);
    this.physics.add.collider(this.bush, platform);
    // this.physics.add.overlap(this.player, this.fishs, this.collectFish, null, this);
     this.physics.add.overlap(this.player, this.bush, this.hitBush, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

  }

  update() {
    if (this.gameOver) {
      //  return;
      // aller sur la nouvelle page game over
         window.location.href= '/gameOver';
    }
  
    if(this.cursors.space.isDown && this.player.body.touching.down ){
      this.player.setVelocityY(-300);
    }
    // cette partie du code doit etre supprimer car ce n'est pas le chat qui doit bouger
    //  mais le decor , elle ne sert qu'a tester d'autre fonctionalité 
    if(this.cursors.left.isDown ){
      this.player.setVelocityX(300);
    } 
    // 
    if (this.cursors.up.isDown && this.player.body.touching.down ){  
      this.player.setVelocityY(-300);
    }
    else if (this.cursors.down.isDown)
    {
     this.player.setVelocityY(300);
    }
  }

  createPlatform() {
    const platform = this.physics.add.staticImage(400, 580, GROUND_KEY);
    platform
      .setScale(2)
      .refreshBody();
     return platform;
  }

  createPlayer() {
    const player = this.physics.add.sprite(100,0, CAT_KEY);
    player
      .setBounce(0.1)
      .setScale(0.5);

      return player;
  }

  /* totalement a recréer tout ce qui est poisson */

  // createFish() {
  //   const fishs = this.physics.add.group({
  //     key: FISH_KEY,
  //     repeat: 3,
  //     setXY: { x: 12, y: 0, stepX: 70 },
  //   });

  //   // fishs.children.iterate((child) => {
  //   //   child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  //   // });

  //   return fishs;
  // }

  // collectFish(player, fish) {
  //   fish.disableBody(true, true);
  //   this.scoreLabel.add(1);
  //   if (this.fishs.countActive(true) === 0) {
  //     this.fishs.children.iterate((child) => {
  //       child.enableBody(true, child.x, 0, true, true);
  //     });
  //   }

  // }

  // collectFish(player,fish) {
  //   fish.disableBody(true,true);
  //   this.scoreLabel.add(1);
  // }

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
    const bush = this.physics.add.image(300, 0.5, BUSH_KEY);
    bush
      .setScale(0.3);
  
      return bush;
  }

  hitBush() {
    this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
    this.gameOver = true;
  }
}

export default GameScene;