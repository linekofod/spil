window.addEventListener("load", showStart);

// Deklarer variablerne point og tid
let point;
let liv;

// Deklarer konstanterne for alle elementer
const banan = document.querySelector("#banan_container");
const banan1 = document.querySelector("#banan_container1");
const kokos = document.querySelector("#kokos_container");
const umoden_banan = document.querySelector("#umoden_banan_container");
const umoden_banan1 = document.querySelector("#umoden_banan_container1");
const klase_bananer = document.querySelector("#klase_bananer_container");

// Deklarer konstanterne for alle lyde
const bg_snd = document.querySelector("#bg")
const banan_snd = document.querySelector("#banan")
const umoden_banan_snd = document.querySelector("#umoden_banan")
const kokos_snd = document.querySelector("#kokos")

const mute_btn = document.querySelector("#mute_btn");
const unmute_btn = document.querySelector("#unmute_btn");

// Mute button 
mute_btn.addEventListener("click", muteSound);
mute_btn.classList.remove("hide");
unmute_btn.classList.add("hide");

bg_snd.volume = 0.2;
banan_snd.volume = 0.5;
umoden_banan_snd.volume = 0.5;
kokos_snd.volume = 0.5;

function showStart(){
  console.log("showStart");

  // Skjul andre skærme, og vis startskærmen
  hideAllScreens();
  document.querySelector("#start").classList.remove("hide");

  // Gå til startGame, når der klikkes på start knap
  document.querySelector("#start_knap").addEventListener("click", startGame);

  // Skjul regler, og ved klik på spørgsmålstegn, gå til funktionen tilRegler
  document.querySelector("#regler1").classList.add("hide");
  document.querySelector("#regler_knap1").addEventListener("click", tilRegler);
}

function startGame() {
  console.log("startGame");

  // Skjul andre skærme
  hideAllScreens();

  // Start baggrundslyd
  bg_snd.play();
  bg_snd.addEventListener("ended", playBgSnd);

  // Nulstil liv og point (sæt til startværdien)
  point = 0;
  liv = 3;

  // Opdater point på siden, og fjern fyld i banana shake
  document.querySelector("#point_tal").textContent = point;
  removeBananaShake();

  // Nulstil liv, så de bliver vist på skærmen igen (fjern classen hide)
  document.querySelector("#liv1").classList.remove("hide");
  document.querySelector("#liv2").classList.remove("hide");
  document.querySelector("#liv3").classList.remove("hide");

  // Vis elementerne i baggrunden 
  banan.classList.remove("hide");
  banan1.classList.remove("hide");
  kokos.classList.remove("hide");
  umoden_banan.classList.remove("hide");
  umoden_banan1.classList.remove("hide");
  klase_bananer.classList.remove("hide");
  
  // Fjern baggrundsfarve fra gameOver og levelComplete
  document.querySelector("#baggrund").classList.remove("baggrund_farve1");
  document.querySelector("#baggrund").classList.remove("baggrund_farve2");
  
  // Start timer-animation
  document.querySelector("#baggrund").classList.add("baggrundChange");    
  document.querySelector("#tid_sol").classList.add("solnedgang"); 
  // Gå til endGame, når solen er gået ned
  document.querySelector("#baggrund").addEventListener("animationend", endGame);     
  document.querySelector("#tid_sol").addEventListener("animationend", endGame);     
  
  // Start falde-animation på banan, giv random position og speed
  banan.classList.add("fall");
  let rnd = generateRandomNumber(10);
  banan.classList.add("pos" + rnd);
  rnd = generateRandomNumber(4);
  banan.classList.add("speed" + rnd);

  banan1.classList.add("fall");
  rnd = generateRandomNumber(10);
  banan1.classList.add("pos" + rnd);
  rnd = generateRandomNumber(4);
  banan1.classList.add("speed" + rnd);

  // Start falde-animation på kokos, giv random position og speed
  kokos.classList.add("fall");
  rnd = generateRandomNumber(10);
  kokos.classList.add("pos" + rnd);
  rnd = generateRandomNumber(4);
  kokos.classList.add("speed" + rnd);

   // Start falde-animation på umoden banan, giv random position og speed
   umoden_banan.classList.add("fall");
   rnd = generateRandomNumber(10);
   umoden_banan.classList.add("pos" + rnd);
   rnd = generateRandomNumber(4);
   umoden_banan.classList.add("speed" + rnd);
   
   umoden_banan1.classList.add("fall");
   rnd = generateRandomNumber(10);
   umoden_banan1.classList.add("pos" + rnd);
   rnd = generateRandomNumber(4);
   umoden_banan1.classList.add("speed" + rnd);

   // Start falde-animation på klase bananer, giv random position, speed og delay
   klase_bananer.classList.add("fall");
   rnd = generateRandomNumber(10);
   klase_bananer.classList.add("pos" + rnd);
   rnd = generateRandomNumber(4);
   klase_bananer.classList.add("speed" + rnd);
   rnd = generateRandomNumber(3);
   klase_bananer.classList.add("delay" + rnd);

  // Lyt efter klik på banan, gå til funktionen clickBanan hvis der klikkes
  banan.addEventListener("mousedown", clickBanan);
  banan1.addEventListener("mousedown", clickBanan);
  // Lyt efter klik på kokos, gå til funktionen clickKokos hvis der klikkes
  kokos.addEventListener("mousedown", clickKokos);
  // Lyt efter klik på umoden banan, gå til funktionen clickUmodenBanan hvis der klikkes
  umoden_banan.addEventListener("mousedown", clickUmodenBanan);
  umoden_banan1.addEventListener("mousedown", clickUmodenBanan);
  // Lyt efter klik på klase bananer, gå til funktionen clickKlaseBananer hvis der klikkes
  klase_bananer.addEventListener("mousedown", clickKlaseBananer);

  // Når banan har faldet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  banan.addEventListener("animationiteration", resetBanan);
  banan1.addEventListener("animationiteration", resetBanan);
  // Når kokos har faldet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  kokos.addEventListener("animationiteration", resetKokos);
  // Når umoden banan har faldet 1 gang, skal den dukke op et nyt sted (gå til reset funktionen)
  umoden_banan.addEventListener("animationiteration", resetUmodenBanan);
  umoden_banan1.addEventListener("animationiteration", resetUmodenBanan);
  // Når klase bananer har faldet 1 gang, skal de dukke op et nyt sted (gå til reset funktionen)
  klase_bananer.addEventListener("animationiteration", resetKlaseBananer);
}

