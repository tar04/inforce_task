import Joi from "joi";

export const productValidator = Joi.object({
    name: Joi.string().regex(/^[a-zA-ZА-яёЁыЫіІєЄїЇ ]{1,20}$/).required().messages({
        'string.pattern.base': 'You can use only letters, 1-20 symbols'
    }),
    count: Joi.number().min(1).max(100000).required().messages({
        'count.min': 'Count cannot be lower than 1 piece',
        'count.max': 'Count must be lower than 100000 pieces',
        'count.required': 'Count required'
    }),
    height: Joi.number().min(1).max(1000).required().messages({
        'height.min': 'Height cannot be lower than 1 centimeter',
        'height.max': 'Height must be lower than 1000 centimetres',
        'height.required': 'Height required'
    }),
    width: Joi.number().min(1).max(1000).required().messages({
        'width.min': 'Width cannot be lower than 1 centimeter',
        'width.max': 'Width must be lower than 1000 centimetres',
        'width.required': 'Width required'
    }),
    weight: Joi.number().min(1).max(100000).required().messages({
        'weight.min': 'Weight cannot be lower than 1 gram',
        'weight.max': 'Weight must be lower than 100000g gram',
        'weight.required': 'Weight required'
    }),
    image: Joi.any(),
});