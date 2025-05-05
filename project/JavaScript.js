document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        const container1 = document.getElementById("firstScreen");
        const container2 = document.getElementById("startScreen");

        container1.classList.add("slide-up-first");
        container2.classList.add("slide-up-second");

        setTimeout(() => {
            container1.style.display = "none";
        }, 1000);
    }
});

document.getElementById("infoBox").style.display = "none";

function showInfoBox() {
    const infoBox = document.getElementById("infoBox");
    infoBox.style.display = "inline-block";
    infoBox.classList.remove("info-hide");
    infoBox.classList.add("info-show");

    ["row", "backgroundVid", "playButton"].forEach(id => {
        document.getElementById(id).style.filter = "blur(5px)";
    });
}

function hideInfoBox() {
    const infoBox = document.getElementById("infoBox");
    infoBox.classList.remove("info-show");
    infoBox.classList.add("info-hide");

    setTimeout(() => {
        infoBox.style.display = "none";
    }, 300);

    ["row", "backgroundVid", "playButton"].forEach(id => {
        document.getElementById(id).style.filter = "blur(0px)";
    });
}

function showGame() {
    const gameScreen = document.getElementById("gameScreen");
    const startScreen = document.getElementById("startScreen");

    gameScreen.style.display = "block";
    gameScreen.style.transform = "translateY(100%)";

    setTimeout(() => {
        gameScreen.style.transform = "translateY(0%)";
    }, 10);

    setTimeout(() => {
        startScreen.style.display = "none";
    }, 1000);
}

function backToStartscreen() {
    const gameScreen = document.getElementById("gameScreen");
    const startScreen = document.getElementById("startScreen");

    startScreen.style.display = "block";

    setTimeout(() => {
        gameScreen.style.transform = "translateY(100%)";
    }, 10);

    setTimeout(() => {
        gameScreen.style.display = "none";
    }, 1000);
}

let sushiCount = 0;
let sushiPerClick = 1;
let sushiPerSecond = 0;
let critChance = 0.0;
let critMultiplier = 3;
let feverActive = false;
let feverDuration = 5;
let feverCooldown = 30;
let feverTimer;
let cooldownTimer;
let zenModeActive = false;
let lastClickTime = Date.now();
let originalSushiPerSecond = 0;
let upgradeIndexZen = 1;
let currentSushiIndex = 0;
let originalSushiPerClick = 1;

const sushiPrices = [1000, 250000, 25000000, 1000000000, 2500000000, 1000000000000];
const sushiMultipliers = [1, 2, 10, 100, 500, 1000];
const sushiBought = [true, false, false, false, false, false];

function clickSushi() {
    let sushiGain = sushiPerClick;

    if (Math.random() < critChance) sushiGain *= critMultiplier;
    if (feverActive) sushiGain *= 2;

    sushiCount += sushiGain;
    updateUI();
    saveGame();
}

//format function von ChatGPT
function formatSushiCount(count) {
    const suffixes = [
        "", "K", "M", "B", "T", "Q", 
        "aa", "ab", "ac", "ad", "ae", "af", "ag", "ah", "ai", "aj",
        "ak", "al", "am", "an", "ao", "ap", "aq", "ar", "as", "at",
        "au", "av", "aw", "ax", "ay", "az",
        "ba", "bb", "bc", "bd", "be"
    ];

    if (count < 1000) return count.toFixed(2);

    let tier = Math.floor(Math.log10(count) / 3);
    if (tier >= suffixes.length) tier = suffixes.length - 1;

    const scaled = count / Math.pow(10, tier * 3);
    return scaled.toFixed(2) + suffixes[tier];
}


function updateUI() {
    const sushiOutput = document.getElementById("sushiOutput");

    sushiOutput.innerHTML = `
        <img src="media/sushi${currentSushiIndex + 1}.png" alt="sushi" id="sushiCountImg" onclick="clickSushi()">
        <p id="headerText">${formatSushiCount(sushiCount)}</p>`;

    document.getElementById('sushi').src = `media/sushi${currentSushiIndex + 1}.png`;

    document.getElementById("sushiPerSecond").innerHTML = `
        <p>sushi/second: ${formatSushiCount(sushiPerSecond)}</p>`;

    const chefs = [
        { id: "chef1", price: chefGirlPrice, name: "Girl" },
        { id: "chef2", price: chefPandaPrice, name: "Panda" },
        { id: "chef3", price: chefCatPrice, name: "Cat" },
        { id: "chef4", price: chefCookPrice, name: "Fire Chef" },
        { id: "chef5", price: chefSamuraiPrice, name: "Samurai" }
    ];

    chefs.forEach((chef, i) => {
        const btn = document.getElementById(`${chef.id}-button`);
        if (btn) btn.textContent = `Upgrade ${chef.name} for ${formatSushiCount(chef.price)} Sushi`;
    });
}

