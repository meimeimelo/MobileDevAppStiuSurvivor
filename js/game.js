Food.Game = function(game){
  // define needed variables for Food.Game
  this._player = null;
  this._itemGroup = null;
  this._spawnFoodTimer = 0;
  this._fontStyle = null;
};
Food.Game.prototype = {
  create: function(){
    // start the physics engine
    this.physics.startSystem(Phaser.Physics.ARCADE);
		// set the global gravity
    this.physics.arcade.gravity.y = 200;
		// display images: background, floor and score
    this.add.sprite(0, 0, 'background');
    this.add.sprite(-30, 800, 'floor');
    this.add.sprite(10, 5, 'score-bg');
		// add pause button
    this.add.button(534, 5, 'button-pause', this.managePause, this);
		// create the player
    this._player = this.add.sprite(5, 760, 'monster-idle');
		// add player animation
    //play 10 frames per sec
    this._player.animations.add('idle', [0,1,2,3,4,5,6,7,8,9,10,11,12], 10, true);
		// play the animation
    this._player.animations.play('idle');
		// set font style
    this._fontStyle = {
      font: '40px Arial',
      fill: '#FFCC00',
      stroke: '#333',
      strokeThickness: 5,
      align: 'center'
    };
		// initialize the spawn timer
    this._spawnFoodTimer = 0;
		// initialize the score text with 0
    Food.scoreText = this.add.text(150, 15, '0', this._fontStyle);
		// set health of the player
    Food.health = 10;
		// create new group for item
		this._itemGroup = this.add.group();
		// spawn first item
		Food.item.spawnFood(this);
  },

  managePause: function(){
    // pause the game
    this.game.paused = true;
    // add proper informational text
    var pausedText = this.add.text(100, 250, 'Game paused.\nTap anywhere to continue.', this._fontStyle);
    // set event listener for the user's click/tap the screen
    this.input.onDown.add(function(){
      // remove the pause text
      pausedText.destroy();
      // unpause the game
      this.game.paused = false;
    }, this);
  },

  update: function(){
    // update timer every frame
    this._spawnFoodTimer += this.time.elapsed;
    // if spawn timer reach one second (1000 miliseconds)
    if(this._spawnFoodTimer > 1000) {
      // reset it
      this._spawnFoodTimer = 0;
      // and spawn new item
      Food.item.spawnFood(this);
    }
    // loop through all items on the screen
    this._itemGroup.forEach(function(item){
      // to rotate them accordingly
      item.angle += item.rotateMe;
    });
    // if the health of the player drops to 0, the player dies = game over
    if(!Food.health) {
      // show the game over message
      this.add.sprite(23, 344.5, 'game-over');
      // pause the game
      this.game.paused = true;
      this.input.onDown.add(function(){
        // unpause the game
        this.game.paused = false;
        Food.score = 0;
        this.state.start('Mainmenu')
      }, this);
    }
  }
};

Food.item = {
  spawnFood: function(game){
		// calculate drop position (from 0 to game width) on the x axis
    var dropPos = Math.floor(Math.random() * game.world.width);
		// define the offset for every food item
    var dropOffset = [-27,-36,-36,-38,-48];
		// randomize food type
    var itemType = Math.floor(Math.random() * 5);
		// create new food item
    var item = game.add.sprite(dropPos, dropOffset[itemType], 'food');
		// add new animation frame
    item.animations.add('anim', [itemType], 10, true);
		// play the newly created animation
    item.animations.play('anim');
		// enable food body for physic engine
    game.physics.enable(item, Phaser.Physics.ARCADE);
		// enable food to be clicked/tapped
    item.inputEnabled = true;
		// add event listener to click/tap
    item.events.onInputDown.add(this.clickItem, this);
		// be sure that the item will fire an event when it goes out of the screen
    item.checkWorldBounds = true;
		// reset item when it goes out of screen
    item.events.onOutOfBounds.add(this.removeItem, this);
		// set the anchor (for rotation, position etc) to the middle of the item
    item.anchor.setTo(0.5, 0.5);
		// set the random rotation value
    item.rotateMe = (Math.random() * 4) - 2;
		// add item to the group
    game._itemGroup.add(item);
	},
	clickItem: function(item){
		// kill the item when it's clicked
		item.kill();
		// add points to the score
		Food.score += 1;
		// update score text
		Food.scoreText.setText(Food.score);
	},
	removeItem: function(item){
		// kill the item
		item.kill();
		// decrease player's health
		Food.health -= 10;
	}
};
