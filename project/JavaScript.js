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

/* --------------------Game-------------------- */