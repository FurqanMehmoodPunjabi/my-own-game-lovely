class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1_img);
    car1.scale=0.75
    car2 = createSprite(300,200);
    car2.addImage("car2",car2_img);
    car2.scale=0.75
    cars = [car1, car2];
  }

  play(){
    form.hide();
    
    
    Player.getPlayerInfo();
    player.getCarsAtEnd();
    
    if(allPlayers !== undefined){
      background("cyan");
      
      
      //var display_position = 100;
      
      //index of the array
      var index = 0;

      //x and y position of the cars
      var y = 10;
      var x;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        y = y + 300;
        //use data form the database to display the cars in y direction
        x = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;
       // console.log(index, player.index)
     
        //write code here to spawn the clouds
        if (frameCount % 60 === 0) {
          fire = createSprite(displayWidth/2,displayHeight,100,100);
          //cloud.y = Math.round(random(80,120));
          fire.addImage(fireimage);
          fire.scale = 0.1;
          fire.velocityY = random(-5,-12);
          fire.x=Math.round(random(displayWidth/6,displayWidth))
          
           //assign lifetime to the variable
          //cloud.lifetime = 200;
          
          //adjust the depth
         
          //add each cloud to the group
          //cloudsGroup.add(cloud);
        }
      
       
        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        //textSize(15);
        //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance -=10
      player.update();
    }
    if(keyIsDown(LEFT_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance > 3860){
      gameState = 2;
      player.rank +=1
      Player.updateCarsAtEnd(player.rank)
    }
   
    drawSprites();
  }

  end(){
    console.log("Game Ended");
    console.log(player.rank);
  }
}
