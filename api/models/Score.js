const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/scores.json');

defaultScore = [
    {
    id: 1,
    email: 'j.d@student.vinci',
    fish: 1,
    timer: 3
    }
]


async function addScore(email, fish, timer){
    const score = {
        getNextId,
        email,
        fish,
        timer
    }
    const scores = parse(jsonDbPath, defaultScore);
    scores.push(score);

    serialize(jsonDbPath,scores);

    return score;
}

async function getUserScoreByFish(email){
    const scores = parse(jsonDbPath, defaultScore);
    const userScores = [];
    scores.forEach((score) => {
        const scoreUserFish = {
            email: score.email,
            fish: score.fish
        }
        if (score.email === email){
            if (score.fish > 0){
               userScores.push(scoreUserFish); 
            }
        }
    });
    userScores.sort((a, b) => b.fish-a.fish);
    console.log(userScores);
    return userScores;
}
async function getUserScoreByTime(emailUser){
    const scores = parse(jsonDbPath, defaultScore);
    const userScores = [];
    scores.forEach((score) => {
        const scoreUserTimer = {
            email: score.email,
            timer: score.timer
        }
        if (scoreUserTimer.email === emailUser){
            userScores.push(scoreUserTimer); 
        }
    });
    userScores.sort((a, b) => b.timer-a.timer);
    console.log(userScores);
    return userScores;
}
async function getBestScoreByFish(){
    const scores = parse(jsonDbPath, defaultScore);
    const userScores = [];
    scores.forEach((score) => {
        const scoreWithFish = {
            email: score.email,
            fish: score.fish
        }
        if (score.fish > 0){
            userScores.push(scoreWithFish);
        }
    });
    userScores.sort((a, b) => b.fish-a.fish);
    console.log(userScores);
    scores.reverse();
    return userScores;
}
async function getBestScoreByTime(){
    const scores = parse(jsonDbPath, defaultScore);
    const userScores = [];
    scores.forEach((score) => {
        const scoreWithTimer = {
            email: score.email,
            timer: score.timer
        }
        if(score.timer > 0){
            userScores.push(scoreWithTimer);
        }
    });
    userScores.sort((a, b) => b.timer-a.timer);
    console.log(userScores);
    return userScores;
}



function getNextId() {
    const scores = parse(jsonDbPath, defaultScore);
    const lastItemIndex = scores?.length !== 0 ? scores.length - 1 : undefined;
    if (lastItemIndex === undefined) return 1;
    const lastId = scores[lastItemIndex]?.id;
    const nextId = lastId + 1;
    return nextId;
  }

module.exports = {
    getUserScoreByFish,
    getUserScoreByTime,
    addScore,
    getBestScoreByFish,
    getBestScoreByTime
}


