const express = require('express');
const {getUserScoreByFish, getUserScoreByTime, getBestScoreByTime, getBestScoreByFish, addScore} = require('../models/Score');
const router = express.Router();
// function to get all the scores from an user from the json database sorted by fish
router.post('/getUserFish', async (req,res) => {
    const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;

    console.log(email);

    const scoreUserFish = await getUserScoreByFish(email);
    if (scoreUserFish === undefined){
        return res.status(404).json({ error: "L'utilisateur n'a pas de score"});
    }
    console.log('Scores sorted by fish : ', scoreUserFish);
    return res.json(scoreUserFish);
});

// function to get all the scores from an user from the json database sorted by Timer
router.post('/getUserTimer', async (req,res) => {
    const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;

    console.log(email);

    const scoreUserTimer = await getUserScoreByTime(email);
    if (scoreUserTimer === undefined){
        return res.status(404).json({ error: "L'utilisateur n'a pas de score"});
    }
    console.log('Scores sorted by timer : ', scoreUserTimer);
    return res.json(scoreUserTimer);
});

// function to get all the scores from the json database sorted by fish
router.get('/getFish', async (req,res) => {

    const scoreFish = await getBestScoreByFish();
    if (scoreFish === undefined){
        return res.status(404).json({ error: "Aucun score n'est enregistré"});
    }
    console.log('Scores sorted by fish : ', scoreFish);
    return res.json(scoreFish);
});

// function to get all the scores from an user from the json database sorted by timer
router.get('/getTimer', async (req,res) => {
    const scoreTimer = await getBestScoreByTime();
    if (scoreTimer === undefined){
        return res.status(404).json({ error: "Aucun score n'est enregistré"});
    }
    console.log('Scores sorted by timer : ', scoreTimer);
    return res.json(scoreTimer);
});

// function to add a score from an user into the json database
router.post('/addScore', async (req,res) => {
    const email = req?.body?.email?.length !== 0 ? req.body.email : undefined;
    const firstname = req?.body?.firstname?.length !== 0 ? req.body.firstname : undefined;
    const fish = req?.body?.fish?.length !== 0 ? req.body.fish : undefined;
    const timer = req?.body?.timer?.length !== 0 ? req.body.timer : undefined;
  
    console.log(email);
    console.log(firstname);
    console.log(fish);
    console.log(timer);
  
    const score = await addScore(email,firstname, fish, timer);
    if (score === undefined){
      return res.status(404).json({ error: "erreur lors de l'ajout du score"});
    }
    console.log('New score registered : ', score);
    return res.json(score);
    
  });

module.exports = router;