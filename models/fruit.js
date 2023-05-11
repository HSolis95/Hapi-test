'use strict';

const Joi = require('joi');
const { Model } = require('./helpers');

module.exports = class Fruit extends Model {


    static tableName = 'Fruits';


    static joiSchema = Joi.object(
        {
            id: Joi.number().integer().greater(0),
            fruit_name: Joi.string().required(),
            createdAt: Joi.date().required()
        });
};