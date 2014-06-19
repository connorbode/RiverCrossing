var helpers = {
  randomBool: function () {
    return Math.random() > 0.5;
  },
  randomConfig: function () {
    return new Game({
      "fox": helpers.randomBool(),
      "goose": helpers.randomBool(),
      "beans": helpers.randomBool(),
      "farmer": helpers.randomBool()
    });
  },

};

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

    it('fails if trying to cross with an invalid item', function () {
      var game = new Game();
      expect(game.cross([])).toEqual(false);
      expect(game.cross('invalid')).toEqual(false);
      expect(game.cross({})).toEqual(false);
    });
  });

  describe('isValid()', function () {
    var invalid_configs = [
      { fox: true, goose: true, beans: true, farmer: false },
      { fox: true, goose: true, beans: false, farmer: false },
      { fox: false, goose: true, beans: true, farmer: false },
      { fox: false, goose: false, beans: false, farmer: true },
      { fox: false, goose: false, beans: true, farmer: true },
      { fox: true, goose: false, beans: false, farmer: true }
    ];

    it('returns false if state is invalid', function () {
      _.each(invalid_configs, function (invalid_config) {
        expect(new Game(invalid_config).isValid()).toEqual(false);
      });
    });

    it('returns true if state is valid', function () {
      _.times(10, function () {
        var config = helpers.randomConfig();

        // generate random valid config 
        while(_.find(invalid_configs, function (conf) { return config.equals(conf); })) {
          config = helpers.randomConfig();
        }

        expect(config.isValid()).toEqual(true);
      });
    });
  });

  describe('equals()', function () {
    it('returns true if two games are equal', function () {
      _.times(10, function () {
        var first = helpers.randomConfig();
        var second = new Game({
          "fox": first.fox,
          "goose": first.goose,
          "beans": first.beans,
          "farmer": first.farmer
        });
        expect(first.equals(second)).toEqual(true);
        expect(second.equals(first)).toEqual(true);
      });
    });

    it('returns false if two games are not equal', function () {
      _.times(10, function () {
        var changed = false;
        var first = helpers.randomConfig();
        var second = new Game({
          "fox": first.fox,
          "goose": first.goose,
          "beans": first.beans,
          "farmer": first.farmer
        });

        // change properties at random.  if no properties are changed, repeat
        while( ! changed) {
          _.each(["fox", "goose", "beans", "farmer"], function (prop) {
            if(Math.random() > 0.5) {
              second[prop] = ! second[prop];
              changed = true;
            }
          });
        }

        expect(first.equals(second)).toEqual(false);
        expect(second.equals(first)).toEqual(false);
      });
    });
  });

  describe('clone()', function () {
    it('creates an identical game', function () {
      _.times(10, function () {
        var first = helpers.randomConfig();
        var second = first.clone();
        _.forEach(["fox", "goose", "beans", "farmer"], function (prop) {
          expect(first[prop]).toEqual(second[prop]);
        });
      });
    });
  });
});