let chefGirlLevel = 0;
let chefGirlPrice = 10;
function upgradeChefGirl() {
    if (sushiCount >= chefGirlPrice) {
        sushiCount -= chefGirlPrice;
        chefGirlLevel++;
        chefGirlPrice *= 1.5;
        sushiPerClick *= 1.2;
        updateUI();
        saveGame();
    } else showNotification("not enough sushi!");
}

let chefPandaLevel = 0;
let chefPandaPrice = 50;
function upgradeChefPanda() {
    if (sushiCount >= chefPandaPrice) {
        sushiCount -= chefPandaPrice;
        chefPandaLevel++;
        critChance += 0.05;
        chefPandaPrice *= 1.5;
        updateUI();
        saveGame();
    } else showNotification("not enough sushi!");
}

let chefCatLevel = 0;
let chefCatPrice = 100;
let sushiPerSecondGain = 1;
function upgradeChefCat() {
    if (sushiCount >= chefCatPrice) {
        sushiCount -= chefCatPrice;
        chefCatLevel++;
        sushiPerSecond += sushiPerSecondGain;
        sushiPerSecondGain *= 1.4;
        chefCatPrice *= 1.5;
        updateUI();
        saveGame();
    } else showNotification("not enough sushi!");
}

//Hilfe von ChatGPT bei diesem Chef
let chefCookLevel = 0;
let chefCookPrice = 500;
function upgradeChefCook() {
    if (sushiCount >= chefCookPrice) {
        sushiCount -= chefCookPrice;
        chefCookLevel++;
        chefCookPrice *= 1.5;
        feverDuration += 1;
        if (chefCookLevel === 1) startFeverLoop();
        updateUI();
        saveGame();
    } else showNotification("not enough sushi!");
}

function startFeverLoop() {
    triggerFever();
    cooldownTimer = setInterval(triggerFever, feverCooldown * 1000);
}

function triggerFever() {
    if (feverActive) return;

    feverActive = true;
    originalSushiPerClick = sushiPerClick;
    originalSushiPerSecond = sushiPerSecond;

    sushiPerSecond *= 2;

    document.body.classList.add("fever-mode");

    setTimeout(() => {
        feverActive = false;
        sushiPerClick = originalSushiPerClick;
        sushiPerSecond = originalSushiPerSecond;
        document.body.classList.remove("fever-mode");
    }, feverDuration * 1000);
}

//Hilfe von ChatGPT bei diesem Chef
let chefSamuraiLevel = 0;
let chefSamuraiPrice = 1000;
function upgradeChefSamurai() {
    if (sushiCount >= chefSamuraiPrice) {
        sushiCount -= chefSamuraiPrice;
        chefSamuraiLevel++;
        chefSamuraiPrice *= 1.5;
        upgradeIndexZen *= 2;
        if (chefSamuraiLevel === 1) startZenCheck();
        updateUI();
        saveGame();
    } else showNotification("not enough sushi!");
}

function startZenCheck() {
    document.addEventListener("click", () => {
        lastClickTime = Date.now();
        if (zenModeActive) deactivateZenMode();
    });

    setInterval(() => {
        if (chefSamuraiLevel >= 1 && !zenModeActive && Date.now() - lastClickTime >= 10000) {
            activateZenMode();
        }
    }, 1000);
}

function activateZenMode() {
    zenModeActive = true;
    originalSushiPerSecond = sushiPerSecond;
    sushiPerSecond *= upgradeIndexZen;
    document.getElementById("headerText").classList.add("zen-glow");
}

function deactivateZenMode() {
    zenModeActive = false;
    sushiPerSecond = originalSushiPerSecond;
    document.getElementById("headerText").classList.remove("zen-glow");
}

function buySushi(index) {
    if (sushiBought[index]) {
        useSushi(index);
        return;
    }

    if (sushiCount >= sushiPrices[index]) {
        sushiCount -= sushiPrices[index];
        sushiBought[index] = true;
        document.querySelectorAll(".sushi .upgrade-button")[index].textContent = "Use " + sushi[index].name;
        updateUI();
        saveGame();
    } else showNotification("not enough sushi!");
}

function useSushi(index) {
    currentSushiIndex = index;
    sushiPerClick = sushiMultipliers[index];
    document.querySelectorAll(".sushi .upgrade-button").forEach((button, i) => {
        if (sushiBought[i]) {
            button.textContent = i === index ? "Equipped" : "Use " + sushi[i].name;
        }
    });
    document.getElementById("sushiCountImg").src = `./media/sushi${index + 1}.png`;
    saveGame();
}

