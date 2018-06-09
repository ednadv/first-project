function Target(ctx) {
    this.ctx = ctx;
  
    this.x = 0;
    this.y = 0;
  
    this.img = new Image();
    this.img.src = "img/icono-parking.png";
    this.width = 50;
    this.height = 50;
    this.w = this.width;
    this.h = this.height;
  }
  

Target.prototype.draw = function() {
  this.ctx.drawImage(
    this.img,
    this.x,
    this.y,
    this.width,
    this.height
  )
};
