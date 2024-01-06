const startbtn = document.querySelector(".startbtn");
const multiplayer_btn = document.querySelector(".multibtn");
const singleplayer_btn = document.querySelector(".singlebtn");
const sym_x = document.querySelector("#x");
const sym_o = document.querySelector("#o");
const player2 = document.querySelector(".com_btn");
const restart = document.querySelector(".restart");
const exit = document.querySelector(".exit");
const box1 = document.querySelector(".box1");
const box2 = document.querySelector(".box2");
const box3 = document.querySelector(".box3");
const box4 = document.querySelector(".box4");
const box5 = document.querySelector(".box5");
const con = document.querySelector(".con");
const box = document.querySelectorAll(".box");
const line = document.querySelector("#line");
const wontext = document.querySelector(".won");
const image_x = "url(../resource/x.webp)";
const image_o = "url(./resource/o.png)";
let image_c = "";
let player = true;
let image_com = "";
let count = 0;
box.forEach((x) => {
  x.addEventListener("click", boxclicked);
});

startbtn.addEventListener("click", startpage);

singleplayer_btn.addEventListener("click", singleplayer);

multiplayer_btn.addEventListener("click", multiplayer);

exit.addEventListener("click", exitt);

sym_o.addEventListener("click", () => {
  image_c = image_o;
  image_com = image_x;
  con.classList.add("continue");
  const continuee = document.querySelector(".continue");
  continuee.addEventListener("click", conbtn);
  sym_x.style.cssText = "  border:";
  sym_o.style.cssText = "  border: 3px dashed rgb(255, 255, 255);";
});

sym_x.addEventListener("click", () => {
  image_c = image_x;
  image_com = image_o;
  con.classList.add("continue");
  const continuee = document.querySelector(".continue");
  continuee.addEventListener("click", conbtn);
  sym_o.style.cssText = "  border:";
  sym_x.style.cssText = "  border: 3px dashed rgb(255, 255, 255);";
});

function startpage() {
  box1.style.width = "0";
}

function multiplayer() {
  box2.style.height = "0";
  box3.style.height = "0";
  player2.textContent = "Player ~ 2";
}

function singleplayer() {
  box2.style.height = "0";
  player2.textContent = "computer";
  player = false;
}

function conbtn() {
  box3.style.top = "100%";
}

function player_one() {
  box4.style.left = "100%";
}

function exitt() {
  location.reload();
}

function boxclicked() {
  if (player) {
    if (!image_c) {
      image_c = image_x;
      this.style.setProperty("background-image", image_c);
    } else if (image_c === image_x && !this.hasAttribute("style")) {
      image_c = image_o;
      this.style.setProperty("background-image", image_c);
    } else if (!this.hasAttribute("style")) {
      image_c = image_x;
      this.style.setProperty("background-image", image_c);
    }
    result(this);
    count++;
    if (count === 9) {
      setTimeout(() => {
        box4.style.width = "0";
        wontext.textContent = "match draw";
      }, 1000);
    }
  } else {
    this.style.setProperty("background-image", image_c);
    count++;

    result(this, "you");

    if (count < 5) {
      setTimeout(computer_play, 1000);
    } else {
      setTimeout(() => {
        box4.style.width = "0";
        wontext.textContent = "match draw";
      }, 1000);
    }
  }

  this.removeEventListener("click", boxclicked);
}

function computer_play() {
  let com = null;
  do {
    com = Math.floor(Math.random() * 8);
  } while (box[com].hasAttribute("style"));
  box[com].style.setProperty("background-image", image_com);
  result(box[com], "computer");
  box[com].removeEventListener("click", boxclicked);
}
function result(x, y) {
  const possiblity = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const filtered_array = possiblity.filter((z) => {
    const selected_box = parseInt(x.getAttribute("data-z"));
    if (z.includes(selected_box)) return z;
  });

  for (let i = 0; i < filtered_array.length; i++) {
    let count = 0;
    let won = 0;
    for (let j = 0; j < filtered_array[i].length; j++) {
      if (
        box[filtered_array[i][j]].hasAttribute("style") &&
        x.getAttribute("style") ==
          box[filtered_array[i][j]].getAttribute("style")
      ) {
        count++;
        won = i;
      } else break;
    }
    if (count === 3) {
      const won_array = possiblity.indexOf(filtered_array[won]);
      const class_name = "ani" + won_array;
      const width = won_array > 5 ? "130%" : "96%";

      line.classList.add(class_name);
      line.style.width = width;
      let finaltxt = "";
      setTimeout(() => {
        box4.style.width = "0";
        if (y) {
          finaltxt = y + "  won the match ..";
        } else finaltxt = "have you enjoyed !!";
        wontext.textContent = finaltxt;
      }, 1500);

      break;
    }
  }
}

restart.addEventListener("click", restart_game);

function restart_game() {
  box.forEach((z) => {
    z.removeAttribute("style");
  });
  box4.style.width = "100%";
  line.removeAttribute("class");
  line.style.width = "0";
  count = 0;
  box.forEach((x) => {
    x.addEventListener("click", boxclicked);
  });
  wontext.textContent = "have you enjoyed !!";
}