// ----- Klik funktioner ----- //

function clickBanan() {
  console.log("clickBanan");

  // Stop med at lytte efter klik (fjerner eventlistener - man kan kun klikke på banan 1 gang pr. fald)
  this.removeEventListener("mousedown", clickBanan);

  // Afspil lyden "yay"
  banan_snd.play();
  banan_snd.currentTime = 0;

  // Tæl op på point (kan også skrives: point++;)
  point = point + 1;

  // Skriv point ud (vis nyt pointtal på siden)
  document.querySelector("#point_tal").textContent = point;

  // Fyld banana shake op, i takt med at man får point
  fillBananaShake();

  // Stop falde-animation på container (sæt på pause ved at tilføje klassen freeze)
  this.classList.add("freeze");

  // Start forsvind-animation på sprite (tilføj klassen zoom_out)
  this.firstElementChild.classList.add("zoom_out");

  // Gå til reset funktionen når forsvind-animationen er færdig
  this.addEventListener("animationend", resetBanan);
}

function clickKokos() {
  console.log("clickKokos");

  // Stop med at lytte efter klik (fjerner eventlistener - man kan kun klikke på kokos 1 gang pr. fald)
  kokos.removeEventListener("mousedown", clickKokos);

  // Afspil lyden "øv"
  kokos_snd.play();
  kokos_snd.currentTime = 0;

  // Opdater liv på siden
  // - Ved klik på kokosnød, bliver der fjernet et liv (klassen hide). 
  // - Dette gentages indtil der ikke er flere liv tilbage. 
  // - Hvis der ikke er flere liv tilbage, gå til endGame, som derfra går til gameOver
  if (liv > 1) {
    document.querySelector("#liv" + liv).classList.add("hide");
    liv = liv - 1;
    console.log(liv);
  } else {
    document.querySelector("#liv" + liv).classList.add("hide");
    endGame();
  }

  // Stop falde-animation på container (sæt på pause ved at tilføje klassen freeze)
  kokos.classList.add("freeze");

  // Start forsvind-animation på sprite (tilføj klassen rotate_out)
  this.firstElementChild.classList.add("rotate_out");

  // Gå til reset funktionen når forsvind-animationen er færdig
  kokos.addEventListener("animationend", resetKokos);
}

