"use strict";
import PopUp from "./popup.js"
import Field from "./field.js"



const CARROT_COUNT = 20;
const BUG_COUNT = 20;
let success = 0;
let gameTime = 60;

const game__button = document.querySelector(".game__button");
const stop__button = document.querySelector(".stop__button");
const game_timer = document.querySelector(".timer");
const game_count = document.querySelector(".counter");



const bugSound = new Audio("./assets/sound/bug_pull.mp3")
const alertSound = new Audio("./assets/sound/alert.wav")
const bgSound = new Audio("./assets/sound/bg.mp3")
const winSound = new Audio("./assets/sound/game_win.mp3")

let started = false;
let timer = undefined;

const gameFinishBanner = new PopUp();
const gamefield = new Field(CARROT_COUNT, BUG_COUNT);

// 게임의 4가지 단계
function startGame(){
    started = true;
    success = 0;
    initGame();
    showStopButton();
    showTimeAndScore();
    startGameTimer();
    playSound(bgSound)
}

function stopGame(){
    started = false;
    stopGameTimer();
    hideGameButton();
    gameFinishBanner.showWithText("Wanna Replay?");
    playSound(alertSound);
    stopSound(bgSound);
}

function finishGame(win){
    started = false;
    hideGameButton();
    stopGameTimer();
    if(win){
        playSound(winSound)
    }else{
        playSound(bugSound)
    }
    stopSound(bgSound);
    gameFinishBanner.showWithText(win? "You Won!" : "You Lost");

}

// 당근/벌레 클릭 시 진행할 사항
function onItemClick(item){
    if(!started){
        return;
    }
   // 당근 잡으면 성공 (갯수 세기)
   if(item === "carrot"){
        success++;
        gameCounter();
        if(success === CARROT_COUNT){
            finishGame(true);
        }
    // 벌레 잡으면 fail
   }else if(item === "bug"){
        stopGameTimer();
        finishGame(false);
   }
}

function playSound(sound){
    sound.currentTime = 0;
    sound.play();
}

function stopSound(sound){
    sound.pause();
}

function initGame(){
    gameCounter();
    gamefield.init();
}

function showStopButton(){
    const icon = game__button.querySelector(".fas");
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play");
}

function hideGameButton(){
    game__button.style.visibility = "hidden";
}

function showGameButton(){
    game__button.style.visibility = "visible";
}

function showTimeAndScore(){
    game_timer.style.visibility = `visible`;
    game_count.style.visibility = `visible`;
}

function startGameTimer(){
    let remainingTimeSec = gameTime;
    updateTimerText(remainingTimeSec);;
    timer = setInterval(() => {
        if(remainingTimeSec <=0){
            clearInterval(timer);
            finishGame(CARROT_COUNT === success)
            return;
       }
        updateTimerText(--remainingTimeSec);
    }, 1000);
}

function stopGameTimer(){
    clearInterval(timer);
}

function updateTimerText(remainingTimeSec){
    let min = Math.floor(remainingTimeSec / 60);
    let sec = remainingTimeSec % 60;
    game_timer.innerHTML = `
        ${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`
}



function gameCounter(){
    game_count.innerHTML = `${CARROT_COUNT - success}`;
}




function init(){
    //유효성 검사(당근/벌레 클릭 시 처리)
    gamefield.setItemClickListener(onItemClick);

    // 시작, 끝내기 버튼
    game__button.addEventListener("click", () => {
        if(started){
            stopGame();
        }else{
            startGame();
        };
    });
    // 다시 시작
    // 팦업이 클릭이 되면 게임을 시작해라
    gameFinishBanner.setClickListener(() => {
        stopGameTimer();
        startGame();
        showGameButton();
    })
}

init();



