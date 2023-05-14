module.exports = server => {
    server.route({
        method: 'GET',
        path: '/pages/index',
        handler: (request, h) => h.view('index')
    });

    server.route({
        method: 'GET',
        path: '/pages/fruits',
        handler: function (request, h) {
            const fruits = ["apple 🍎", "banana 🍌", "pineapple 🍍", "orange 🍊"];
            return h.view('fruits', { fruits });
        }
    });
}