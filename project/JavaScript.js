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