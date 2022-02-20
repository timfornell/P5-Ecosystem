let actors, numFlies, numFrogs, resetButton, inputNumFlies, inputNumFrogs;

numFlies = 100;
numFrogs = 1;

function setup() {
   createCanvas(1200, 500);

   let numFliesText = createElement("h5", "Number of flies: ");
   numFliesText.position(10, height);
   let numFrogsText = createElement("h5", "Number of frogs: ");
   numFrogsText.position(10, height + 30);

   inputNumFlies = createInput(numFlies);
   inputNumFrogs = createInput(numFrogs);
   inputNumFlies.position(numFliesText.x + 100, height + 18);
   inputNumFrogs.position(numFrogsText.x + 105, height + 48);
   resetButton = createButton("Reset");
   resetButton.position(10, height + 90);
   resetButton.mousePressed(restartSketch);

   actors = {
      "flies": [],
      "frogs": []
   };

   spawnFlies(numActors=numFlies);
   spawnFrogs(numActors=numFrogs);
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

function restartSketch() {
   numFlies = inputNumFlies.value();
   numFrogs = inputNumFrogs.value();
   setup();
}