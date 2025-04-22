import {errorHandler} from "./errorHandler.js";

export function runMiddlewareStack(stack, req, res) {
    let i = 0;

    function next(err) {

        if (err) {
            return errorHandler(err, req, res)
        }

        if (i >= stack.length) return;

        const fn = stack[i++];
        try {
            Promise.resolve(fn(req, res, next)).catch(next);
        } catch (error) {
            next(error);
        }
    }

    next();
}