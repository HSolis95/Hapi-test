const StoresController = require('../../controllers/stores/stores');
const Joi = require('joi');
module.exports = server => {

    server.route({
        path: '/fruit',
        method: 'GET',
        handler: StoresController.GetStores
    });

    server.route({
        path: '/fruit/{id}',
        method: 'GET',
        handler: StoresController.GetStore,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).less(5)
                })
            }
        }
    });
}