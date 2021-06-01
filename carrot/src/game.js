"use strict"
import Field from "./field.js"
import * as sound from "./sound.js"

export default class GameBuilder {
    withGameDuration(duration){
        this.gameDuration = duration;
        return this;
    }
    withCarrotCount(num){
        this.carrotCount = num;
        return this;
    }
    withBugCount(num){
        this.bugCount = num;
        return this;
    }

    build(){
        return new Game(
            this.gameDuration,
            this.carrotCount,
            this.bugCount
        )
    }
}

// 게임이 얼마나 오래 지속되었는지
// carrot이랑 벌레 몇개 집었는지
class Game {
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.game_timer = document.querySelector(".timer");
        this.game_count = document.querySelector(".counter");   
        //this.stop__button = document.querySelector(".stop__button");

        this.game__button = document.querySelector(".game__button");
        this.game__button.addEventListener("click", () => {
            if(this.started){
                this.stop();
            }else{
                this.start();
            };
        });

        this.gamefield = new Field(carrotCount, bugCount);
        this.gamefield.setItemClickListener(this.onItemClick);


        this.started = false;
        this.gameTime = 60;
        this.success = 0;
    }

    setGameStopListener(onGameStop){
        this.onGameStop = onGameStop;
    }

    start(){
        this.started = true;
        this.success = 0;
        this.initGame();
        this.showStopButton();
        this.showTimeAndScore();
        this.startGameTimer();
        sound.playBg();
    }
    
    stop(){
        this.started = false;
        this.stopGameTimer();
        this.hideGameButton();
        sound.playAlert();
        sound.stopBg();
        this.onGameStop && this.onGameStop("cancel");
    }

    finish(win){
        this.started = false;
        this.hideGameButton();
        this.stopGameTimer();
        if(win){
            sound.playWin();
        }else{
            sound.playBug();
        }
        sound.stopBg();
        this.onGameStop && this.onGameStop(win? "win" : "lose");
    }

    initGame(){
        this.gameCounter();
        this.gamefield.init();
    }

    onItemClick = (item) => {
        if(!this.started){
            return;
        }
       // 당근 잡으면 성공 (갯수 세기)
       if(item === "carrot"){
            this.success++;
            this.gameCounter();
            if(this.success === this.carrotCount){
                this.finish(true);
            }
        // 벌레 잡으면 fail
       }else if(item === "bug"){
            this.stopGameTimer();
            this.finish(false);
       }
    }

    showStopButton(){
        const icon = this.game__button.querySelector(".fas");
        icon.classList.add("fa-pause");
        icon.classList.remove("fa-play");
    }
    
    hideGameButton(){
        this.game__button.style.visibility = "hidden";
    }
    
    showGameButton(){
        this.game__button.style.visibility = "visible";
    }
    
    showTimeAndScore(){
        this.game_timer.style.visibility = `visible`;
        this.game_count.style.visibility = `visible`;
    }
    
    startGameTimer(){
        let remainingTimeSec = this.gameDuration;
        this.updateTimerText(remainingTimeSec);;
        this.timer = setInterval(() => {
            if(remainingTimeSec <=0){
                clearInterval(this.timer);
                this.finish(this.carrotCount === this.success)
                return;
           }
            this.updateTimerText(--remainingTimeSec);
        }, 1000);
    }

    stopGameTimer(){
        clearInterval(this.timer);
    }
    
    updateTimerText(remainingTimeSec){
        let min = Math.floor(remainingTimeSec / 60);
        let sec = remainingTimeSec % 60;
        this.game_timer.innerHTML = `
            ${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`
    }
    
    gameCounter(){
        this.game_count.innerHTML = `${this.carrotCount - this.success}`;
    }
    
    
}