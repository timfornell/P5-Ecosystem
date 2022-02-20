class Actor {
   constructor(params) {
      this.position = params.position.copy();
      this.velocity = params.velocity.copy();
      this.acceleration = createVector(0, 0);
      this.fov = radians(params.fov), // convert to radians
      this.viewingVector = createVector(random(-1, 1), random(-1, 1));
      this.size = params.size;
      this.id = params.id;
      this.targets = params.targets;
      this.life = 100;
      this.hunger = 100;
      this.foodValue = params.foodValue;
      this.hungerDecay = params.hungerDecay;
      this.maxVelocity = params.maxVelocity;
   }

   move() {
      this.hunger -= this.hungerDecay;
      this.hunger = max(this.hunger, 0);

      if (this.isStarving()) {
         this.starving();
      }

      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxVelocity);
      this.position.add(this.velocity);
      this.clampPosition();

      if (this.velocity.mag() > 0) {
         this.viewingVector = this.velocity.copy();
         this.viewingVector.normalize();
      }
   }

   wrapPosition() {
      if (this.position.x < 0) {
         this.position.x = width;
      } else if (this.position.x > width) {
         this.position.x = 0;
      }

      if (this.position.y < 0) {
         this.position.y = height;
      } else if (this.position.y > height) {
         this.position.y = 0;
      }
   }

   clampPosition() {
      this.position.x = max(0, min(this.position.x, width));
      this.position.y= max(0, min(this.position.y, height));
   }

   eat(foodValue) {
      this.hunger += foodValue;
      this.hunger = min(this.hunger, 100);
   }

   wasEaten() {
      this.life = 0;
   }

   isStarving() {
      return this.hunger == 0;
   }

   starving() {
      this.life -= 0.1;
   }

   isAlive() {
      return this.life > 0;
   }

   getTargets() {
      return this.targets;
   }

   findNearestTarget(targets) {
      let closestTarget = {
         "distance": Infinity,
         "target": {}
      }

      for (let i = 0; i < targets.length; i++) {
         let target = targets[i]
         let diff = target.position.copy();
         diff.sub(this.position);
         let angle = diff.angleBetween(this.viewingVector);

         if (diff.mag() < closestTarget.distance && abs(angle) < this.fov / 2) {
            closestTarget.distance = diff.mag();
            closestTarget.target = target;
         }
      }

      return closestTarget.target
   }

   draw() {
      this.drawStatusBars();
      this.drawFov();
   }

   drawFov() {
      let lineLength = this.size * 1.5;
      let leftLine = this.viewingVector.copy();
      let rightLine = this.viewingVector.copy();
      leftLine.setMag(lineLength);
      rightLine.setMag(lineLength);
      leftLine.rotate(-this.fov / 2);
      rightLine.rotate(this.fov / 2);

      stroke(0);
      line(this.position.x, this.position.y, this.position.x + leftLine.x, this.position.y + leftLine.y);
      line(this.position.x, this.position.y, this.position.x + rightLine.x, this.position.y + rightLine.y);
   }

   drawStatusBars() {
      let statusBarWidth = max(this.size, 10);
      let statusBarHeight = max(this.size / 4, 4);

      // Draw outline with same color as background
      fill(220);
      rect(
         this.position.x - statusBarWidth / 2,
         this.position.y - this.size / 2 - statusBarHeight - 2,
         statusBarWidth,
         statusBarHeight
      );
      // Draw rectangle based on the health
      fill(255, 0, 0);
      rect(
         this.position.x - statusBarWidth / 2,
         this.position.y - this.size / 2 - statusBarHeight - 2,
         statusBarWidth * this.life / 100,
         statusBarHeight
      );

      // Draw outline with same color as background
      fill(220);
      rect(
         this.position.x - statusBarWidth / 2,
         this.position.y + this.size / 2 + 2,
         statusBarWidth,
         statusBarHeight
      );
      // Draw rectangle based on the health
      fill(255, 255, 0);
      rect(
         this.position.x - statusBarWidth / 2,
         this.position.y + this.size / 2 + 2,
         statusBarWidth * this.hunger / 100,
         statusBarHeight
      );
   }
}