var Drink = function() {
    this.ingredients = undefined;
};

var WodkaLemon = function() {
    this.ingredients = "Wodka and Lemon";
};

WodkaLemon.prototype = new Drink();

var CampariOrange = function() {
    this.ingredients = "Campari and Orange";
};

CampariOrange.prototype = new Drink();

var CubaLibre = function() {
    this.ingredients = "Cola and Rum";
};
CubaLibre.prototype = new Drink();

var menu = {
    wodkaLemon: {
        price: 4.50,
        size: '4cl',
        name: "Wodka Lemon"
    },
    campariOrange: {
        price: 4.50,
        size: '4cl',
        name: "Campari Orange"
    },
    cubaLibre: {
        price: 5.00,
        size: '4cl',
        name: "Cuba Libre"
    }
};

// =====> already tested: Order
var Order = function() {
	this.items = [];
	this.add = function(drink) {
		this.items.push(drink);
	};
};

// ======> hmm, to be implemented: barkeeper
var barkeeper = {
    accept : function(order) {
        throw "not implemented yet";
    }
};



