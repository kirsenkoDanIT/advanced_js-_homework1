'use strict'


function Hamburger(size, stuffing) {


    try {
        if (!arguments['0']) {
            throw new HamburgerException('no size given');
        }

        if (size.category !== 'size') {
            var sizeError = size.name || arguments['0']
            throw new HamburgerException('invalid size ' + sizeError);
        }

        if (!arguments['1']) {
            throw new HamburgerException('no stuffing given');
        }

        if (stuffing.category !== 'stuffing') {
            var stuffingError = stuffing.name || arguments['1']
            throw new HamburgerException('invalid stuffing ' + stuffingError);
        }
    } catch (e) {
        console.log(e.name, e.message);
    }

    this.size = size;
    this.stuffing = stuffing;
    this.toppings = [];

}

Hamburger.SIZE_SMALL = {
    price: 50,
    calories: 20,
    category: 'size',
    name: 'SIZE_SMALL',
}
Hamburger.SIZE_LARGE = {
    price: 100,
    calories: 40,
    category: 'size',
    name: 'SIZE_LARGE',
}

// начинки
Hamburger.STUFFING_CHEESE = {
    price: 10,
    calories: 20,
    category: 'stuffing',
    name: 'STUFFING_CHEESE',
}
Hamburger.STUFFING_SALAD = {
    price: 20,
    calories: 5,
    category: 'stuffing',
    name: 'STUFFING_SALAD',
}
Hamburger.STUFFING_POTATO = {
    price: 15,
    calories: 10,
    category: 'stuffing',
    name: 'STUFFING_POTATO',
}

// топпинги

Hamburger.TOPPING_MAYO = {
    price: 20,
    calories: 5,
    category: 'topping',
    name: 'TOPPING_MAYO',
}
Hamburger.TOPPING_SPICE = {
    price: 15,
    calories: 0,
    category: 'topping',
    name: 'TOPPING_SPICE',
}

// методы

Hamburger.prototype.getSize = function () {
    return this.size;
}
Hamburger.prototype.getStuffing = function () {
    return this.stuffing;
}

Hamburger.prototype.calculatePrice = function () {

    try {
        if (!this.size || !this.stuffing || this.size.category !== 'size' || this.stuffing.category !== 'stuffing') {
            throw new HamburgerException('nothing to calc, invalid size/stuffing');
        }

    } catch (e) {
        console.log(e.name, e.message);
    }

    var totalToppinsPrice = this.toppings.reduce(function (acc, item) {
        return acc + item.price
    }, 0) || 0;

    if (this.size && this.stuffing) {
        this.price = this.size.price + this.stuffing.price + totalToppinsPrice;
    }

    if (!this.price) {
        this.price = 0;
    }

    return this.price;
}

Hamburger.prototype.calculateCalories = function () {

    try {
        if (!this.size || !this.stuffing || this.size.category !== 'size' || this.stuffing.category !== 'stuffing') {
            throw new HamburgerException('nothing to calc, invalid size/stuffing');
        }

    } catch (e) {
        console.log(e.name, e.message);
    }

    var totalToppinsCalories = this.toppings.reduce(function (acc, item) {
        return acc + item.calories
    }, 0) || 0;

    if (this.size && this.stuffing) {
        this.calories = this.size.calories + this.stuffing.calories + totalToppinsCalories;
    }

    if (!this.calories) {
        this.calories = 0;
    }

    return this.calories;

}

Hamburger.prototype.addTopping = function (topping) {
    try {
        if (!this.size || !this.stuffing) {
            throw new HamburgerException('can not add topping, no size/stuffing given');
        } else
        if (!topping || topping.category !== 'topping') {
            throw new HamburgerException('invalid topping!');
        } else
        if (this.toppings.includes(topping)) {
            throw new HamburgerException('duplicate topping ' + topping.name);
        } else this.toppings.push(topping)
    } catch (e) {
        console.log(e.name, e.message);
    }
}

Hamburger.prototype.removeTopping = function (topping) {

    try {
        if (!this.size || !this.stuffing) {
            throw new HamburgerException('can not remove topping, no size/stuffing given');
        }
        if (!topping || topping.category !== 'topping') {
            throw new HamburgerException('invalid topping!');
        }
        if (!this.toppings.includes(topping)) {
            throw new HamburgerException('Can not remove a non-existent topping ' + topping.name);
        };
    } catch (e) {
        console.log(e.name, e.message);
    }

    this.toppings = this.toppings.filter(function (item) {
        return item !== topping
    });

}

Hamburger.prototype.getToppings = function () {
    return this.toppings
}

function HamburgerException(message) {
    this.message = message;
    this.name = 'HamburgerException: ';
}




// маленький гамбургер с начинкой из сыра
var hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
// console.log("Calories: %f", hamburger.calculateCalories());
// console.log("Price: %f", hamburger.calculatePrice());
// var hamburger = new Hamburger();
// добавка из майонеза
hamburger.addTopping(Hamburger.TOPPING_MAYO);
// hamburger.addTopping(Hamburger.TOPPING_MAYO);
// hamburger.removeTopping(Hamburger.TOPPING_MAYO);
hamburger.addTopping(1);
hamburger.addTopping();
hamburger.addTopping(Hamburger.STUFFING_POTATO);
// hamburger.removeTopping(Hamburger.STUFFING_POTATO);
// спросим сколько там калорий
console.log("Calories: %f", hamburger.calculateCalories());
// сколько стоит
console.log("Price: %f", hamburger.calculatePrice());
// я тут передумал и решил добавить еще приправу
hamburger.addTopping(Hamburger.TOPPING_SPICE);
// А сколько теперь стоит? 
console.log("Price with sauce: %f", hamburger.calculatePrice());
// Проверить, большой ли гамбургер? 
console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE);
// console.log("Is hamburger small: %s", hamburger.getSize() === Hamburger.SIZE_SMALL);
console.log("Is stuffing potato: %s", hamburger.getStuffing() === Hamburger.STUFFING_POTATO);

// Убрать добавку
hamburger.removeTopping(Hamburger.TOPPING_SPICE);
console.log("Have %d toppings", hamburger.getToppings().length);



// не передали обязательные параметры
// var h2 = new Hamburger(); // => HamburgerException: no size given

// передаем некорректные значения, добавку вместо размера
// var h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
// => HamburgerException: invalid size 'TOPPING_SAUCE'

// добавляем много добавок
// var h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
// h4.removeTopping(Hamburger.TOPPING_MAYO);
// h4.addTopping(Hamburger.TOPPING_MAYO);
// h4.addTopping(Hamburger.TOPPING_MAYO);
// HamburgerException: duplicate topping 'TOPPING_MAYO'