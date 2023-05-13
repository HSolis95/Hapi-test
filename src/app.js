'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const path = require('path');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: path.join(__dirname, 'public')
            }
        }
    });

    await server.register(require('@hapi/inert'));
    await server.register(require('@hapi/vision'));
    // await server.register({
    //     plugin: require('hapi-mongodb'),
    //     options: {
    //       uri: 'mongodb://localhost:27017/LaFruteria',
    //       settings : {
    //         useUnifiedTopology: true,
    //       },
    //       decorate: true
    //     }
    // });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'templates',
        isCached: process.env.NODE_ENV === 'production'
    });

    server.route({
        method: 'GET',
        path: '/pages/index',
        handler: function (request, h) {

            return h.view('index');
        }
    });

    server.route({
        method: 'GET',
        path: '/pages/fruits',
        handler: function (request, h) {
            const fruits = ["apple 🍎", "banana 🍌", "pineapple 🍍", "orange 🍊"];
            return h.view('fruits', {
                fruits
            });
        }
    });

    server.route({
        method: 'GET',
        path: '/fruits.jpg',
        handler: function (request, h) {

            return h.file('fruits.jpg');
        }
    });

    server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
            return 'Hello World!';
        }
    });

    server.route({
        path: '/fruit',
        method: 'GET',
        handler: (request, h) => {
            const fruits = ["apple 🍎", "banana 🍌", "pineapple 🍍", "orange 🍊"];
            return fruits;
        }
    })

    server.route({
        path: '/fruit/{id}',
        method: 'GET',
        handler: (request, h) => {
            let index = request.params.id;
            const fruits = ["apple 🍎", "banana 🍌", "pineapple 🍍", "orange 🍊"];
            return fruits[index - 1];
        },
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).less(5)
                })
            }
        }
    })

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();