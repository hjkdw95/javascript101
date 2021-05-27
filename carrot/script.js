const CARROT_SIZE = 80;
const CARROT_COUNT = 30;
const BUG_COUNT = 30;
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

const carrotSound = new Audio("./assets/sound/carrot_pull.mp3")
const bugSound = new Audio("./assets/sound/bug_pull.mp3")
const alertSound = new Audio("./assets/sound/alert.wav")
const bgSound = new Audio("./assets/sound/bg.mp3")
const winSound = new Audio("./assets/sound/game_win.mp3")

let started = false;
let score = 0;
let timer = undefined;

// 게임의 4가지 단계
function startGame(){
    started = true;
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
    showPopupWithText("Wanna Replay?");
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
    showPopupWithText(win? "You Won!" : "You Lost");

}

function replayGame(){
    replay__button.addEventListener("click", () => {
        stopGameTimer();
        startGame();
        hidePopUp();
        showGameButton();
    });
};

// 당근/벌레 클릭 시 진행할 사항
function onFieldClick(event){
    if(!started){
        return;
    }
   const target = event.target;
   // 당근 잡으면 성공 (갯수 세기)
   if(target.matches(".carrot")){
        target.remove();
        playSound(carrotSound);
        success++;
        updateScoreBoard();
        gameCounter();
        if(success === CARROT_COUNT){
            finishGame(true);
        }
    // 벌레 잡으면 fail
   }else if(target.matches(".bug")){
        stopGameTimer();
        finishGame(false);
   }
}

function updateScoreBoard(){
    game_count.innerHTML = `${success}`
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
    //유효성 검사(당근/벌레 클릭 시 처리)
    field.addEventListener("click", onFieldClick);

    // 시작, 끝내기 버튼
    game__button.addEventListener("click", () => {
        if(started){
            stopGame();
        }else{
            startGame();
        };
    });
    // 다시 시작 버튼
    replayGame();
}

init();



