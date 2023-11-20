import Phaser from 'phaser';
import cadreAsset from '../../assets/cadre.png';
import ScoreLabel from './ScoreLabel';

import skyAsset from '../../assets/sky.png';
import platformAsset from '../../assets/ground.png';
import fishAsset from '../../assets/Fish.png';
import catAsset from '../../assets/cat.png';
import bushAsset from '../../assets/bush.png';
import cadreAsset from '../../assets/Button.png';
import flecheAsset from '../../assets/fleche_haut.png';


const GROUND_KEY = 'ground';
const CAT_KEY = 'cat';
const FISH_KEY = 'Fish';
const SKY_KEY = 'sky';
const BUSH_KEY = 'bush';
const CADRE_KEY='cadre';
const FLECHE_KEY='fleche'

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
    this.load.image(FLECHE_KEY, flecheAsset);
    this.load.image(CAT_KEY,catAsset);
    this.load.image(CADRE_KEY,cadreAsset);
   
  }

  create() {
    const sky = this.add.image(320, 230, 'sky');
    this.showInstructions();
    sky.setScale(3);
    const platforms = this.createPlatforms();
    this.player = this.createPlayer();
    this.scoreLabel = this.createScoreLabel(16, 16, 0);
    // creatre bush dans le but de test hitBush et mene a gameOver
     this.bush = this.createBush();
    this.physics.add.collider(this.player, platforms);
      this.physics.add.collider(this.bush, platforms);
    // this.physics.add.overlap(this.player, this.fishs, this.collectFish, null, this);
     this.physics.add.overlap(this.player, this.bush, this.hitBush, null, this);
    this.cursors = this.input.keyboard.createCursorKeys();

    /* The Collider takes two objects and tests for collision and performs separation against them.
    Note that we could call a callback in case of collision... */
  }

  update() {
    if (this.gameOver) {
      // return;
      // aller sur la nouvelle page game over
        window.location.href= '/gameOver';
    }
  
    if(this.cursors.space.isDown && this.player.body.touching.down ){
      this.player.setVelocityY(-300);
    }
    if(this.cursors.left.isDown){
      this.player.setVelocityX(-300);
    
    }
    if(this.cursors.left.isDown ){
      this.player.setVelocityX(-300);
    }   
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
    platforms
      .create(400, 580, GROUND_KEY)
      .setScale(2)
      .refreshBody();
     return platforms;
  }

  createPlayer() {
    const player = this.physics.add.sprite(10, 10, CAT_KEY);
    player.setBounce(0.1);
    player.setScale(0.5);
    player.setCollideWorldBounds(true);
    return player;
  }

  /* totalement a recréer tout ce qui est poisson */

  // createFish() {
  //   const fishs = this.physics.add.group({
  //     key: FISH_KEY,
  //     repeat: 11,
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
    const bush = this.physics.add.sprite(300, 0.5, BUSH_KEY);
    bush.setScale(0.3);
    bush.setCollideWorldBounds(true);
    return bush;
  }

  hitBush() {
    this.scoreLabel.setText(`GAME OVER : ( \nYour Score = ${this.scoreLabel.score}`);
    this.gameOver = true;
  }
}

export default GameScene;
