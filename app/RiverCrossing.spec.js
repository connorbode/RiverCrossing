describe('Game', function () {
  describe('cross()', function () {
    it('crosses the river with the right item', function () {
      var game = new Game();
      expect(game.cross('fox')).toEqual(true);
      expect(game.fox).toEqual(true);
      expect(game.farmer).toEqual(true);
      expect(game.goose).toEqual(false);
      expect(game.beans).toEqual(false);

      expect(game.cross(null)).toEqual(true);
      expect(game.fox).toEqual(true);
      expect(game.farmer).toEqual(false);
      expect(game.goose).toEqual(false);
      expect(game.beans).toEqual(false);

      expect(game.cross('goose')).toEqual(true);
      expect(game.fox).toEqual(true);
      expect(game.goose).toEqual(true);
      expect(game.farmer).toEqual(true);
      expect(game.beans).toEqual(false);

      expect(game.cross(null)).toEqual(true);
      expect(game.cross('beans')).toEqual(true);
      expect(game.fox).toEqual(true);
      expect(game.goose).toEqual(true);
      expect(game.farmer).toEqual(true);
      expect(game.beans).toEqual(true);
    });

    it('wont cross if the farmer is not on the same side as the item', function () {
      var game = new Game();
      game.cross(null);
      expect(game.cross('fox')).toEqual(false);
      expect(game.cross('goose')).toEqual(false);
      expect(game.cross('beans')).toEqual(false);
      expect(game.fox).toEqual(false);
      expect(game.farmer).toEqual(true);
      expect(game.goose).toEqual(false);
      expect(game.beans).toEqual(false);
    });
  });

  describe('knows which states are invalid', function () {
    var invalid_configs = [
      { fox: true, goose: true, beans: true, farmer: false },
      { fox: true, goose: true, beans: false, farmer: false },
      { fox: true, goose: false, beans: true, farmer: false },
      { fox: false, goose: true, beans: true, farmer: false },
      { fox: false, goose: false, beans: false, farmer: true },
      { fox: false, goose: false, beans: true, farmer: true },
      { fox: true, goose: false, beans: false, farmer: true },
      { fox: false, goose: true, beans: false, beans: true }
    ];

    _.each(invalid_configs, function (invalid_config) {
      expect(new Game(invalid_config).isValid()).toEqual(false);
    });
  });
});