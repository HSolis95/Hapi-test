'use strict';

const Hapi = require('@hapi/hapi');
const Joi = require('joi')

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
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
            const fruits = ["apple", "banana", "pineapple", "orange"];
            return fruits;
        }
    })

    server.route({
        path: '/fruit/{id}',
        method: 'GET',
        handler: (request, h) => {
            let index = request.params.id;
            const fruits = ["apple", "banana", "pineapple", "orange"];
            return fruits.find(index - 1);
        },
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0)
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