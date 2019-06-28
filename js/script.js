'use strict'


function Hamburger(size, stuffing) {
    if (!arguments['0']) {
        throw new HamburgerException('no size given');
    }

    if (size.category !== 'size') {
        throw new HamburgerException('invalid size ' + size.name);
    }

    if (!arguments['1']) {
        throw new HamburgerException('no stuffing given');
    }

    if (stuffing.category !== 'stuffing') {
        throw new HamburgerException('invalid stuffing ' + stuffing.name);
    }

    this.size = size
    this.stuffing = stuffing
    this.toppings = []
}

Hamburger.SIZE_SMALL = {
    price: 50,
    calories: 20,
    category: 'size',
    name: 'SIZE_SMALL'
}
Hamburger.SIZE_LARGE = {
    price: 100,
    calories: 40,
    category: 'size',
    name: 'SIZE_LARGE'
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
    return this.size
}
Hamburger.prototype.getStuffing = function (){
    return this.stuffing
}

Hamburger.prototype.calculatePrice = function () {
    if (this.toppings.length) {
        var totalToppinsPrice = this.toppings.reduce(function (acc, item) {
            return acc + item.price
        }, 0)
        this.price = this.size.price + this.stuffing.price + totalToppinsPrice
    } else this.price = this.size.price + this.stuffing.price
    return this.price;
}

Hamburger.prototype.calculateCalories = function () {
    if (this.toppings.length) {
        var totalToppinsCalories = this.toppings.reduce(function (acc, item) {
            return acc + item.calories
        }, 0)
        this.calories = this.size.calories + this.stuffing.calories + totalToppinsCalories
    } else this.calories = this.size.calories + this.stuffing.calories
    return this.calories;
}

Hamburger.prototype.addTopping = function (topping) {

    if (!this.toppings.includes(topping)) {
        this.toppings.push(topping)
    } else throw new HamburgerException('duplicate topping ' + topping.name);
}

Hamburger.prototype.removeTopping = function (topping) {

    if (this.toppings.includes(topping)) {
        this.toppings = this.toppings.filter(function (item) {
            return item !== topping
        })
    } else throw new HamburgerException('Can not remove a non-existent topping ' + topping.name);

}

Hamburger.prototype.getToppings = function () {
    return this.toppings
}

function HamburgerException(message) {
    this.message = message;
    this.name = 'HamburgerException: ';
}

try {
   /* // маленький гамбургер с начинкой из сыра
    var hamburger = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
    // var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
    // добавка из майонеза
    hamburger.addTopping(Hamburger.TOPPING_MAYO);
    // console.log("Calories: %f", hamburger.calculateCalories());
    // console.log("Price: %f", hamburger.calculatePrice());
    // hamburger.removeTopping(Hamburger.TOPPING_MAYO);
    // спросим сколько там калорий
    console.log("Calories: %f", hamburger.calculateCalories());
    // сколько стоит
    console.log("Price: %f", hamburger.calculatePrice());
    // я тут передумал и решил добавить еще приправу
    hamburger.addTopping(Hamburger.TOPPING_SPICE);
    // А сколько теперь стоит? 
    console.log("Price with sauce: %f", hamburger.calculatePrice());
    // Проверить, большой ли гамбургер? 
    console.log("Is hamburger large: %s", hamburger.getSize() === Hamburger.SIZE_LARGE); // -> false
    console.log("This size is %s", hamburger.getSize().name); // -> false
    console.log("This stuffing is %s", hamburger.getStuffing().name);
    // Убрать добавку
    hamburger.removeTopping(Hamburger.TOPPING_SPICE);
    console.log("Have %d toppings", hamburger.getToppings().length); // 1
*/
    /*
        // не передали обязательные параметры
        var h2 = new Hamburger(); // => HamburgerException: no size given

        // передаем некорректные значения, добавку вместо размера
        var h3 = new Hamburger(Hamburger.TOPPING_SPICE, Hamburger.TOPPING_SPICE);
        // => HamburgerException: invalid size 'TOPPING_SAUCE'

        // добавляем много добавок
        var h4 = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
        h4.removeTopping(Hamburger.TOPPING_MAYO);
        h4.addTopping(Hamburger.TOPPING_MAYO);
        h4.addTopping(Hamburger.TOPPING_MAYO);
        // HamburgerException: duplicate topping 'TOPPING_MAYO'
    */


} catch (e) {
    console.log(e.name, e.message);

}