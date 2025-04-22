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

const img = document.getElementById("soundImage");
const sound = document.getElementById("sound");

img.addEventListener("click", () => {
    if (sound.paused) {
        sound.play();
        img.src = "media/sound.png";
    } else {
        sound.pause();
        sound.currentTime = 0;
        img.src = "media/noSound.png";
    }
});

sound.addEventListener("ended", () => {
    img.src = "media/noSound.png";
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

const sushiPrices = [100, 500, 2000, 10000, 50000, 100000];
const sushiMultipliers = [1, 2, 5, 10, 50, 100];
const sushiBought = [true, false, false, false, false, false];

function clickSushi() {
    let sushiGain = sushiPerClick;

    if (Math.random() < critChance) sushiGain *= critMultiplier;
    if (feverActive) sushiGain *= 2;

    sushiCount += sushiGain;
    updateUI();
}

//format function von ChatGPT
function formatSushiCount(count) {
    if (count >= 1e12) return (count / 1e12).toFixed(2) + "T";
    if (count >= 1e9) return (count / 1e9).toFixed(2) + "B";
    if (count >= 1e6) return (count / 1e6).toFixed(2) + "M";
    if (count >= 1e3) return (count / 1e3).toFixed(2) + "K";
    return count.toFixed(2);
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
    } else alert("Nicht genug Sushi!");
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
    } else alert("Nicht genug Sushi!");
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
    } else alert("Nicht genug Sushi!");
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
    } else alert("Nicht genug Sushi!");
}

function startFeverLoop() {
    triggerFever();
    cooldownTimer = setInterval(triggerFever, feverCooldown * 1000);
}

function triggerFever() {
    if (feverActive) return;
    feverActive = true;
    document.body.classList.add("fever-mode");
    setTimeout(() => {
        feverActive = false;
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
    } else alert("Nicht genug Sushi!");
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
    } else alert("Nicht genug Sushi!");
}

function useSushi(index) {
    currentSushiIndex = index;
    sushiPerClick = sushiMultipliers[index];
    document.querySelectorAll(".sushi .upgrade-button").forEach((button, i) => {
        if (sushiBought[i]) {
            button.textContent = i === index ? "Equipped" : "Use " + sushi[i].name;
        }
    });
    document.getElementById("sushiCountImg").src = `media/sushi${index + 1}.png`;
}

const sushi = [
    { id: "sushi1", imgSrc: "media/sushi1.png", name: "sushi A" },
    { id: "sushi2", imgSrc: "media/sushi2.png", name: "sushi B" },
    { id: "sushi3", imgSrc: "media/sushi3.png", name: "sushi C" },
    { id: "sushi4", imgSrc: "media/sushi4.png", name: "sushi D" },
    { id: "sushi5", imgSrc: "media/sushi5.png", name: "sushi E" },
    { id: "sushi6", imgSrc: "media/sushi6.png", name: "sushi F" }
];

document.addEventListener("DOMContentLoaded", () => {
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

    useSushi(0);
    updateUI();
});

document.addEventListener("DOMContentLoaded", () => {
    const chefs = [
        { id: "chef1", imgSrc: "media/chef1.png", name: "girl", price: chefGirlPrice, upgrade: upgradeChefGirl },
        { id: "chef2", imgSrc: "media/chef2.png", name: "panda", price: chefPandaPrice, upgrade: upgradeChefPanda },
        { id: "chef3", imgSrc: "media/chef3.png", name: "cat", price: chefCatPrice, upgrade: upgradeChefCat },
        { id: "chef4", imgSrc: "media/chef4.png", name: "chef", price: chefCookPrice, upgrade: upgradeChefCook },
        { id: "chef5", imgSrc: "media/chef5.png", name: "samurai", price: chefSamuraiPrice, upgrade: upgradeChefSamurai }
    ];

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
});

setInterval(() => {
    sushiCount += sushiPerSecond;
    updateUI();
}, 1000);
