const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
let success = 0;
let id = 1;
let gameTime = 60;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const game__button = document.querySelector(".game__button");
const stop__button = document.querySelector(".stop__button");
const game_timer = document.querySelector(".timer");
const game_count = document.querySelector(".counter");
const popup = document.querySelector(".popup");
const replay__button = document.querySelector(".replay");
const message = document.querySelector(".message");


let started = false;
let score = 0;
let timer = undefined;

function startGame(){
    started = true;
    initGame();
    showStopButton();
    showTimeAndScore();
    startGameTimer();
}

function stopGame(){
    started = false;
    stopGameTimer();
    hideGameButton();
    showPopupWithText("Wanna Replay?");
    replay();
}

function finishGame(win){
    started = false;
    hideGameButton();
    showPopupWithText(win? "You Won!" : "You Lost")
}

function replayGame(){
    replay__button.addEventListener("click", () => {
        stopGameTimer();
        startGame();
        hidePopUp();
        showGameButton();
    });
};

function onFieldClick(event){
    if(!started){
        return;
    }
   const target = event.target;
   if(target.matches(".carrot")){
        target.remove();
        success++;
        gameCounter();
        if(success === CARROT_COUNT){
            finishGame(true);
        }
   }else if(target.matches(".bug")){
        stopGameTimer();
        finishGame(false);
   }
}

function initGame(){
    gameCounter();
    field.innerHTML = "";

    addItem("carrot", CARROT_COUNT, "./assets/img/carrot.png");
    addItem("bug", BUG_COUNT, "./assets/img/bug.png");
}

function addItem(className, count, imgPath){
    const x1 = 0;
    const y1 = 0;
    const x2 = fieldRect.width - CARROT_SIZE;
    const y2 = fieldRect.height - CARROT_SIZE;
    
    // 아이템 생성
    for(let i = 0; i <= count -1; i++){
        const item = document.createElement("img");
        item.setAttribute("class", className)
        item.setAttribute("src", imgPath);
        item.setAttribute("id", `${id}`);
        id++;
        field.append(item);
        // 아이템 배치
        item.style.position = "absolute";
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
    }
}


function randomNumber(min, max){
    const calculatedNumber = Math.floor(Math.random()*(max - min) + min);
    return calculatedNumber; 
}

function showStopButton(){
    const icon = game__button.querySelector(".fas");
    icon.classList.add("fa-pause");
    icon.classList.remove("fa-play")
   // game__button.removeEventListener("click", initGame)
   // game__button.setAttribute("class", "stop__button");
   // game__button.innerHTML = `<i class="fas fa-pause"></i>`;
    //resume();
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

function showPopupWithText(text){
    message.innerHTML = `${text}`;
    popup.classList.remove("popup--hide")
}

function hidePopUp(){
    popup.classList.add("popup--hide")
}


function gameCounter(){
    game_count.innerHTML = `${CARROT_COUNT - success}`;
}




function init(){
    field.addEventListener("click", onFieldClick);

    game__button.addEventListener("click", () => {
        if(started){
            stopGame();
        }else{
            startGame();
        };
    });

    replayGame();
}

init();



