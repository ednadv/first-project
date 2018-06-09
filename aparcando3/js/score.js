function Score(ctx) {
    this.ctx = ctx;
    this.x = 50;
    this.y = 50;
    this.puntuacion = 0;
  }
  
  Score.prototype.draw = function() {
    this.ctx.font = "30px Verdana";
    this.ctx.fillText(Math.floor(this.score), this.x, this.y);
    this.score += 0.05;
  };