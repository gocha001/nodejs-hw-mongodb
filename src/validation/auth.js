// src/validation/auth.js

import Joi from 'joi';

export const registerUserSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    'string.base': 'Name should be a string',
    'string.min': 'Name should have at least {#limit} characters',
    'string.max': 'Name should have at most {#limit} characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().min(3).max(20).required().messages({
    'string.email': 'Email must be valid',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(3).max(9).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is required',
  }),
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email().min(3).max(20).required().messages({
    'string.email': 'Email must be valid',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(3).max(9).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is required',
  }),
});

export const sendResetEmailSchema = Joi.object({
  email: Joi.string().email().min(3).max(20).required().messages({
    'string.email': 'Email must be valid',
    'string.min': 'Email should have at least {#limit} characters',
    'string.max': 'Email should have at most {#limit} characters',
    'any.required': 'Email is required',
  }),
});

export const resetPasswordSchema = Joi.object({
  password: Joi.string().min(3).max(9).required().messages({
    'string.base': 'Password should be a string',
    'string.min': 'Password should have at least {#limit} characters',
    'string.max': 'Password should have at most {#limit} characters',
    'any.required': 'Password is required',
  }),
  token: Joi.string().required(),
});
