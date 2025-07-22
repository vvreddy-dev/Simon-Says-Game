let gameSeq = [];
let userSeq = [];
let highScore = 0;
let btns = ["yellow", "red", "purple", "green"];

let started = false;
let level = 0;

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (started == false) {
        console.log("Game Started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");
    setTimeout(function () {
        btn.classList.remove("userFlash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = "Level " + level;
    let randInx = Math.floor(Math.random() * 3);
    let randColor = btns[randInx];
    let randBtn = document.querySelector(`.${randColor}`);

    // console.log(randInx);
    // console.log(randColor);
    // console.log(randBtn);

    gameSeq.push(randColor);
    console.log(gameSeq);

    gameFlash(randBtn);
}

function checkAns(idx) {
    // console.log('Current Level : ', level);

    if (userSeq[idx] === gameSeq[idx]) {
        // console.log("Same Value");
        if (userSeq.length === gameSeq.length) {
            setTimeout(levelUp, 500);
        }
    } else {
        h2.innerHTML = `Game Over! Your Score was <b>${
            level - 1
        }</b> Press Any Key To Start`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "white";
        }, 1000);
        highestScore();
        reset();
    }
}

function btnPress() {
    // console.log(this);
    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    // console.log(userColor);
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}

function highestScore() {
    if (highScore < level) {
        highScore = level - 1;
    }
    h3.innerText = `Highest Score was ${highScore}`;
}
