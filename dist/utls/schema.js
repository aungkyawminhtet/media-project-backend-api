"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSchema = exports.tagSchema = exports.postSchema = exports.commandSchema = exports.AllSchema = exports.catSchema = void 0;
const Joi = require("joi");
exports.catSchema = {
    bodySchema: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        user: Joi.optional()
    }),
    paramSchema: Joi.object({
        id: Joi.string().regex(/^[0-9a-f-A-F]{24}$/),
        user: Joi.optional()
    }),
    imageSchema: Joi.object({
        image: Joi.string().required(),
        name: Joi.string().required(),
    }),
};
exports.AllSchema = {
    idSchema: Joi.object({
        id: Joi.string().regex(/^[0-9a-f-A-F]{24}$/),
        user: Joi.optional(),
    }),
    pageSchema: Joi.object({
        page: Joi.number().required()
    })
};
exports.commandSchema = {
    bodySchema: Joi.object({
        user: Joi.optional(),
        post: Joi.optional(),
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        context: Joi.string().required(),
    })
};
exports.postSchema = {
    bodySchema: Joi.object({
        cat: Joi.string().regex(/^[0-9a-f-A-F]{24}$/),
        tag: Joi.string().regex(/^[0-9a-f-A-F]{24}$/),
        image: Joi.string().required(),
        name: Joi.string().required(),
        desc: Joi.string().required(),
        title: Joi.string().required(),
        user: Joi.optional()
    }),
};
exports.tagSchema = {
    bodySchema: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().required(),
        user: Joi.optional()
    })
};
exports.userSchema = {
    bodySchema: Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        phone: Joi.string().required().min(9).max(11),
        password: Joi.string().required().min(8).max(16),
    }),
    loginSchema: Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().required().min(8).max(16),
    }),
};
