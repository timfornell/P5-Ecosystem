class Fly extends Actor {
   constructor(id) {
      let params = {
         "position": createVector(random(width / 4, 3 * width / 4), random(height / 4, 3 * height / 4)),
         "velocity": createVector(0, 0),
         "size": 5,
         "id": id,
         "maxVelocity": 2,
         // Food related parameters
         "targets": "",
         "foodValue": 10,
         "hungerDecay": 0.01
      };
      super(params);
   }

   draw() {
      let params = {
         "color": color(0, 0, 0),
         "size": this.size
      };

      fill(params.color);
      circle(this.position.x, this.position.y, params.size);
      super.draw();
   }

   eat() {
      super.eat(0);
   }

   move() {
      let maxAcc = 0.2
      this.acceleration = createVector(random(-maxAcc, maxAcc), random(-maxAcc, maxAcc));
      super.move();
   }
}