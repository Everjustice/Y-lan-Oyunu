document.addEventListener("DOMContentLoaded", function () {
    const gameContainer = document.getElementById("game-container");
    const gameBoard = document.getElementById("game-board");
    const startButton = document.getElementById("start-button");
    const scoreContainer = document.getElementById("score");
    const timeContainer = document.getElementById("time");
    const boardSize = 35;
    const cellSize = 24;
    const speed = 175;

    let snake = [{ x: 5, y: 5 }];
    let food = getRandomPosition();
    let score = 0;
    let timeLeft = 50; 
    let isGameOver = false;
    let isGameStarted = false;
    let direction = "right"; 
    let gameInterval;

    function getRandomPosition() {
        return {
            x: Math.floor(Math.random() * (boardSize - 1)),
            y: Math.floor(Math.random() * (boardSize - 1)),
        };
    }

    function draw() {
        gameBoard.innerHTML = "";

        snake.forEach((segment, index) => {
            const snakeSegment = document.createElement("div");
            snakeSegment.classList.add("snake-segment");
            snakeSegment.style.left = segment.x * cellSize + "px";
            snakeSegment.style.top = segment.y * cellSize + "px";
            gameBoard.appendChild(snakeSegment);
        });

        const foodElement = document.createElement("div");
        foodElement.classList.add("food");
        foodElement.style.left = food.x * cellSize + "px";
        foodElement.style.top = food.y * cellSize + "px";
        gameBoard.appendChild(foodElement);
    }

    function move() {
        const head = Object.assign({}, snake[0]);

        switch (direction) {
            case "up":
                head.y = (head.y - 1 + boardSize) % boardSize;
                break;
            case "down":
                head.y = (head.y + 1) % boardSize;
                break;
            case "left":
                head.x = (head.x - 1 + boardSize) % boardSize;
                break;
            case "right":
                head.x = (head.x + 1) % boardSize;
                break;
        }

        snake.unshift(head);

       
        if (head.x === food.x && head.y === food.y) {
            food = getRandomPosition();
            score += 10;
            timeLeft += 30; 
            updateScoreAndTime();
        } else {
            snake.pop();
        }

    
        if (isCollision()) {
            gameOver();
        }

     
        timeLeft -= 1;
        updateTime();

        if (timeLeft <= 0) {
            gameOver();
        }
    }

    function isCollision() {
        const head = snake[0];
        return snake.slice(1).some((segment) => segment.x === head.x && segment.y === head.y);
    }

    function gameOver() {
        clearInterval(gameInterval);
        isGameOver = true;
        alert("Oyun Bitti! Puanınız: " + score);
        resetGame();
    }

    function resetGame() {
        snake = [{ x: 5, y: 5 }];
        food = getRandomPosition();
        score = 0;
        timeLeft = 50;
        isGameOver = false;
        isGameStarted = false;
        startButton.disabled = false;
        updateScoreAndTime();
        draw();
    }

    function startGame() {
        if (!isGameStarted) {
            isGameStarted = true;
            startButton.disabled = true;
            gameInterval = setInterval(() => {
                move();
                draw();
            }, speed);

        
            document.addEventListener("keydown", handleKeyDown);
        }
    }

    function updateScoreAndTime() {
        scoreContainer.textContent = "Puan: " + score;
    }

    function updateTime() {
        timeContainer.textContent = "Süre: " + timeLeft ;
    }

    function handleKeyDown(event) {
        switch (event.key) {
            case "ArrowUp":
                direction = "up";
                break;
            case "ArrowDown":
                direction = "down";
                break;
            case "ArrowLeft":
                direction = "left";
                break;
            case "ArrowRight":
                direction = "right";
                break;
        }
    }

    startButton.addEventListener("click", startGame);
});
