document.addEventListener('keydown', function(event) {
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
    let container1 = document.getElementById('startScreen');
    let container2 = document.getElementById('gameScreen');

    container1.style.transform = "translateY(-100%)"; 
    container2.style.transform = "translateY(0%)"; 

    setTimeout(() => {
        container1.style.display = 'none';
    }, 1000);
}


        

/* --------------------Game-------------------- */

document.addEventListener("DOMContentLoaded", function () {
    const chefs = [
        { id: "chef1", imgSrc: "media/chef1.png", name: "girl" },
        { id: "chef2", imgSrc: "media/chef2.png", name: "panda" },
        { id: "chef3", imgSrc: "media/chef3.png", name: "cat" },
        { id: "chef4", imgSrc: "media/chef4.png", name: "chef"},
        { id: "chef5", imgSrc: "media/chef5.png", name: "samurai"}
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
        button.textContent = "Upgrade " + chef.name;
        button.classList.add("upgrade-button");

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

let sushiCount = 0;
let sushiPerClick = 1;

function clickSushi() {
    sushiCount += sushiPerClick;
    document.getElementById("sushiOutput").innerHTML = `
    <img src="media/sushi5.png" alt="sushi" id="sushiCountImg">
    <p id="headerText">${sushiCount}</p>`;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("sushiOutput").innerHTML = `
    <img src="media/sushi5.png" alt="sushi" id="sushiCountImg">
    <p id="headerText">${sushiCount}</p>`;
});