const sushi = [
    { id: "sushi1", imgSrc: "./media/sushi1.png", name: "sushi A" },
    { id: "sushi2", imgSrc: "./media/sushi2.png", name: "sushi B" },
    { id: "sushi3", imgSrc: "./media/sushi3.png", name: "sushi C" },
    { id: "sushi4", imgSrc: "./media/sushi4.png", name: "sushi D" },
    { id: "sushi5", imgSrc: "./media/sushi5.png", name: "sushi E" },
    { id: "sushi6", imgSrc: "./media/sushi6.png", name: "sushi F" }
];

const chefs = [
    { id: "chef1", imgSrc: "./media/chef1.png", name: "girl", price: chefGirlPrice, upgrade: upgradeChefGirl },
    { id: "chef2", imgSrc: "./media/chef2.png", name: "panda", price: chefPandaPrice, upgrade: upgradeChefPanda },
    { id: "chef3", imgSrc: "./media/chef3.png", name: "cat", price: chefCatPrice, upgrade: upgradeChefCat },
    { id: "chef4", imgSrc: "./media/chef4.png", name: "chef", price: chefCookPrice, upgrade: upgradeChefCook },
    { id: "chef5", imgSrc: "./media/chef5.png", name: "samurai", price: chefSamuraiPrice, upgrade: upgradeChefSamurai }
];

document.addEventListener("DOMContentLoaded", () => {
    const img = document.getElementById("soundImage");
    const sound = document.getElementById("sound");

    img.addEventListener("click", () => {
        if (sound.paused) {
            sound.play();
            img.src = "./media/sound.png";
        } else {
            sound.pause();
            sound.currentTime = 0;
            img.src = "./media/noSound.png";
        }
    });

    sound.addEventListener("ended", () => {
        img.src = "./media/noSound.png";
    });

    const sushiUpgradeScreen = document.getElementById("sushiUpgradeScreen");
    sushiUpgradeScreen.innerHTML = "";

    sushi.forEach((item, index) => {
        const sushiDiv = document.createElement("div");
        sushiDiv.classList.add("sushi");

        const img = document.createElement("img");
        img.src = item.imgSrc;
        img.alt = item.name;

        const button = document.createElement("button");
        button.textContent = sushiBought[index]
            ? "Use " + item.name
            : `Buy ${item.name} (${formatSushiCount(sushiPrices[index])} Sushi)`;

        button.classList.add("upgrade-button");
        button.addEventListener("click", () => buySushi(index));

        sushiDiv.appendChild(img);
        sushiDiv.appendChild(button);
        sushiUpgradeScreen.appendChild(sushiDiv);
    });

    const chefUpgradeScreen = document.getElementById("chefUpgradeScreen");
    chefUpgradeScreen.innerHTML = "";

    chefs.forEach(chef => {
        const chefDiv = document.createElement("div");
        chefDiv.classList.add("chef");

        const img = document.createElement("img");
        img.src = chef.imgSrc;
        img.alt = chef.name;

        const button = document.createElement("button");
        button.id = chef.id + "-button";
        button.textContent = `Upgrade ${chef.name} for ${formatSushiCount(chef.price)} Sushi`;
        button.classList.add("upgrade-button");
        button.addEventListener("click", chef.upgrade);

        chefDiv.appendChild(img);
        chefDiv.appendChild(button);
        chefUpgradeScreen.appendChild(chefDiv);
    });

    loadGame();
    updateUI();
});

setInterval(() => {
    sushiCount += sushiPerSecond;
    updateUI();
}, 1000);

//Library
var granimInstance = new Granim({
    element: '#canvas-basic',
    direction: 'radial',
    isPausedWhenNotInView: false,
    states : {
        "default-state": {
            gradients: [
                ['#eec3c4', '#9d1926'],
                ['#9d1926', '#eec3c4'],
            ]
        }
    }
});
//Library

