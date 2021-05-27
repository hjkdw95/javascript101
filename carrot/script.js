const CARROT_SIZE = 80;

const field = document.querySelector(".game__field")
const fieldRect = field.getBoundingClientRect();
const game__button = document.querySelector(".game__button")

function initGame(){
    console.log(fieldRect)
    addItem("carrot", 5, "./assets/img/carrot.png");
    addItem("bug", 5, "./assets/img/bug.png")
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
        field.append(item);
        // 아이템 배치
        item.style.position = "absolute";
        const x = randomNumber(x1, x2);
        const y = randomNumber(y1, y2);
        item.style.left = `${x}px`;
        item.style.top = `${y}px`;
        console.log(`${x}px, ${y}px`)
    }

}

function randomNumber(min, max){
    const calculatedNumber = Math.floor(Math.random()*(max - min) + min);
    return calculatedNumber; 
}



function init(){
    game__button.addEventListener("click", initGame)
}

init();






