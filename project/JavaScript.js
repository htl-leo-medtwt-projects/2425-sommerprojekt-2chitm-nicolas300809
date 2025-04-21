document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        let container1 = document.getElementById('firstScreen');
        let container2 = document.getElementById('startScreen');

        container1.classList.add('slide-up-first');
        container2.classList.add('slide-up-second');

        setTimeout(() => {
            container1.style.display = 'none';
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

document.getElementById('infoBox').style.display = 'none';
function showInfoBox() {
    let infoBox = document.getElementById('infoBox');

    infoBox.style.display = 'inline-block';
    infoBox.classList.remove('info-hide');
    infoBox.classList.add('info-show');

    document.getElementById('row').style.filter = 'blur(5px)';
    document.getElementById('backgroundVid').style.filter = 'blur(5px)';
    document.getElementById('playButton').style.filter = 'blur(5px)';
}


function hideInfoBox() {
    let infoBox = document.getElementById('infoBox');

    infoBox.classList.remove('info-show');
    infoBox.classList.add('info-hide');

    setTimeout(() => {
        infoBox.style.display = 'none';
    }, 300);

    document.getElementById('row').style.filter = 'blur(0px)';
    document.getElementById('backgroundVid').style.filter = 'blur(0px)';
    document.getElementById('playButton').style.filter = 'blur(0px)';
}


function showGame() {
    let gameScreen = document.getElementById('gameScreen');
    let startScreen = document.getElementById('startScreen');

    gameScreen.style.display = 'block';
    gameScreen.style.transform = "translateY(100%)";

    setTimeout(() => {
        gameScreen.style.transform = "translateY(0%)";
    }, 10);

    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1000);
}



/* --------------------Game-------------------- */

function backToStartscreen() {
    let gameScreen = document.getElementById('gameScreen');
    let startScreen = document.getElementById('startScreen');

    startScreen.style.display = 'block';

    setTimeout(() => {
        gameScreen.style.transform = "translateY(100%)";
    }, 10);

    setTimeout(() => {
        gameScreen.style.display = 'none';
    }, 1000);
}


/* Hilfe von ChatGPT */
document.addEventListener("DOMContentLoaded", function () {
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

document.addEventListener("DOMContentLoaded", function () {
    const sushi = [
        { id: "sushi1", imgSrc: "media/sushi1.png", name: "sushi A" },
        { id: "sushi2", imgSrc: "media/sushi2.png", name: "sushi B" },
        { id: "sushi3", imgSrc: "media/sushi3.png", name: "sushi C" },
        { id: "sushi4", imgSrc: "media/sushi4.png", name: "sushi D" },
        { id: "sushi5", imgSrc: "media/sushi5.png", name: "sushi E" },
        { id: "sushi6", imgSrc: "media/sushi6.png", name: "sushi F" }
    ];

    const sushiUpgradeScreen = document.getElementById("sushiUpgradeScreen");
    sushiUpgradeScreen.innerHTML = "";

    sushi.forEach(sushi => {
        const sushiDiv = document.createElement("div");
        sushiDiv.classList.add("sushi");

        const img = document.createElement("img");
        img.src = sushi.imgSrc;
        img.alt = sushi.name;

        const button = document.createElement("button");
        button.textContent = "Buy " + sushi.name;
        button.classList.add("upgrade-button");

        sushiDiv.appendChild(img);
        sushiDiv.appendChild(button);
        sushiUpgradeScreen.appendChild(sushiDiv);
    });
});
/* bis hier */

let sushiCount = 0;
let sushiPerClick = 1;
let sushiPerSecond = 0;

function clickSushi() {
    let sushiGain = sushiPerClick;

    if (Math.random() < critChance) {
        sushiGain *= 3;
    }

    if (feverActive) {
        sushiGain *= 2;
    }

    sushiCount += sushiGain;

    updateUI();

}


document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sushiOutput").innerHTML = `
    <img src="media/sushi5.png" alt="sushi" id="sushiCountImg">
    <p id="headerText">${formatSushiCount(sushiCount)}</p>`;
    updateUI();
});

document.getElementById('sushiPerSecond').innerHTML = `<p>sushi/second: ${sushiPerSecond}</p>`;


//Format Function von ChatGPT
function formatSushiCount(count) {
    if (count >= 1e12) {
        return (count / 1e12).toFixed(2) + "T";
    } else if (count >= 1e9) {
        return (count / 1e9).toFixed(2) + "B";
    } else if (count >= 1e6) {
        return (count / 1e6).toFixed(2) + "M";
    } else if (count >= 1e3) {
        return (count / 1e3).toFixed(2) + "K";
    } else {
        return count.toFixed(2);
    }
}

function updateUI() {
    document.getElementById("sushiOutput").innerHTML = `
        <img src="media/sushi5.png" alt="sushi" id="sushiCountImg">
        <p id="headerText">${formatSushiCount(sushiCount)}</p>`;

    document.getElementById("sushiPerSecond").innerHTML = `
        <p>sushi/second: ${formatSushiCount(sushiPerSecond)}</p>`;


    let girlButton = document.getElementById("chef1-button");
    if (girlButton) {
        girlButton.textContent = `Upgrade Girl for ${formatSushiCount(chefGirlPrice)} Sushi`;
    }

    let pandaButton = document.getElementById("chef2-button");
    if (pandaButton) {
        pandaButton.textContent = `Upgrade Panda for ${formatSushiCount(chefPandaPrice)} Sushi`;
    }

    let catButton = document.getElementById("chef3-button");
    if (catButton) {
        catButton.textContent = `Upgrade Cat for ${formatSushiCount(chefCatPrice)} Sushi`;
    }

    let cookButton = document.getElementById("chef4-button");
    if (cookButton) {
        cookButton.textContent = `Upgrade Fire Chef for ${formatSushiCount(chefCookPrice)} Sushi`;
    }

    let samuraiButton = document.getElementById("chef5-button");
    if (samuraiButton) {
        samuraiButton.textContent = `Upgrade Samurai for ${formatSushiCount(chefSamuraiPrice)} Sushi`;
    }

}

document.addEventListener("DOMContentLoaded", updateUI);


let chefGirlLevel = 0;
let chefGirlPrice = 10;

function upgradeChefGirl() {
    if (sushiCount >= chefGirlPrice) {
        sushiCount -= chefGirlPrice;
        chefGirlLevel++;
        chefGirlPrice *= 1.5;
        sushiPerClick *= 1.2;

        updateUI();
    } else {
        alert("Nicht genug Sushi!");
    }
}


let chefPandaLevel = 0;
let chefPandaPrice = 50;
let critChance = 0.0;
let critMultiplier = 3;

function upgradeChefPanda() {
    if (sushiCount >= chefPandaPrice) {
        sushiCount -= chefPandaPrice;
        chefPandaLevel++;
        chefPandaPrice *= 1.5;
        critChance += 0.05;

        updateUI();
    } else {
        alert("Nicht genug Sushi!");
    }
}

let chefCatLevel = 0;
let chefCatPrice = 100;
let sushiPerSecondGain = 1;

function upgradeChefCat() {
    if (sushiCount >= chefCatPrice) {
        sushiCount -= chefCatPrice;
        chefCatLevel++;
        sushiPerSecond += sushiPerSecondGain;
        chefCatPrice *= 1.5;
        sushiPerSecondGain *= 1.4;

        updateUI();
    } else {
        alert("Nicht genug Sushi!");
    }
}

let chefCookLevel = 0;
let chefCookPrice = 500;

let feverActive = false;
let feverDuration = 5;
let feverCooldown = 30;
let feverTimer;
let cooldownTimer;

function upgradeChefCook() {
    if (sushiCount >= chefCookPrice) {
        sushiCount -= chefCookPrice;
        chefCookLevel++;
        chefCookPrice *= 1.5;

        feverDuration += 1;

        if (chefCookLevel === 1) {
            startFeverLoop();
        }

        updateUI();
    } else {
        alert("Nicht genug Sushi!");
    }
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

let chefSamuraiLevel = 0;
let chefSamuraiPrice = 1000;

let zenModeActive = false;
let lastClickTime = Date.now();
let originalSushiPerSecond = 0;
let upgradeIndexZen = 1;

function upgradeChefSamurai() {
    if (sushiCount >= chefSamuraiPrice) {
        sushiCount -= chefSamuraiPrice;
        chefSamuraiLevel++;
        chefSamuraiPrice *= 1.5;
        upgradeIndexZen *= 2;

        if (chefSamuraiLevel === 1) {
            startZenCheck();
        }

        updateUI();
    } else {
        alert("Nicht genug Sushi!");
    }
}

function startZenCheck() {
    document.addEventListener("click", () => {
        lastClickTime = Date.now();
        if (zenModeActive) {
            deactivateZenMode();
        }
    });

    setInterval(() => {
        if (chefSamuraiLevel >= 1 && !zenModeActive) {
            const now = Date.now();
            if (now - lastClickTime >= 10000) {
                activateZenMode();
            }
        }
    }, 1000);
}

function activateZenMode() {
    zenModeActive = true;
    originalSushiPerSecond = sushiPerSecond;
    sushiPerSecond *= upgradeIndexZen;

    const header = document.getElementById("headerText");
    if (header) {
        header.classList.add("zen-glow");
    }
}

function deactivateZenMode() {
    zenModeActive = false;
    sushiPerSecond = originalSushiPerSecond;

    const header = document.getElementById("headerText");
    if (header) {
        header.classList.remove("zen-glow");
    }
}

setInterval(() => {
    sushiCount += sushiPerSecond;
    updateUI();
}, 1000);

function useSushi1(){
    
}

function buySushi2(){
    
}
function useSushi2(){
    
}

function buySushi3(){
    
}
function useSushi3(){
    
}

function buySushi4(){
    
}
function useSushi4(){
    
}

function buySushi5(){
    
}
function useSushi5(){
    
}

function buySushi6(){
    
}
function useSushi6(){
    
}
