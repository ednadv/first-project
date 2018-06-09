function Car(ctx, x, y, img) {
  this.ctx = ctx;

  this.x = x ? x : 0;
  this.vx = 5;
  this.y = y ? y : 0;
  this.vy = 5;

  this.img = new Image();
  this.img.src = img ? img  : "./img/cocherosa3.png";
  this.width = 60;
  this.height = 90;
  

}

Car.prototype.moveDown = function() {
  this.y += this.vy;
}

Car.prototype.moveUp = function() {
  this.y -= this.vy;
}

Car.prototype.moveLeft = function(){
  this.x -= this.vx;
}
  
Car.prototype.moveRight = function() {
  this.x += this.vx;
}

Car.prototype.checkCollisionsCanvas = function() {
  if(this.x <= 0) this.x = 0;

  if(this.x + this.width >= this.ctx.canvas.width) {
    this.x = this.ctx.canvas.width - this.width
  }

  if(this.y <= 0) {
    this.y = 0;
  }

  if(this.height + this.y >= this.ctx.canvas.height) {
    this.y = this.ctx.canvas.height - this.height
  }
}

Car.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.width,
    this.height
  )

  this.ctx.strokeRect(this.x, this.y, this.width, this.height)
};