const CARROT_SIZE = 80;
const CARROT_COUNT = 5;
const BUG_COUNT = 5;
let success = 0;
let id = 1;

const field = document.querySelector(".game__field");
const fieldRect = field.getBoundingClientRect();
const game__button = document.querySelector(".game__button");
const stop__button = document.querySelector(".stop__button");
const game_timer = document.querySelector(".timer");
const game_count = document.querySelector(".counter")

function initGame(){
    game__button.setAttribute("class", "game__button");
    game__button.innerHTML = `<i class="fas fa-play"></i>`
    addItem("carrot", CARROT_COUNT, "./assets/img/carrot.png");
    addItem("bug", BUG_COUNT, "./assets/img/bug.png");
    gameCounter();
    stopGame();
    clock();

    //클릭하면 삭제시키는 함수
    field.addEventListener("click", deleteItem)
;
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

function deleteItem(event){
    const id = event.target.id;
    if(id){
        const toBeDeleted = document.querySelector(`.carrot[id="${id}"]`)
        toBeDeleted.remove();
        success++;
    }
    gameCounter();
}


function randomNumber(min, max){
    const calculatedNumber = Math.floor(Math.random()*(max - min) + min);
    return calculatedNumber; 
}

function stopGame(){
    // stop버튼
    game__button.removeEventListener("click", initGame)
    game__button.setAttribute("class", "stop__button");
    game__button.innerHTML = `<i class="fas fa-pause"></i>`;
    //resume();
}

/*
function resume(){
    game__button.removeEventListener("click", stopGame)
    game__button.setAttribute("class", "game__button");
    game__button.innerHTML = `<i class="fas fa-play"></i>`;
    init();
}
*/

function clock(){
    let time = 60;
    let minute;
    let sec;
    let x = setInterval(() => {
        minute = parseInt(time/60);
        sec = time % 60;
        game_timer.innerHTML = `${minute < 10 ? `0${minute}` : minute} : ${sec < 10 ? `0${sec}` : sec}`
        time--;

        if(time < 0){
            clearInterval(x);
            console.log("게임 종료")
        }
    }, 1000);
}

function gameCounter(){
    game_count.innerHTML = `${CARROT_COUNT - success}`;
}

function init(){
    game__button.addEventListener("click", initGame);
}

init();






