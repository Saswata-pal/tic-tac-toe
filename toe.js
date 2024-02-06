let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#resetbtn");
let newBtn = document.querySelector("#newBtn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX,playerO
let count = 0; //to check draww

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turnO = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");
};


boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        }else{
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner ();

        if (count === 9 && !isWinner){
            gameDraw();
        }
    });
});


const gameDraw = () => {
    msg.innerText = `GAME DRAW`;
    msgContainer.classList.remove("hide");
    console.log("game draw");
    disabledBoxes();
};


const disabledBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};


const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};


const showWinner = (winner) => {
    msg.innerText = `CONGRATS, WINNER IS player ${winner}`;
    msgContainer.classList.remove("hide");
    disabledBoxes();
};


const checkWinner = () => {
    for(let pattern of winPatterns){
     let post1val = boxes[pattern[0]].innerText;
     let post2val = boxes[pattern[1]].innerText;
     let post3val = boxes[pattern[2]].innerText;

     if (post1val != "" && post2val != "" && post3val != "") {
        if (post1val === post2val && post2val === post3val){
            console.log("WINNER", post1val);
            showWinner(post1val);
            return true;
        }
     }
    }
};

newBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);