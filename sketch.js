let actors = {
   "flies": [],
   "frogs": []
};

function setup() {
   createCanvas(1200, 500);

   spawnFlies(numActors=100);
   spawnFrogs(numActors=1);
}

function draw() {
   background(220);

   for (actorType in actors) {
      for (let i = 0; i < actors[actorType].length; i++) {
         let actor = actors[actorType][i];
         let targets = actor.getTargets(actor);
         actor.move(actors[targets]);
         actor.draw();

         if (!actor.isAlive()) {
            actors[actorType].splice(i, 1);
         }
      }
   }
}

function spawnFlies(numActors) {
   for (let i = 0; i < numActors; i++) {
      actors.flies.push(new Fly(id=i));
   }
}

function spawnFrogs(numActors) {
   for (let i = 0; i < numActors; i++) {
      actors.frogs.push(new Frog(id=i));
   }
}
