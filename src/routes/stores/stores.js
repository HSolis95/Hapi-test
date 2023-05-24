const Joi = require('joi');
module.exports = server => {

    server.route({
        path: '/fruit',
        method: 'GET',
        handler: FruitController.GetFruits
    });

    server.route({
        path: '/fruit/{id}',
        method: 'GET',
        handler: FruitController.GetFruit,
        options: {
            validate: {
                params: Joi.object({
                    id: Joi.number().integer().greater(0).less(5)
                })
            }
        }
    });
}