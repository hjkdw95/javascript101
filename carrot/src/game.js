

// 게임이 얼마나 오래 지속되었는지
// carrot이랑 벌레 몇개 집었는지
export default class Game {
    constructor(gameDuration, carrotCount, bugCount){
        this.gameDuration = gameDuration;
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;

        this.game__button = document.querySelector(".game__button");
        this.game_timer = document.querySelector(".timer");
        this.game_count = document.querySelector(".counter");   
        //this.stop__button = document.querySelector(".stop__button");

        this.gamefield = new Field(carrotCount, bugCount);
        this.gamefield.setItemClickListener(this.onItemClick);


        this.started = false;
        this.gameTime = 60;
        this.success = 0;

        this.game__button.addEventListener("click", this.onClick)
    }
    // 바깥으로 보내기
    setClickListener(onClick){
        this.onClick = onClick;
    }

    // 안에서 처리할 것
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
    
    stopGameTimer(){
        clearInterval(timer);
    }
    
    updateTimerText(remainingTimeSec){
        let min = Math.floor(remainingTimeSec / 60);
        let sec = remainingTimeSec % 60;
        this.game_timer.innerHTML = `
            ${min < 10 ? `0${min}` : min} : ${sec < 10 ? `0${sec}` : sec}`
    }
    
    gameCounter(){
        this.game_count.innerHTML = `${CARROT_COUNT - success}`;
    }
    
    
}