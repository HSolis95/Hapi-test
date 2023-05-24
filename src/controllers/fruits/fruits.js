module.exports = class Fruits {
    
    static GetFruits(request, h) {
        const fruits = ["apple 🍎", "banana 🍌", "pineapple 🍍", "orange 🍊"];
        return fruits;
    }

    static GetFruit(request, h) {
        let index = request.params.id;
        const fruits = ["apple 🍎", "banana 🍌", "pineapple 🍍", "orange 🍊"];
        return fruits[index - 1];
    }
}