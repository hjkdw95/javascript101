// 게임을 만들고 게임과 배너 연결

"use strict";
import PopUp from "./popup.js"
import { GameBuilder, Reason } from "./game.js"
import * as sound from "./sound.js"


const gameFinishBanner = new PopUp();
const game = new GameBuilder()
.withGameDuration(5)
.withCarrotCount(3)
.withBugCount(3)
.build();

game.setGameStopListener((reason) => {
    console.log(reason);
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

gameFinishBanner.setClickListener(() => {
    game.stopGameTimer();
    game.start();
    game.showGameButton();
});



