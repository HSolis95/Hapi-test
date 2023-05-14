
module.exports = server => {
    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => 'Hello World!'
    });

    server.route({
        method: 'GET',
        path: '/fruits.jpg',
        handler: (request, h) => h.file('fruits.jpg')
    });

    require('./pages/pages')(server);
    require('./fruits/fruits')(server);
}


