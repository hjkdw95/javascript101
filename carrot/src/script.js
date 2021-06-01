// 게임을 만들고 게임과 배너 연결

"use strict";
import PopUp from "./popup.js"
import { GameBuilder, Reason } from "./game.js"
import * as sound from "./sound.js"

// 1. 게임 생성
const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.withGameDuration(5)
.withCarrotCount(3)
.withBugCount(3)
.build();

// 2. 이겼는지 졌는지 확인
game.setGameStopListener((reason) => {
    let message;
    switch(reason){
        case Reason.cancel:
            sound.playAlert();
            message = "Wanna Replay?";
            break;
        case Reason.win:
            sound.playWin();
            message = "You Won!";
            break;
        case Reason.lose:
            sound.playBug();
            message = "Looooose!";
            break;
        default:
            throw new Error ("not vaild reason");
    }
    gameFinishBanner.showWithText(message);

})

// 3. 배너를 클릭하면 replay(초기화)
gameFinishBanner.setClickListener(() => {
    //game.start안의 this.에 접근하기 때문에 this binding을 해준다. (call back함수는 binding 필요)
    //여기선 arrow function 사용
    game.stopGameTimer();
    /*
        예로 위의 경우 PopUp class의 setClickListener를 보면,
        setClickListener(game.stopGameTimer()){
        this.onClick = game.startGameTimer()
        }
        가 되는 것이고, 
        콜백함수로 들어간 game.startGameTimer가 실행된다
        
        여기서 12번째 줄 this.onClick && this.onClick()을 분석하면
        this.onClick = game.startGameTimer()이고, 
        이게 game class에 실제로 존재하기 때문에 실행하게 된다.
    */
    game.start();
    game.showGameButton();
});



