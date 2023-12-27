const player1El = document.querySelector(".player1");
const player2El = document.querySelector(".player2");
const tieScoreEl = document.getElementById("tieScore");
const gameBoardEl = document.getElementById("gameBoard");

const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];

gameBoardEl.innerHTML = arr
  .map((_, index) => {
    return `<div class="item" id="item${
      index + 1
    }" onclick="markChoice(event)"></div>`;
  })
  .join("");

const markAllBoxes = () => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      markedArray[row][col].mark = "marked";
    }
  }
};

const callNewGame = () => {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      markedArray[row][col].mark = "none";
      const boxNo = 3 * row + col;
      const boxEl = document.getElementById(`item${boxNo + 1}`);
      boxEl.style.fontSize = "80px";
      boxEl.style.color = "white";
      boxEl.innerHTML = "";
      markedBoxes = 0;
      chance = 1;
      player1El.style.border = `1px solid white`;
      player2El.style.border = `1px solid transparent`;
    }
  }
};

const highLightBoxes = (result, line) => {
  if (result != "draw") {
    for (let i = 0; i < 3; i++) {
      let boxNo;
      if (result === "row") {
        boxNo = 3 * line + i;
      } else if (result === "col") {
        boxNo = 3 * i + line;
      } else if (result === "lDiag") {
        boxNo = 3 * i + i;
      } else if (result === "rDiag") {
        boxNo = 3 * i + (2 - i);
      }
      const boxEl = document.getElementById(`item${boxNo + 1}`);
      boxEl.style.color = "green";
      boxEl.style.fontSize = "120px";
      boxEl.style.transition = "0.3s ease-in-out";
    }
  } else {
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 3; col++) {
        const boxNo = 3 * row + col;
        const boxEl = document.getElementById(`item${boxNo + 1}`);
        boxEl.style.color = "gray";
        boxEl.style.transition = "0.3s ease-in-out";
      }
    }
  }
};

const updateResult = (symbol, result, line) => {
  if (symbol === "X") {
    player1El.children[1].innerText = 1 + +player1El.children[1].innerText;
  } else if (symbol === "O") {
    player2El.children[1].innerText = 1 + +player2El.children[1].innerText;
  } else {
    tieScoreEl.innerText = 1 + +tieScoreEl.innerText;
  }

  markAllBoxes();

  setTimeout(() => {
    highLightBoxes(result, line);
  }, 500);

  setTimeout(() => {
    callNewGame();
  }, 2000);
};

const checkPattern = (symbol, row, col) => {
  if (
    markedArray[row][0].mark === markedArray[row][1].mark &&
    markedArray[row][1].mark === markedArray[row][2].mark
  ) {
    // same row
    updateResult(markedArray[row][col].mark, "row", row);
  } else if (
    markedArray[0][col].mark === markedArray[1][col].mark &&
    markedArray[1][col].mark === markedArray[2][col].mark
  ) {
    // same col
    updateResult(markedArray[row][col].mark, "col", col);
  } else if (
    row === col &&
    markedArray[0][0].mark === markedArray[1][1].mark &&
    markedArray[1][1].mark === markedArray[2][2].mark
  ) {
    // left diagonal
    updateResult(markedArray[row][col].mark, "lDiag", -1);
  } else if (
    row + col === 2 &&
    markedArray[0][2].mark === markedArray[1][1].mark &&
    markedArray[1][1].mark === markedArray[2][0].mark
  ) {
    // right diagonal
    updateResult(markedArray[row][col].mark, "rDiag", -1);
  } else if (markedBoxes >= 9) {
    updateResult("D", "draw", -1);
  }
};

const markChoice = (event) => {
  const clickedElement = event.target;
  const boxDiv = clickedElement.closest(".item");
  const boxId = boxDiv.id;
  const boxNo = boxId.split("m")[1];
  const row = Math.floor((boxNo - 1) / 3);
  const col = Math.floor((boxNo - 1) % 3);
  const boxEl = document.getElementById(boxId);

  if (markedArray[row][col].mark == "none") {
    if (chance == 1) {
      boxEl.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      player1El.style.border = `1px solid transparent`;
      player2El.style.border = `1px solid white`;
      markedArray[row][col].mark = `X`;
      markedBoxes++;
      checkPattern("X", row, col);
      chance = 2;
    } else {
      boxEl.innerHTML = '<i class="fa-solid fa-o"></i>';
      player1El.style.border = `1px solid white`;
      player2El.style.border = `1px solid transparent`;
      markedArray[row][col].mark = "O";
      markedBoxes++;
      checkPattern("O", row, col);
      chance = 1;
    }
  }
};

let chance = 1;
let markedBoxes = 0;

const markedArray = [];

for (let i = 0; i < 3; i++) {
  const rowArray = [];
  for (let j = 0; j < 3; j++) {
    const boxObject = {
      box: 3 * i + j + 1,
      mark: "none",
    };
    rowArray.push(boxObject);
  }
  markedArray.push(rowArray);
}
