let yourVoteFor = document.querySelector(".d-1-1 span");
let office = document.querySelector(".d-1-2 span");
let description = document.querySelector(".d-1-4");
let warning = document.querySelector(".d-2");
let side = document.querySelector(".d-1-right");
let numbers = document.querySelector(".d-1-3 ");

let currentStage = 0;
let number = "";
let whiteVote = false;
let votes = []

function startStage() {
  let stage = stages[currentStage];
  let numberHtml = "";
  number = "";
  whiteVote = false;

  for (let i = 0; i < stage.numbers; i++) {
    i === 0
      ? (numberHtml += '<div class="number blink"></div>')
      : (numberHtml += '<div class="number"></div>');
  }

  yourVoteFor.style.display = "none";
  office.innerHTML = stage.title;
  description.innerHTML = "";
  warning.style.display = "none";
  side.innerHTML = "";
  numbers.innerHTML = numberHtml;
}

function updateInterface() {
  let stage = stages[currentStage];
  let candidate = stage.candidates.filter((item) => {
    if (item.number === number) {
      return true;
    } else {
      return false;
    }
  });
  if (candidate.length > 0) {
    candidate = candidate[0];
    yourVoteFor.style.display = "block";
    warning.style.display = "block";
    description.innerHTML = `Nome: ${candidate.name}<br> Partido: ${candidate.partie}`;
    let photosHtml = "";
    for (let i in candidate.photos) {
      candidate.photos[i].small
        ? (photosHtml += `<div class="d-1-image small"><img src="./assets/images/${candidate.photos[i].url}" alt="">${candidate.photos[i].subtitle}</div>`)
        : (photosHtml += `<div class="d-1-image"><img src="./assets/images/${candidate.photos[i].url}" alt="">${candidate.photos[i].subtitle}</div>`);
    }
    side.innerHTML = photosHtml;
  } else {
    yourVoteFor.style.display = "block";
    warning.style.display = "block";
    description.innerHTML = `<div class="big-warning blink">VOTO NULO</div>`;
  }
}

function clicked(n) {
  let elNumber = document.querySelector(".number.blink");
  if (elNumber !== null) {
    elNumber.innerHTML = n;
    number = `${number}${n}`;
    elNumber.classList.remove("blink");

    elNumber.nextElementSibling !== null
      ? elNumber.nextElementSibling.classList.add("blink")
      : updateInterface();
  }
}

function white() {
  number = "";
  whiteVote = true;
  yourVoteFor.style.display = "block";
  warning.style.display = "block";
  numbers.innerHTML = "";
  description.innerHTML = `<div class="big-warning blink">VOTO EM BRANCO</div>`;
  side.innerHTML = "";
}

function corrects() {
  startStage();
}

function confirm() {
  let stage = stages[currentStage];

  let confirmedVote = false;

  if (whiteVote === true) {
    confirmedVote = true;
    votes.push({
      stage: stages[currentStage].title,
      vote: 'Branco'
    })
  } else if (number.length === stage.numbers) {
    confirmedVote = true;
    votes.push({
      stage: stages[currentStage].title,
      vote: number
    })
  }

  if (confirmedVote) {
  }
  currentStage++;
  if (stages[currentStage] !== undefined) {
    startStage();
  } else {
    document.querySelector(".screen").innerHTML =
      '<div class="giant-warning blink">FIM</div>';
  }
}

startStage();
