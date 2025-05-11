import { Router as ExpressRouter } from 'express'
import { type RequestHandler } from 'express'

declare module "express-serve-static-core" {
    interface Router {
        resource(path: string, controller: any): this
    }
}

export class Router {
    private router: ExpressRouter

    /**
     * Initialize Express Router instance
     */
    constructor() {
        this.router = ExpressRouter()
    }

    /**
     * Return the router instance
     */
    public init() {
        return this.router
    }

    /**
     * Handle GET requests
     * @param path - Route path
     * @param callback - Route handler function
     */
    public get(path: string, callback: RequestHandler) {
        this.router.get(path, callback)
    }

    /**
     * Handle POST requests
     * @param path - Route path  
     * @param callback - Route handler function
     */
    public post(path: string, callback: RequestHandler) {
        this.router.post(path, callback)
    }

    /**
     * Handle PUT requests
     * @param path - Route path
     * @param callback - Route handler function
     */
    public put(path: string, callback: RequestHandler) {
        this.router.put(path, callback)
    }

    /**
     * Handle PATCH requests
     * @param path - Route path
     * @param callback - Route handler function
     */
    public patch(path: string, callback: RequestHandler) {
        this.router.patch(path, callback)
    }

    /**
     * Handle DELETE requests
     * @param path - Route path
     * @param callback - Route handler function
     */
    public delete(path: string, callback: RequestHandler) {
        this.router.delete(path, callback)
    }

    /**
     * Handle OPTIONS requests
     * @param path - Route path
     * @param callback - Route handler function
     */
    public options(path: string, callback: RequestHandler) {
        this.router.options(path, callback)
    }

    /**
     * Handle HEAD requests
     * @param path - Route path
     * @param callback - Route handler function
     */
    public head(path: string, callback: RequestHandler) {
        this.router.head(path, callback)
    }

    /**
     * Create RESTful resource routes for a controller
     * @param path - Base resource path
     * @param controller - Controller class with route handlers
     */
    public resource(path: string, controller: any) {
        // List of HTTP methods to handle
        let methods = ['get', 'post', 'put', 'patch', 'delete', 'options', 'head']

        // Create routes for each method
        methods.forEach(method => {
            // Check if controller implements this method
            if (method in controller) {
                // Combine all middleware and route handlers
                let handlers = [controller[method]].flat().filter(Boolean);

                // Register the route
                (this.router as any)[method].apply(this.router, [path, ...handlers])
            }
        })
    }
}