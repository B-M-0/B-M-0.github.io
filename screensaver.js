document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('screensaver');
    const context = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const logo = new Image();
    logo.src = 'logo.png'; 
    
    let x = Math.random() * (canvas.width - 100);
    let y = Math.random() * (canvas.height - 50);
    let dx = 2;
    let dy = 2;
    const logoWidth = 100;
    const logoHeight = 50;
    
    function draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(logo, x, y, logoWidth, logoHeight);
        
        if (x + logoWidth >= canvas.width || x <= 0) {
            dx = -dx;
        }
        if (y + logoHeight >= canvas.height || y <= 0) {
            dy = -dy;
        }
        
        x += dx;
        y += dy;
        
        requestAnimationFrame(draw);
    }
    
    logo.onload = () => {
        draw();
    };
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});