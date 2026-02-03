import { z } from 'zod';
import { insertPostSchema, insertScoutProfileSchema } from './schema.js';
// Shared error schemas
export const errorSchemas = {
    validation: z.object({
        message: z.string(),
        field: z.string().optional(),
    }),
    notFound: z.object({
        message: z.string(),
    }),
    internal: z.object({
        message: z.string(),
    }),
};
// Combined schema for creating a post with an optional scout profile
export const createPostWithProfileSchema = insertPostSchema.extend({
    scoutProfile: insertScoutProfileSchema.omit({ postId: true }).optional()
});
export const api = {
    posts: {
        list: {
            method: 'GET',
            path: '/api/posts',
            input: z.object({
                category: z.string().optional(),
            }).optional(),
            responses: {
                200: z.array(z.custom()),
            },
        },
        get: {
            method: 'GET',
            path: '/api/posts/:slug',
            responses: {
                200: z.custom(),
                404: errorSchemas.notFound,
            },
        },
        getById: {
            method: 'GET',
            path: '/api/posts/id/:id',
            responses: {
                200: z.custom(),
                404: errorSchemas.notFound,
            },
        },
        create: {
            method: 'POST',
            path: '/api/posts',
            input: createPostWithProfileSchema,
            responses: {
                201: z.custom(),
                400: errorSchemas.validation,
            },
        },
        update: {
            method: 'PUT',
            path: '/api/posts/:id',
            input: createPostWithProfileSchema.partial(),
            responses: {
                200: z.custom(),
                404: errorSchemas.notFound,
                400: errorSchemas.validation,
            },
        },
        delete: {
            method: 'DELETE',
            path: '/api/posts/:id',
            responses: {
                200: z.object({ success: z.boolean() }),
                404: errorSchemas.notFound,
            },
        },
    },
};
export function buildUrl(path, params) {
    let url = path;
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            if (url.includes(`:${key}`)) {
                url = url.replace(`:${key}`, String(value));
            }
        });
    }
    return url;
}
