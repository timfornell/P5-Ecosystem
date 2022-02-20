class Frog extends Actor {
   constructor(id) {
      let params = {
         "position": createVector(random(width / 4, 3 * width / 4), random(height / 4, 3 * height / 4)),
         "velocity": createVector(0, 0),
         "fov": 120, // 70 degrees field of view
         "size": 25,
         "id": id,
         "maxVelocity": 1,
         // Food related parameters
         "targets": "flies",
         "foodValue": 40,
         "hungerDecay": 0.1
      };
      super(params);

   }

   draw() {
      let params = {
         "color": color(0, 255, 0),
         "size": this.size
      };

      fill(params.color);
      circle(this.position.x, this.position.y, params.size);
      super.draw();
   }

   eat(foodValue) {
      super.eat(foodValue);
   }

   move(targets) {
      if (targets.length > 0 && this.shouldMove()) {
         this.moveTowardsNearestTarget(targets);
      } else {
         this.acceleration = createVector(0, 0);
         this.velocity.x = max(0, this.velocity.x - 0.1);
         this.velocity.y = max(0, this.velocity.y - 0.1);
      }

      fill(255);
      line(this.position.x, this.position.y, this.position.x + this.acceleration.x, this.position.y + this.acceleration.y);

      super.move();
   }

   shouldMove() {
      if (this.hunger < 80) {
         return true;
      }
   }

   moveTowardsNearestTarget(targets) {
      stroke(0);
      line(this.position.x, this.position.y, this.position.x + 20 * this.viewingVector.x, this.position.y + 20 * this.viewingVector.y);
      let nearestTarget = super.findNearestTarget(targets);

      // If no object was found
      if (Object.keys(nearestTarget).length === 0 && nearestTarget.constructor === Object) {
         // Rotate to try and find one
         this.viewingVector.rotate(radians(1));
         return;
      }

      let direction = nearestTarget.position.copy();
      direction.sub(this.position);
      if (direction.mag() < this.size / 2) {
         nearestTarget.wasEaten();
         this.eat(nearestTarget.foodValue);
      } else {
         this.acceleration = direction.copy();
      }
   }
}