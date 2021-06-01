"use strict";
import PopUp from "./popup.js"
import GameBuilder from "./game.js"


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
        case "cancel":
            message = "Wanna Replay?"
            break;
        case "win":
            message = "You Won!"
            break;
        case "lose":
            message = "Looooose!"
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



