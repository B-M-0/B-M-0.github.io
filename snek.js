const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');

const box = 20;
const canvasSize = window.innerHeight;
let snake = [{ x: box * 5, y: box * 5 }];
let direction = 'RIGHT';
let food = {
    x: Math.floor(Math.random() * canvasSize / box) * box,
    y: Math.floor(Math.random() * canvasSize / box) * box
};
document.addEventListener('keydown', changeDirection);

function changeDirection(event) {
    if (event.keyCode === 65 && direction !== 'RIGHT') direction = 'LEFT';
    else if (event.keyCode === 87 && direction !== 'DOWN') direction = 'UP';
    else if (event.keyCode === 68 && direction !== 'LEFT') direction = 'RIGHT';
    else if (event.keyCode === 83 && direction !== 'UP') direction = 'DOWN';
}



function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = i === 0 ? 'green' : 'white';
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, box, box);
   

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'LEFT') snakeX -= box;
    if (direction === 'UP') snakeY -= box;
    if (direction === 'RIGHT') snakeX += box;
    if (direction === 'DOWN') snakeY += box;

    

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX >= canvasSize || snakeY < 0 || snakeY >= canvasSize || collision(newHead, snake)) {
        clearInterval(game);
        exit(0);
    }


    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * canvasSize / box) * box,
            y: Math.floor(Math.random() * canvasSize / box) * box
        };
    }
    else {
        snake.pop();
    }

    snake.unshift(newHead);
}

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x === array[i].x && head.y === array[i].y) {
            return true;
        }
    }
    return false;
}

let game = setInterval(draw, 150);