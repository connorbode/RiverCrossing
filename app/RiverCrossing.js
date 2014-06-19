/**

Built to solve the following riddle: 

Once upon a time a farmer went to the market and purchased a fox, a goose, and a bag of beans. 
On his way home, the farmer came to the bank of a river and rented a boat. 
But in crossing the river by boat, the farmer could carry only himself and a single one of his purchases 
	- the fox, the goose, or the bag of the beans.

If left alone, the fox would eat the goose, and the goose would eat the beans. 
The farmer’s challenge was to carry himself and his purchases to the far bank of the river, leaving each purchase intact.

**/

function Game (params) {

	// initial configuration
	// false implies that x has not crossed the river
	if(params === undefined) {
		params = {
			farmer: false,
			fox: false,
			goose: false,
			beans: false
		};
	}

	this.farmer = params.farmer;
	this.fox = params.fox;
	this.goose = params.goose;
	this.beans = params.beans;

	this.trace = [];


	// cross the river with one of the items
	// returns false on failure, true on success
	this.cross = function (bring) {

		// is the item "bring" a valid item to bring?
		if(bring !== 'fox' && bring !== 'goose' && bring !== 'beans' && bring !== null) {
			return false;
		}

		// are the farmer and the item "bring" on the same side of the river?
		// they can't cross together if they are not
		if(this.farmer !== this[bring] && bring !== null) {
			return false;
		}

		// cross the river
		this.farmer = ! this.farmer;
		this[bring] = ! this[bring];

		this.trace.push(bring);

		return true;
	};

	// checks to see whether the game is in a valid state
	this.isValid = function () {
		var i;
		var invalid_state;
		var key;
		var match;

		for(i = 0; i < Game.prototype.invalid_states.length; i++) {

			match = true;
			invalid_state = Game.prototype.invalid_states[i];

			for(key in invalid_state) {
				if(this[key] !== invalid_state[key]) {
					match = false;
					break;
				}
			}

			if(match) {
				return false;
			}
		}

		return true;
	};

	// clones the game
	this.clone = function () {
		return new Game({
			farmer: this.farmer,
			fox: this.fox,
			goose: this.goose,
			beans: this.beans
		});
	};

  // whether this game is equal to anotehr game
  this.equals = function (other) {
    return this.fox === other.fox && this.goose === other.goose && this.beans === other.beans && this.farmer === other.farmer;
  };

	// checks if the game is in a final state
	this.isFinal = function () {
		if(this.farmer === true 
			&& this.fox === true 
			&& this.goose === true 
			&& this.beans === true) {
			return true;
		}
		return false;
	};

}

Game.prototype.invalid_states = [
	{
		farmer: false,
		fox: true,
		goose: true,
		beans: true
	},
	{
		farmer: false,
		fox: true,
		goose: true,
		beans: false
	},
	{
		farmer: false,
		fox: false,
		goose: true,
		beans: true
	},
	{
		farmer: true,
		fox: false,
		goose: false,
		beans: false
	},
	{
		farmer: true,
		fox: false,
		goose: false,
		beans: true
	},
	{
		farmer: true,
		fox: true,
		goose: false,
		beans: false
	}
];
