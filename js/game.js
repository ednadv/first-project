var KEY_RESTART = 82;
var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_LEFT = 37;
var KEY_RIGHT = 39;

function Game(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.drawIntervalId = undefined;
    this.car = new Car(this.ctx);
    this.target = new Target(this.ctx);
    this.obstacle = new Obstacle(this.ctx); // Para poder acceder a la propiedad de vy
    this.bg = new Background(this.ctx);
    this.score = new Score(this.ctx);
    this.obstacles = [];
    this.drawCaunter = 0;
    this.restartKey = 'R';
}  

Game.prototype.start = function() {
    this.generateCarAndTarget()
    this.init();

    this.drawIntervalId = setInterval(function() {
        this.clean();
        this.draw();
        this.moveAll();
        this.checkParking();
        this.checkCollision();

       if (this.drawCaunter === 100){
           this.drawCaunter = 0;
           this.generateObstacle()
       }
    }.bind(this), 1000 / this.fps);
}

Game.prototype.generateObstacle = function(){
    var obstacle = new Obstacle(this.ctx);
    this.obstacles.push(obstacle);
}


Game.prototype.generateCarAndTarget = function(target) {
    var carLeft = this.car.x;
        var carRight = this.car.x + (this.car.width);
        var carTop = this.car.y;
        var carBottom = this.car.y + (this.car.height);

        var targeleLeft = target.x;
        var targeeRight = target.x + (target.width);
        var targeTop = target.y;
        var targeBottom = target.y + (target.height);

        var crash = true;
        
        if ((carBottom < obstacleTop)
        || (carTop > obstacleBottom) 
        || (carRight < obstacleLeft) 
        || (carLeft > obstacleRight)) {
           crash = false;
        }

        return crash;
}




Game.prototype.collideWith = function(obstacle) {
        var carLeft = this.car.x;
        var carRight = this.car.x + (this.car.width);
        var carTop = this.car.y;
        var carBottom = this.car.y + (this.car.height);

        var obstacleLeft = obstacle.x;
        var obstacleRight = obstacle.x + (obstacle.w);
        var obstacleTop = obstacle.y;
        var obstacleBottom = obstacle.y + (obstacle.h);

        var crash = true;
        
        if ((carBottom < obstacleTop)
        || (carTop > obstacleBottom) 
        || (carRight < obstacleLeft) 
        || (carLeft > obstacleRight)) {
           crash = false;
        }

        return crash;
}


Game.prototype.checkCollision = function (){
    for (var i = 0; i < this.obstacles.length; i++) {
        if(this.collideWith(this.target)){
            this.win();
        }
        if (this.collideWith(this.obstacles[i])) {
            this.gameOver();
        }
    }
}




Game.prototype.gameOver = function() {
    clearInterval(this.drawIntervalId); // Paramos el juego
    this.ctx.fillStyle="#FFFFFF";
    this.ctx.font = "40px Georgia";
    this.ctx.fillText(
        'Game over. Press '+ this.restartKey + ' to restart', // El texto que quiero escribir
        this.ctx.canvas.width/2 - 200, 
        this.ctx.canvas.height/2
    ); // Pintamos un texto dando la posibilidad de volver a jugar

    
}
       
Game.prototype.init =  function() {
    this.car.x = 1000;
    this.car.y = 400;

    this.target.x = 0;
    this.target.y = 0;

}


Game.prototype.onKeyDown = function(key) {
    this.car.onKeyDown(key);    
}

Game.prototype.clean = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}

Game.prototype.draw =  function() {
    this.drawCaunter++;

    this.bg.draw();
    this.car.draw();
    this.target.draw();

    for (var i = 0; i < this.obstacles.length; i++) {
        this.obstacles[i].draw()
    }
}

Game.prototype.moveAll = function() {
    for (var i = 0; i < this.obstacles.length; i++){
        this.obstacles[i].move()
        if(this.obstacles.length > 2) {
            this.obstacles[i].vy = 2;
        }
        if(this.obstacles.length > 4) {
            this.obstacles[i].vy = 5;
        }
    }
}

Game.prototype.win = function() {

}

Game.prototype.onKeyDown = function(key) {
    switch(key) {
        case KEY_UP:
            this.car.moveUp();
            break;
        case KEY_DOWN:
            this.car.moveDown();
            break;
        case KEY_LEFT:
            this.car.moveLeft();
            break;
        case KEY_RIGHT:
            this.car.moveRight();
            break;
        case KEY_RESTART:
            location.reload();
            this.start();
            break;
    }
    this.car.checkCollisionsCanvas();
}