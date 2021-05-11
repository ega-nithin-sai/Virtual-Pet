var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood,feedDog;
var food;

//create feed and lastFed variable here
var lastFed;

function preload(){
    sadDog=loadImage("Dog.png");
    happyDog=loadImage("happy dog.png");
}

function setup() {
  createCanvas(1000,400);

  database=firebase.database();

  food = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.2;

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addTheFood);

  feedDog=createButton("Feed Dog");
  feedDog.position(700,95);
  feedDog.mousePressed(feedTheDog);

}

function draw() {
  background(46,139,87);
  food.display();

  var x = database.ref('LastFedTime').on("value",getTime);
  
  //write code to display text lastFed time here

  if(lastFed > 12){
    extensiion = "pm";
  }else if(lastFed === 12){
    extensiion = "noon";
  }else{
    extensiion = "am";
  }
  strokeWeight(5);
  stroke("gold");  
  fill("black");
  text("Last Fed Time: " + lastFed + " am",500,100);

  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  food.updateFoodStock(foodS);
}


function feedTheDog(){
  dog.addImage(happyDog);
  
  lastFed = hour();
  database.ref("/").update({
    LastFedTime: lastFed
  });

  console.log(lastFed);
  if(foodS !== null){
    //write code here to update food stock and last fed time
    foodS--;
    database.ref('/').update({
        Food:foodS
    })
    food.deductFood();
  }
}

//function to add food in stock
function addTheFood(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function getTime(data){
    lastFed = data.val();
}

function getTime(data){
  lastFed = data.val();
}