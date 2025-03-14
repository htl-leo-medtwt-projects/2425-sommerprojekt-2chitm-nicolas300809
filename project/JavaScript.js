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

/* --------------------Game-------------------- */