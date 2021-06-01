"use strict";
import * as sound from "./sound.js"

const CARROT_SIZE = 80;

// 당근 벌레 랜덤 배치 및 클릭 처리만 다룬다 (나머지는 script.js에서 다룸)
export default class Field {
    constructor(carrotCount, bugCount){
        this.carrotCount = carrotCount;
        this.bugCount = bugCount;
        this.field = document.querySelector(".game__field");
        this.fieldRect = this.field.getBoundingClientRect();
        // 클릭되면 onclick 함수를 호출한다
        // 아래 this.onclick 같이 어떤 클래스 안에 있는 함수를 다른 콜백으로 전달할 때는 그 함수가 포함되어져 있는 클래스의 정보가 사라진다.
        // 이렇게 날라가는 것을 방지하기 위해 this와 함수를 묶을 수 있는 binding 기능을 사용한다
        // 직접적으로 .bind()메서드를 이용할 수도 있고, arrow function을 이용할 수도 있다. 둘중 맞는 방법을 사용한다.
        // 참고로 arrow function은 일반 함수와 다르게 알아서 binding이 된다
        this.field.addEventListener("click", this.onItemClick);
    }

    //클릭한 내역 전달하는 함수 (콜백함수) - 단지 전달만 함
    setItemClickListener(onItemClick){
        this.onItemClick = onItemClick;
    }

    init(){
        this.field.innerHTML = "";
        this._addItem("carrot", this.carrotCount, "./assets/img/carrot.png");
        this._addItem("bug", this.bugCount, "./assets/img/bug.png");
    }

    // private 멤버 변수는 _(언더바)로 표시 - 외부에선 사용하지 않도록 합의된 표현
    _addItem(className, count, imgPath){
        const x1 = 0;
        const y1 = 0;
        const x2 = this.fieldRect.width - CARROT_SIZE;
        const y2 = this.fieldRect.height - CARROT_SIZE;
        
        // 아이템 생성
        for(let i = 0; i <= count -1; i++){
            const item = document.createElement("img");
            item.setAttribute("class", className)
            item.setAttribute("src", imgPath);
            // 아이템 배치
            item.style.position = "absolute";
            const x = randomNumber(x1, x2);
            const y = randomNumber(y1, y2);
            item.style.left = `${x}px`;
            item.style.top = `${y}px`;
            item.style.userDrag = "none";
            this.field.appendChild(item);
        }
    }

    onItemClick = (event) => {
        const target = event.target;
        // 당근 잡으면 성공 (갯수 세기)
        if(target.matches(".carrot")){
            sound.playCarrot();
            target.remove();
            // 이 아이템이 클릭되면 carrot이 클릭되었다고 본부에 전달해줘라
            // 근데 그전에 onItemClick이라는 "콜백함수"가 있는지 부터 확인해라(버그 방지용!)
            this.onItemClick && this.onItemClick("carrot")        
        // 벌레 잡으면 fail
        }else if(target.matches(".bug")){
            this.onItemClick && this.onItemClick("bug")
        }
    }
}


// 클래스에 상관 없는 함수라면 클래스 밖에 두어 호출 될 때마다 반복되지 않도록 한다(메모리 효율) = static function
function randomNumber(min, max){
    return Math.floor(Math.random()*(max - min) + min);
}