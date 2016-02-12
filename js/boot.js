var Food = {
  scoreText: null,
  score: 0,
  health: 0
};
Food.Boot = function(game) {};
Food.Boot.prototype = {
  preload: function() {
    this.load.image('preloaderBar', 'img/loading-bar.png');
  },
  create: function() {
    this.input.maxPointer = 1;
    this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    this.scale.pageAlignHorizontally = true;
    this.scale.pageAlignVertically = true;
    this.scale.setScreenSize = true;
    this.state.start('Preloader');
  }
};
