document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        let container1 = document.getElementById('firstScreen');
        let container2 = document.getElementById('startScreen');
        
        setTimeout(() => {
            container1.style.display = 'none';
            container2.style.display = 'box';
        }, 500);
    }
});