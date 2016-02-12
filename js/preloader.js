Food.Preloader = function(game) {};
Food.Preloader.prototype = {
  preload: function() {
    this.stage.backgroundColor = '#000000';
    this.preloadBar = this.add.sprite(305, 677, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);

    // load images
		this.load.image('background', 'img/thisbackground.png');
		this.load.image('floor', 'img/stand.png');
		this.load.image('monster-cover', 'img/monster-cover.png');
		this.load.image('title', 'img/stiulogo.png');
		this.load.image('game-over', 'img/gameover.png');
		this.load.image('score-bg', 'img/score.png');
		this.load.image('button-pause', 'img/pause.png');
		// load spritesheets
		//82x98 is the size of each frame
		//I change the name to food
		this.load.spritesheet('food', 'img/foodsprite.png', 82, 98);
		this.load.spritesheet('monster-idle', 'img/students-idle.png', 103, 131);
		this.load.spritesheet('button-start', 'img/btnstart.png', 401, 143);
  },
  create: function() {
    this.state.start('Mainmenu');
  }
};