function clickUmodenBanan() {
  console.log("clickUmodenBanan");

  // Stop med at lytte efter klik (fjerner eventlistener - man kan kun klikke på umoden banan 1 gang pr. fald)
  this.removeEventListener("mousedown", clickUmodenBanan);

  // Afspil lyden "ad"
  umoden_banan_snd.play();
  umoden_banan_snd.currentTime = 0;

  // Tæl ned på point
  point = point - 1;

  // Skriv point ud (vis nyt pointtal på siden)
  document.querySelector("#point_tal").textContent = point;

  // Tøm banana shake, i takt med at man mister point
  emptyBananaShake();

  // Stop falde-animation på container (sæt på pause ved at tilføje klassen freeze)
  this.classList.add("freeze");

  // Start forsvind-animation på sprite (tilføj klassen zoom_out)
  this.firstElementChild.classList.add("zoom_out");

  // Gå til reset funktionen når forsvind-animationen er færdig
  this.addEventListener("animationend", resetUmodenBanan);
}

function clickKlaseBananer() {
  console.log("clickKlaseBananer");

  // Stop med at lytte efter klik (fjerner eventlistener - man kan kun klikke på klase bananer 1 gang pr. fald)
  klase_bananer.removeEventListener("mousedown", clickKlaseBananer);

  // Afspil lyden "yay"
  banan_snd.play();
  banan_snd.currentTime = 0;

  // Tæl op på point
  point = point + 2;

  // Skriv point ud (vis nyt pointtal på siden)
  document.querySelector("#point_tal").textContent = point;

  // Fyld banana shake op, i takt med at man får point
  fillBananaShake();

  // Stop falde-animation på container (sæt på pause ved at tilføje klassen freeze)
  klase_bananer.classList.add("freeze");

  // Start forsvind-animation på sprite (tilføj klassen zoom_out)
  this.firstElementChild.classList.add("zoom_out");

  // Gå til reset funktionen når forsvind-animationen er færdig
  klase_bananer.addEventListener("animationend", resetKlaseBananer);
}

// ----- Reset funktioner ----- //

function resetBanan() {
  console.log("resetBanan");

  //Fjern alle klasser fra banan container (fall, freeze og pos)
  this.classList = "";

  //Fjern alle klasser fra banan sprite (zoom_out)
  this.firstElementChild.classList = "";
  this.offsetHeight;

  // Genstart falde-animation (falde-animation sættes på igen)
  this.classList.add("fall");

  // Ny random position og speed
  let rnd = generateRandomNumber(10);
  this.classList.add("pos" + rnd);
  rnd = generateRandomNumber(4);
  this.classList.add("speed" + rnd);

  // Lyt efter klik på banan, gå til funktionen clickBanan, hvis der klikkes
  this.addEventListener("mousedown", clickBanan);
}

function resetKokos() {
  console.log("resetKokos");

  //Fjern alle klasser fra kokos container (fall, freeze og pos)
  kokos.classList = "";

  //Fjern alle klasser fra kokos sprite (rotate_out)
  this.firstElementChild.classList = "";
  kokos.offsetHeight;
  
  // Genstart falde-animation (falde-animation sættes på igen)
  kokos.classList.add("fall");

  // Ny random position og speed
  let rnd = generateRandomNumber(10);
  kokos.classList.add("pos" + rnd);
  rnd = generateRandomNumber(4);
  kokos.classList.add("speed" + rnd);

  // Lyt efter klik på kokos, gå til funktionen clickKokos, hvis der klikkes
  kokos.addEventListener("mousedown", clickKokos);
}

function resetUmodenBanan() {
  console.log("resetUmodenBanan");

  //Fjern alle klasser fra umoden banan container (fall, freeze og pos)
  this.classList = "";

  //Fjern alle klasser fra umoden banan sprite (zoom_out)
  this.firstElementChild.classList = "";
  this.offsetHeight;

  // Genstart falde-animation (falde-animation sættes på igen)
  this.classList.add("fall");

  // Ny random position og speed
  let rnd = generateRandomNumber(10);
  this.classList.add("pos" + rnd);
  rnd = generateRandomNumber(4);
  this.classList.add("speed" + rnd);

  // Lyt efter klik på umoden banan, gå til funktionen clickUmodenBanan, hvis der klikkes
  this.addEventListener("mousedown", clickUmodenBanan);
}

