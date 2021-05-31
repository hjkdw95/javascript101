"use strict";

export default class PopUp {
    constructor(){
        // 생성자에 DOM 요소 가져오기
        this.popup = document.querySelector(".popup");
        this.replay__button = document.querySelector(".replay");
        this.message = document.querySelector(".message");

        this.replay__button.addEventListener("click", () => {
            // 우리한테 onclick이 들어왔고, onclick이라는 콜백함수가 있으면, onclick 함수를 실행해줘라
            this.onClick && this.onClick();
            this.hidePopUp();
        });   
    }

    // PopUp 클래스에서 받아낸 click 이벤트를 export해준다
    // 단지 전달만 하는 콜백함수다
    setClickListener(onClick){
        this.onClick = onClick;
    }

    hidePopUp(){
        this.popup.classList.add("popup--hide");
    }

    showWithText(text){
        this.message.innerHTML = `${text}`;
        this.popup.classList.remove("popup--hide")
    }
}