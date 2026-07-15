const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    username: z.string().min(3, 'Username must be at least 3 characters long'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
    role: z.enum(['Customer', 'Driver', 'Admin']).optional(),
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
  })
});

const binSchema = z.object({
  body: z.object({
    location: z.string().min(1, 'Location is required'),
    area: z.string().min(1, 'Area is required'),
    lat: z.number(),
    lng: z.number(),
    fillLevel: z.number().min(0).max(100).optional(),
    status: z.enum(['Empty', 'Half Full', 'Full']).optional(),
  })
});

module.exports = {
  registerSchema,
  loginSchema,
  binSchema
};