function resetKlaseBananer() {
  console.log("resetKlaseBananer");

  //Fjern alle klasser fra klase bananer container (fall, freeze og pos)
  klase_bananer.classList = "";

  //Fjern alle klasser fra klase bananer sprite (zoom_out)
  this.firstElementChild.classList = "";
  klase_bananer.offsetHeight;

  // Genstart falde-animation (falde-animation sættes på igen)
  document.querySelector("#klase_bananer_container").classList.add("fall");

  // Ny random position, speed og delay
  let rnd = generateRandomNumber(10);
  klase_bananer.classList.add("pos" + rnd);
  rnd = generateRandomNumber(4);
  klase_bananer.classList.add("speed" + rnd);
  rnd = generateRandomNumber(3);
  klase_bananer.classList.add("delay" + rnd);

  // Lyt efter klik på klase bananer, gå til funktionen clickKlaseBananer, hvis der klikkes
  klase_bananer.addEventListener("mousedown", clickKlaseBananer);
}

// ----- Slutskærme funktioner ----- //

function endGame(){
  console.log("endGame");

  // Gå til de forskellige skærme, afhængigt af om man taber, vinder eller tiden går ud
  if (liv <= 0){
    gameOver();
  } else if(point >= 10){
    levelComplete();
  } else{
    gameOver();
  }

  // Stop timere og fjern eventListener'ere på timere
  document.querySelector("#baggrund").classList.remove("baggrundChange");
  document.querySelector("#baggrund").removeEventListener("animationend", endGame);    
  document.querySelector("#tid_sol").classList.remove("solnedgang"); 
  document.querySelector("#tid_sol").removeEventListener("animationend", endGame);
  
  // Gem elementerne i baggrunden 
  banan.classList.add("hide");
  banan1.classList.add("hide");
  kokos.classList.add("hide");
  umoden_banan.classList.add("hide");
  umoden_banan1.classList.add("hide");
  klase_bananer.classList.add("hide");
}

function gameOver(){
  console.log("gameOver");

  // Skjul andre skærme
  hideAllScreens();

  // Vis game over skærm og mørk baggrund
  document.querySelector("#game_over").classList.remove("hide");
  document.querySelector("#baggrund").classList.add("baggrund_farve2");

  // Gå til startGame, når der klikkes på prøv igen knap
  document.querySelector("#prøv_igen").addEventListener("click", startGame);

  // Gå til startskærm, ved klik på hus
  document.querySelector("#startskærm_knap1").addEventListener("click", showStart);

  // Skjul regler, og ved klik på spørgsmålstegn, gå til funktionen tilRegler
  document.querySelector("#regler2").classList.add("hide");
  document.querySelector("#regler_knap2").addEventListener("click", tilRegler);
}

function levelComplete(){
  console.log("levelComplete");

  // Skjul andre skærme
  hideAllScreens();

  // Vis level complete skærm og lys baggrund
  document.querySelector("#level_complete").classList.remove("hide");
  document.querySelector("#baggrund").classList.add("baggrund_farve1");

  // Gå til startGame, når der klikkes på spil igen knap
  document.querySelector("#spil_igen").addEventListener("click", startGame);

  // Gå til startskærm, ved klik på hus
  document.querySelector("#startskærm_knap2").addEventListener("click", showStart);
}

// ----- Hjælpefunktioner og andet ----- //

function generateRandomNumber(num) {
  let rndNumber = Math.random();
  rndNumber = rndNumber * num;
  rndNumber = Math.floor(rndNumber);
  rndNumber = rndNumber + 1;

  return rndNumber;
}

function hideAllScreens(){

  // Skjul startskærm, game over skærm og level complete skærm
  document.querySelector("#start").classList.add("hide");
  document.querySelector("#game_over").classList.add("hide");
  document.querySelector("#level_complete").classList.add("hide");
}

