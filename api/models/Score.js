const path = require('node:path');
const { parse, serialize } = require('../utils/json');

const jsonDbPath = path.join(__dirname, '/../data/scores.json');

defaultScore = [
    {
    id: 1,
    firstname: 'Jean',
    email: 'j.d@student.vinci',
    fish: 1,
    timer: 3
    }
]


async function addScore(email, firstname, fish, timer){
    const score = {
        getNextId,
        email,
        firstname,
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
            firstname: score.firstname,
            fish: score.fish
        }
        if (score.email === email){
            if (score.fish > 0){
               userScores.push(scoreUserFish); 
            }
        }
    });
    userScores.sort((a, b) => b.fish-a.fish);
    while (userScores.length > 10){
        userScores.pop();
    }
    console.log(userScores);
    return userScores;
}
async function getUserScoreByTime(emailUser){
    const scores = parse(jsonDbPath, defaultScore);
    const userScores = [];
    scores.forEach((score) => {
        const scoreUserTimer = {
            firstname: score.firstname,
            email: score.email,
            timer: score.timer
        }
        if (scoreUserTimer.email === emailUser){
            userScores.push(scoreUserTimer); 
        }
    });
    userScores.sort((a, b) => b.timer-a.timer);
    while (userScores.length > 10){
        userScores.pop();
    }
    console.log(userScores);
    return userScores;
}
async function getBestScoreByFish(){
    const scores = parse(jsonDbPath, defaultScore);
    const userScores = [];
    scores.forEach((score) => {
        const scoreWithFish = {
            firstname: score.firstname,
            fish: score.fish
        }
        if (score.fish > 0){
            userScores.push(scoreWithFish);
        }
    });
    userScores.sort((a, b) => b.fish-a.fish);
    console.log(userScores);
    while (userScores.length > 10){
        userScores.pop();
    }
    scores.reverse();
    return userScores;
}
async function getBestScoreByTime(){
    const scores = parse(jsonDbPath, defaultScore);
    const userScores = [];
    scores.forEach((score) => {
        const scoreWithTimer = {
            firstname: score.firstname,
            timer: score.timer
        }
        if(score.timer > 0){
            userScores.push(scoreWithTimer);
        }
    });
    userScores.sort((a, b) => b.timer-a.timer);
    while (userScores.length > 10){
        userScores.pop();
    }
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


