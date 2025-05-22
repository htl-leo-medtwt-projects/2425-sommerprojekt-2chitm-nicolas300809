function createTooltip(content) {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = content;
    document.body.appendChild(tooltip);
    return tooltip;
}

function showTooltip(event, content) {
    const tooltip = createTooltip(content);
    
    const x = event.clientX + 10;
    const y = event.clientY + 10;
    
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
    tooltip.style.opacity = "1";
    
    const element = event.currentTarget;
    element.addEventListener("mouseleave", hideTooltip);
    element.tooltip = tooltip;
}

function hideTooltip(event) {
    const element = event.currentTarget;
    if (element.tooltip) {
        element.tooltip.remove();
        element.tooltip = null;
    }
    element.removeEventListener("mouseleave", hideTooltip);
}

document.getElementById('chefGirlImage').addEventListener('mouseenter', (e) => {
    showTooltip(e, `
        <strong>Chef Girl</strong><br>
        Level: ${chefGirlLevel}<br>
        ${chefTooltips[0]}
    `);
});

document.getElementById('chefPandaImage').addEventListener('mouseenter', (e) => {
    showTooltip(e, `
        <strong>Chef Panda</strong><br>
        Level: ${chefPandaLevel}<br>
        ${chefTooltips[1]}
    `);
});

document.getElementById('chefCatImage').addEventListener('mouseenter', (e) => {
    showTooltip(e, `
        <strong>Chef Cat</strong><br>
        Level: ${chefCatLevel}<br>
        ${chefTooltips[2]}
    `);
});

document.getElementById('chefCookImage').addEventListener('mouseenter', (e) => {
    showTooltip(e, `
        <strong>Chef Cook</strong><br>
        Level: ${chefCookLevel}<br>
        ${chefTooltips[3]}
    `);
});

document.getElementById('chefSamuraiImage').addEventListener('mouseenter', (e) => {
    showTooltip(e, `
        <strong>Chef Samurai</strong><br>
        Level: ${chefSamuraiLevel}<br>
        ${chefTooltips[4]}
    `);
});

const chefTooltips = [
    "Increases your sushi per click by 20%",
    "Increases the chance of critical hits by 5%",
    "Automatically gives you sushi per second",
    "Activates a Fever Mode every 30 seconds (2x bonus)",
    "Activates Zen Mode after 10 seconds of inactivity"
];

const sushiTooltips = [
    "Standard sushi with 1x multiplier",
    "2x multiplier for your clicks",
    "10x multiplier for your clicks",
    "100x multiplier for your clicks",
    "500x multiplier for your clicks",
    "1000x multiplier for your clicks"
];

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

function showPrestigeBox() {
    const infoBox = document.getElementById("prestigeBox");
    infoBox.style.display = "inline-block";
    infoBox.classList.remove("info-hide");
    infoBox.classList.add("info-show");

    ["row", "backgroundVid", "playButton", "prestigeButton"].forEach(id => {
        document.getElementById(id).style.filter = "blur(5px)";
    });
}