function tilRegler(){

  // Vis regler
  document.querySelector("#regler1").classList.remove("hide");
  document.querySelector("#regler1").classList.add("regler1");
  document.querySelector("#regler2").classList.remove("hide");
  document.querySelector("#regler2").classList.add("regler2");

  // Fjern eventListener der lytter til klik på spørgsmålstegn
  document.querySelector("#regler_knap1").removeEventListener("click", tilRegler);
  document.querySelector("#regler_knap2").removeEventListener("click", tilRegler);

  // Ved klik på spørgsmålstegn, gå til showStart, og dermed fjerne regler igen
  document.querySelector("#regler_knap1").addEventListener("click", showStart);
  document.querySelector("#regler_knap2").addEventListener("click", gameOver);
}

function fillBananaShake(){

  if (point === 1) {
    document.querySelector("#point_glas_container").classList.add("point_glas1");
  } 
  if (point === 2) {
    document.querySelector("#point_glas_container").classList.add("point_glas2");
  } 
  if (point === 3) {
    document.querySelector("#point_glas_container").classList.add("point_glas3");
  } 
  if (point === 4) {
    document.querySelector("#point_glas_container").classList.add("point_glas4");
  } 
  if (point === 5) {
    document.querySelector("#point_glas_container").classList.add("point_glas5");
  } 
  if (point === 6) {
    document.querySelector("#point_glas_container").classList.add("point_glas6");
  } 
  if (point === 7) {
    document.querySelector("#point_glas_container").classList.add("point_glas7");
  } 
  if (point === 8) {
    document.querySelector("#point_glas_container").classList.add("point_glas8");
  } 
  if (point === 9) {
    document.querySelector("#point_glas_container").classList.add("point_glas9");
  } 
  if (point === 10) {
    document.querySelector("#point_glas_container").classList.add("point_glas10");
  } 
}

function emptyBananaShake(){

  if (point === 0) {
    document.querySelector("#point_glas_container").classList.remove("point_glas1");
  } 
  if (point === 1) {
    document.querySelector("#point_glas_container").classList.remove("point_glas2");
  } 
  if (point === 2) {
    document.querySelector("#point_glas_container").classList.remove("point_glas3");
  } 
  if (point === 3) {
    document.querySelector("#point_glas_container").classList.remove("point_glas4");
  } 
  if (point === 4) {
    document.querySelector("#point_glas_container").classList.remove("point_glas5");
  } 
  if (point === 5) {
    document.querySelector("#point_glas_container").classList.remove("point_glas6");
  } 
  if (point === 6) {
    document.querySelector("#point_glas_container").classList.remove("point_glas7");
  } 
  if (point === 7) {
    document.querySelector("#point_glas_container").classList.remove("point_glas8");
  } 
  if (point === 8) {
    document.querySelector("#point_glas_container").classList.remove("point_glas9");
  } 
  if (point === 9) {
    document.querySelector("#point_glas_container").classList.remove("point_glas10");
  } 
}

function removeBananaShake() {
  document.querySelector("#point_glas_container").classList.remove("point_glas1");
  document.querySelector("#point_glas_container").classList.remove("point_glas2");
  document.querySelector("#point_glas_container").classList.remove("point_glas3");
  document.querySelector("#point_glas_container").classList.remove("point_glas4");
  document.querySelector("#point_glas_container").classList.remove("point_glas5");
  document.querySelector("#point_glas_container").classList.remove("point_glas6");
  document.querySelector("#point_glas_container").classList.remove("point_glas7");
  document.querySelector("#point_glas_container").classList.remove("point_glas8");
  document.querySelector("#point_glas_container").classList.remove("point_glas9");
  document.querySelector("#point_glas_container").classList.remove("point_glas10");
}

function playBgSnd() {
  bg_snd.play();
}
function muteSound() {
  unmute_btn.classList.remove("hide");
  mute_btn.classList.add("hide");
  unmute_btn.addEventListener("click", unmuteSound);
  bg_snd.volume = 0;
  banan_snd.volume = 0;
  umoden_banan_snd.volume = 0;
  kokos_snd.volume = 0;
}
function unmuteSound() {
  unmute_btn.classList.add("hide");
  mute_btn.classList.remove("hide");
  mute_btn.addEventListener("click", muteSound);
  bg_snd.volume = 0.2;
  banan_snd.volume = 0.5;
  umoden_banan_snd.volume = 0.5;
  kokos_snd.volume = 0.5;
}

