function Obstacle(ctx) {
  this.ctx = ctx;

  this.w = 60;
  this.h = 90; 

  this.x = Math.random() * this.ctx.canvas.width;
  this.y = 0;

  this.img = new Image();
  this.img.src = "./img/car_" + Math.floor(Math.random() * 4) + ".png";
  
  this.vy = 1;
}

Obstacle.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    0,
    0,
    this.img.width,
    this.img.height,
    this.x,
    this.y,
    this.w,
    this.h
  );

  this.ctx.strokeStyle = "red";
  this.ctx.strokeRect(this.x, this.y, this.w, this.h)
};

Obstacle.prototype.move = function() {
  this.y += this.vy; 
};