function hidePrestigeBox() {
    const infoBox = document.getElementById("prestigeBox");
    infoBox.classList.remove("info-show");
    infoBox.classList.add("info-hide");

    setTimeout(() => {
        infoBox.style.display = "none";
    }, 300);

    ["row", "backgroundVid", "playButton", "prestigeButton"].forEach(id => {
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

function clickSushi(event) {
    const clickX = event ? event.clientX : window.innerWidth / 2;
    const clickY = event ? event.clientY : window.innerHeight / 2;
    
    let sushiGain = sushiPerClick;
    const isCritical = Math.random() < critChance;
    
    if (isCritical) sushiGain *= critMultiplier;
    if (feverActive) sushiGain *= 2;
    
    createClickParticles(clickX, clickY, isCritical);
    
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
        if (btn) {
            btn.textContent = `Upgrade ${chef.name} for ${formatSushiCount(chef.price)} Sushi`;
            if (sushiCount >= chef.price) {
                btn.classList.add("affordable");
            } else {
                btn.classList.remove("affordable");
            }
        }
    });

    sushi.forEach((item, index) => {
        const buttons = document.querySelectorAll(".sushi .upgrade-button");
        if (buttons[index]) {
            if (sushiCount >= sushiPrices[index] && !sushiBought[index]) {
                buttons[index].classList.add("affordable");
            } else {
                buttons[index].classList.remove("affordable");
            }
        }
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

        if (chefGirlLevel === 1) {
            document.getElementById("chefGirlImage").style.display = "block";
        }

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

        if (chefPandaLevel === 1) {
            document.getElementById("chefPandaImage").style.display = "block";
        }

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

        if (chefCatLevel === 1) {
            document.getElementById("chefCatImage").style.display = "block";
        }

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

        if (chefCookLevel === 1) {
            document.getElementById("chefCookImage").style.display = "block";
        }

        updateUI();
        saveGame();
    } else showNotification("not enough sushi!");
}

function startFeverLoop() {
    clearInterval(cooldownTimer);
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
        upgradeIndexZen *= 4;
        if (chefSamuraiLevel === 1) startZenCheck();

        if (chefSamuraiLevel === 1) {
            document.getElementById("chefSamuraiImage").style.display = "block";
        }

        updateUI();
        saveGame();
    } else showNotification("not enough sushi!");
}

function startZenCheck() {
    document.addEventListener("click", () => {
        lastClickTime = Date.now();
        if (zenModeActive) deactivateZenMode();
    });

    const zenIntervals = window.zenIntervals || [];
    zenIntervals.forEach(interval => clearInterval(interval));
    window.zenIntervals = [];

    const interval = setInterval(() => {
        if (chefSamuraiLevel >= 1 && !zenModeActive && Date.now() - lastClickTime >= 10000) {
            activateZenMode();
        }
    }, 1000);
    zenIntervals.push(interval);
}

function activateZenMode() {
    if (zenModeActive) return;
    
    zenModeActive = true;
    originalSushiPerSecond = sushiPerSecond;
    sushiPerSecond *= upgradeIndexZen;
    
    const headerText = document.getElementById("headerText");
    if (headerText) {
        headerText.classList.add("zen-glow");
    }
    
    saveGame();
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
    { id: "sushi1", imgSrc: "./media/sushi1.png", name: "Nigiri" },
    { id: "sushi2", imgSrc: "./media/sushi2.png", name: "Gold Nigiri" },
    { id: "sushi3", imgSrc: "./media/sushi3.png", name: "Super Nigiri" },
    { id: "sushi4", imgSrc: "./media/sushi4.png", name: "Hoso Maki" },
    { id: "sushi5", imgSrc: "./media/sushi5.png", name: "Maki" },
    { id: "sushi6", imgSrc: "./media/sushi6.png", name: "Sushi plate" }
];

const chefs = [
    { id: "chef1", imgSrc: "./media/chef1.png", name: "girl", price: chefGirlPrice, upgrade: upgradeChefGirl },
    { id: "chef2", imgSrc: "./media/chef2.png", name: "panda", price: chefPandaPrice, upgrade: upgradeChefPanda },
    { id: "chef3", imgSrc: "./media/chef3.png", name: "cat", price: chefCatPrice, upgrade: upgradeChefCat },
    { id: "chef4", imgSrc: "./media/chef4.png", name: "chef", price: chefCookPrice, upgrade: upgradeChefCook },
    { id: "chef5", imgSrc: "./media/chef5.png", name: "samurai", price: chefSamuraiPrice, upgrade: upgradeChefSamurai }
];

document.addEventListener("DOMContentLoaded", () => {

    if (chefGirlLevel >= 1) document.getElementById("chefGirlImage").style.display = "block";
    if (chefPandaLevel >= 1) document.getElementById("chefPandaImage").style.display = "block";
    if (chefCatLevel >= 1) document.getElementById("chefCatImage").style.display = "block";
    if (chefCookLevel >= 1) document.getElementById("chefCookImage").style.display = "block";
    if (chefSamuraiLevel >= 1) document.getElementById("chefSamuraiImage").style.display = "block";

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
       
        if (sushiCount >= chef.price) {
            button.classList.add("affordable");
        }
        button.addEventListener("click", chef.upgrade);

        chefDiv.appendChild(img);
        chefDiv.appendChild(button);
        chefUpgradeScreen.appendChild(chefDiv);
    });

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

        if (sushiCount >= sushiPrices[index] && !sushiBought[index]) {
            button.classList.add("affordable");
        }
        button.addEventListener("click", () => buySushi(index));

        sushiDiv.appendChild(img);
        sushiDiv.appendChild(button);
        sushiUpgradeScreen.appendChild(sushiDiv);
    });

    chefs.forEach((chef, index) => {
        const element = document.getElementById(`${chef.id}-button`);
        if (element) {
            element.addEventListener("mouseenter", (e) => {
                showTooltip(e, `
                    <strong>${chef.name}</strong><br>
                    ${chefTooltips[index]}<br>
                `);
            });
        }
    });

    sushi.forEach((item, index) => {
        const buttons = document.querySelectorAll(".sushi .upgrade-button");
        if (buttons[index]) {
            buttons[index].addEventListener("mouseenter", (e) => {
                showTooltip(e, `
                    <strong>${item.name}</strong><br>
                    ${sushiTooltips[index]}<br>
                `);
            });
        }
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
    localStorage.setItem('lastClickTime', JSON.stringify(lastClickTime));
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

    if (localStorage.getItem('lastClickTime')) lastClickTime = parseFloat(localStorage.getItem('lastClickTime'));

    if (chefCookLevel >= 1) {
        clearInterval(cooldownTimer);
        startFeverLoop();
    }
    
    if (chefSamuraiLevel >= 1) {
        document.addEventListener("click", () => {
            lastClickTime = Date.now();
            if (zenModeActive) deactivateZenMode();
        });
        
        if (!zenModeActive && Date.now() - lastClickTime >= 10000) {
            activateZenMode();
        }
        
        setInterval(() => {
            if (chefSamuraiLevel >= 1 && !zenModeActive && Date.now() - lastClickTime >= 10000) {
                activateZenMode();
            }
        }, 1000);
    }

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

    if (chefGirlLevel >= 1) document.getElementById("chefGirlImage").style.display = "block";
    if (chefPandaLevel >= 1) document.getElementById("chefPandaImage").style.display = "block";
    if (chefCatLevel >= 1) document.getElementById("chefCatImage").style.display = "block";
    if (chefCookLevel >= 1) document.getElementById("chefCookImage").style.display = "block";
    if (chefSamuraiLevel >= 1) document.getElementById("chefSamuraiImage").style.display = "block";
}

loadGame();

if (chefCookLevel >= 1) startFeverLoop();
if (chefSamuraiLevel >= 1) startZenCheck();
//Localstorage

function showNotification(message) {
    const notification = document.createElement("div");
    notification.className = "notification";
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add("fade-out");
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

//Function mit Hilfe von ChatGPT
function createClickParticles(x, y, isCritical) {
    const particleCount = isCritical ? 15 : 8;
    const particles = [];
    
    for(let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = `particle ${isCritical ? 'critical' : ''}`;
        
        const sushiTypes = Math.min(6, currentSushiIndex + 1);
        const randomSushi = Math.floor(Math.random() * sushiTypes) + 1;
        p.style.backgroundImage = `url(media/sushi${randomSushi}.png)`;
        
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 50;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;
        
        p.style.setProperty('--tx', `${tx}px`);
        p.style.setProperty('--ty', `${ty}px`);
        p.style.left = `${x - 5}px`;
        p.style.top = `${y - 5}px`;
        
        document.body.appendChild(p);
        
        setTimeout(() => {
            p.remove();
        }, 1000);
    }
}