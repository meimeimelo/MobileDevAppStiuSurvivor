Food.Mainmenu = function(game) {};
Food.Mainmenu.prototype = {
    create: function() {
      this.add.sprite(0, 0, 'background');
      //this.add.sprite(-130, 446, 'monster-cover');
      this.add.sprite(122.5, 60, 'title');
      this.add.button(122.5, 807, 'button-start', this.startGame, this, 1, 0, 2);
    },
    startGame: function() {
      this.state.start('Game');
    }
};
