'use strict';

const Hapi = require('@hapi/hapi');
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

    require('./routes/index')(server);
    require('./pages/pages')(server);

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
});

init();