//Localstorage
function saveGame() {
    localStorage.setItem('sushiCount', JSON.stringify(sushiCount));
    localStorage.setItem('sushiPerClick', JSON.stringify(sushiPerClick));
    localStorage.setItem('sushiPerSecond', JSON.stringify(sushiPerSecond));
    localStorage.setItem('critChance', JSON.stringify(critChance));
    localStorage.setItem('critMultiplier', JSON.stringify(critMultiplier));
    localStorage.setItem('feverDuration', JSON.stringify(feverDuration));
    localStorage.setItem('feverCooldown', JSON.stringify(feverCooldown));
    localStorage.setItem('zenModeActive', JSON.stringify(zenModeActive));
    localStorage.setItem('upgradeIndexZen', JSON.stringify(upgradeIndexZen));
    localStorage.setItem('currentSushiIndex', JSON.stringify(currentSushiIndex));

    localStorage.setItem('chefGirlLevel', JSON.stringify(chefGirlLevel));
    localStorage.setItem('chefPandaLevel', JSON.stringify(chefPandaLevel));
    localStorage.setItem('chefCatLevel', JSON.stringify(chefCatLevel));
    localStorage.setItem('chefCookLevel', JSON.stringify(chefCookLevel));
    localStorage.setItem('chefSamuraiLevel', JSON.stringify(chefSamuraiLevel));

    localStorage.setItem('chefGirlPrice', JSON.stringify(chefGirlPrice));
    localStorage.setItem('chefPandaPrice', JSON.stringify(chefPandaPrice));
    localStorage.setItem('chefCatPrice', JSON.stringify(chefCatPrice));
    localStorage.setItem('chefCookPrice', JSON.stringify(chefCookPrice));
    localStorage.setItem('chefSamuraiPrice', JSON.stringify(chefSamuraiPrice));

    localStorage.setItem('sushiBought', JSON.stringify(sushiBought));
}

function loadGame() {
    if (localStorage.getItem('sushiCount')) sushiCount = parseFloat(localStorage.getItem('sushiCount'));
    if (localStorage.getItem('sushiPerClick')) sushiPerClick = parseFloat(localStorage.getItem('sushiPerClick'));
    if (localStorage.getItem('sushiPerSecond')) sushiPerSecond = parseFloat(localStorage.getItem('sushiPerSecond'));
    if (localStorage.getItem('critChance')) critChance = parseFloat(localStorage.getItem('critChance'));
    if (localStorage.getItem('critMultiplier')) critMultiplier = parseFloat(localStorage.getItem('critMultiplier'));
    if (localStorage.getItem('feverDuration')) feverDuration = parseFloat(localStorage.getItem('feverDuration'));
    if (localStorage.getItem('feverCooldown')) feverCooldown = parseFloat(localStorage.getItem('feverCooldown'));
    if (localStorage.getItem('zenModeActive')) zenModeActive = JSON.parse(localStorage.getItem('zenModeActive'));
    if (localStorage.getItem('upgradeIndexZen')) upgradeIndexZen = parseFloat(localStorage.getItem('upgradeIndexZen'));
    if (localStorage.getItem('currentSushiIndex')) currentSushiIndex = parseInt(localStorage.getItem('currentSushiIndex'));

    if (localStorage.getItem('chefGirlLevel')) chefGirlLevel = parseInt(localStorage.getItem('chefGirlLevel'));
    if (localStorage.getItem('chefPandaLevel')) chefPandaLevel = parseInt(localStorage.getItem('chefPandaLevel'));
    if (localStorage.getItem('chefCatLevel')) chefCatLevel = parseInt(localStorage.getItem('chefCatLevel'));
    if (localStorage.getItem('chefCookLevel')) chefCookLevel = parseInt(localStorage.getItem('chefCookLevel'));
    if (localStorage.getItem('chefSamuraiLevel')) chefSamuraiLevel = parseInt(localStorage.getItem('chefSamuraiLevel'));

    if (localStorage.getItem('chefGirlPrice')) chefGirlPrice = parseFloat(localStorage.getItem('chefGirlPrice'));
    if (localStorage.getItem('chefPandaPrice')) chefPandaPrice = parseFloat(localStorage.getItem('chefPandaPrice'));
    if (localStorage.getItem('chefCatPrice')) chefCatPrice = parseFloat(localStorage.getItem('chefCatPrice'));
    if (localStorage.getItem('chefCookPrice')) chefCookPrice = parseFloat(localStorage.getItem('chefCookPrice'));
    if (localStorage.getItem('chefSamuraiPrice')) chefSamuraiPrice = parseFloat(localStorage.getItem('chefSamuraiPrice'));

    if (localStorage.getItem('sushiBought')) {
        const loaded = JSON.parse(localStorage.getItem('sushiBought'));
        if (Array.isArray(loaded)) {
            loaded.forEach((bought, i) => sushiBought[i] = bought);
        }
    }
    
    if (currentSushiIndex >= 0) {
        document.getElementById("sushiCountImg").src = `./media/sushi${currentSushiIndex + 1}.png`;
        document.querySelectorAll(".sushi .upgrade-button").forEach((button, i) => {
            if (sushiBought[i]) {
                button.textContent = i === currentSushiIndex ? "Equipped" : "Use " + sushi[i].name;
            }
        });
    }
}

loadGame();

if (chefCookLevel >= 1) startFeverLoop();
if (chefSamuraiLevel >= 1) startZenCheck();
//Localstorage