"use strict";

export default class PopUp {
    constructor(){
        // 생성자에 DOM 요소 가져오기
        this.popup = document.querySelector(".popup");
        this.replay__button = document.querySelector(".replay");
        this.message = document.querySelector(".message");

        this.replay__button.addEventListener("click", () => {
            // 우리한테 들어온 onclick에 해당하는 콜백함수가 있으면, onclick 함수를 실행해줘라
            // 안전하게 진행하기 위해 콜백존재 여부 확인 후 진행
            //콜백함수를 지정을 안해준 이유는, 아무거나 와도 실행되도록 하기 위해서
            this.onClick && this.onClick();
            this.hide();
        });   
    }

    // click이 발생하면 멤버변수 onClick이 가리키는 콜백 함수를 불러온다
    // 콜백함수 전달 역할
    setClickListener(onClick){
        this.onClick = onClick;
    }

    hide(){
        this.popup.classList.add("popup--hide");
    }

    showWithText(text){
        this.message.innerHTML = `${text}`;
        this.popup.classList.remove("popup--hide")
    }
}