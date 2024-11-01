let form = document.getElementById("form");
let userSelector = document.getElementById("user");
let botSelector = document.getElementById("bot");
let gameResult = document.getElementById("game-result");

let users = document.querySelector(".game-body_head > span");
let chosen = document.getElementById("chosen");
let btnStart = document.querySelector(".start-btn");
let time = document.querySelector(".timeOut");
let skeleton = document.querySelector(".skeleton");

window.onload = () => {
  setTimeout(() => {
    skeleton.classList.add("left");
  }, 2000);
}

let user = {
  username: "",
};
let bot = "";
let cart = "";
let count = 0;
let timeOut = 3;

let gameData = [
  {
    id: "1",
    title: "Taş",
    logo: "assets/public/tas.jpg",
  },
  {
    id: "2",
    title: "Kağıt",
    logo: "assets/public/kagit.jpg",
  },
  {
    id: "3",
    title: "Makas",
    logo: "assets/public/makas.jpg",
  },
];

const handleOnChange = async (formState) => {
  formState.addEventListener("input", (e) => {
    const { name, value } = e.target;
    user[name] = value.trim();
  });
};

handleOnChange(form.username);

form.btn.addEventListener("click", (e) => {
  e.preventDefault();
  if (user.username === "") {
    alert("Zəhmət olmasa, istifadəçi adınızı yazın!");
  } else {
    window.location.href = "main.html#game";
    users.innerHTML = user.username;
  }
});

function botChoosen() {
  const randomSelected = Math.floor(Math.random() * gameData.length);
  return gameData[randomSelected].title;
}

writeData(gameData);

function writeData(data) {
  let empty = "";
  data && data.length > 0
    ? data.map((item) => {
        return (empty += `<li class="game-body_option">
                        <div class="game-option_content">
                           <button type="button" class="game-btn">
                              <img src=${item.logo} alt="${item.title}" data-text="${item.title}">
                           </button>
                        </div>
                     </li>`);
      })
    : "";
  chosen.innerHTML = empty;
  let gameBtns = document.querySelectorAll(".game-btn");
  gameBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let getData = e.target.getAttribute("data-text");
      cart = getData;
      bot = botChoosen();
    });
  });
}

btnStart.addEventListener("click", () => {
  const confirmInfo = confirm("Hazırsan?");
  if (confirmInfo) {
    const intervalid = setInterval(() => {
      botSelector.innerHTML = ".".repeat(count);
      userSelector.innerHTML = ".".repeat(count);
      time.innerHTML = timeOut;
      count++;
      if (count == 4) {
        count = 0;
      }
      timeOut--;
      if (timeOut == 0) {
        clearInterval(intervalid);
        botSelector.innerHTML = bot;
        userSelector.innerHTML = cart;
        time.classList.add("none");
        timeOut = 3;
        if (
          (cart === "Makas" && bot === "Makas") ||
          (cart === "Kağıt" && bot === "Kağıt") ||
          (cart === "Taş" && bot === "Taş")
        ) {
          gameResult.innerHTML = "Bərabərə qaldınız";
        }
        if (
          (cart === "Makas" && bot === "Kağıt") ||
          (cart === "Kağıt" && bot === "Taş") ||
          (cart === "Taş" && bot === "Makas")
        ) {
          gameResult.innerHTML = "Qalib gəldiniz!";
        }
        if (
          (bot === "Makas" && cart === "Kağıt") ||
          (bot === "Kağıt" && cart === "Taş") ||
          (bot === "Taş" && cart === "Makas")
        ) {
          gameResult.innerHTML = "Təəssüfki, uduzdunuz...";
        }
      } else {
        time.classList.remove("none");
      }
    }, 1000);
  } else {
    alert("Oyun Başladılmadı");
  }
});
