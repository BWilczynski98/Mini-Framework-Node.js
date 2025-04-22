import {createServer} from "node:http";
import {runMiddlewareStack} from "./middleware/runner.js";

export class App {
    constructor(props) {
        this.routes = {
            GET: [],
            POST: [],
            PUT: [],
            PATCH: [],
            DELETE: [],
        };

        this.middlewares = [];
    }

    #addRoute(method, path, handler, middlewares = []) {
        const METHODS = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

        if (!METHODS.includes(method.toUpperCase())) {
            throw new Error(`The method passed ${method} is invalid, allowed methods are: ${METHODS}`);
        }

        this.routes[method.toUpperCase()].push({path, handler, middlewares});
    }

    get(path, handler, middlewares = []) {
        try {
            this.#addRoute('GET', path, handler, middlewares);
        } catch (e) {
            console.error(e);
        }
    }

    post(path, handler, middlewares = []) {
        try {
            this.#addRoute('POST', path, handler, middlewares);
        } catch (e) {
            console.error(e.message);
        }
    }

    put(path, handler, middlewares = []) {
        try {
            this.#addRoute('PUT', path, handler, middlewares);
        } catch (e) {
            console.error(e.message);
        }
    }

    patch(path, handler, middlewares = []) {
        try {
            this.#addRoute('PATCH', path, handler, middlewares);
        } catch (e) {
            console.error(e.message);
        }
    }

    delete(path, handler, middlewares = []) {
        try {
            this.#addRoute('DELETE', path, handler, middlewares);
        } catch (e) {
            console.error(e.message);
        }
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    listen(
        port = 3000,
        hostname = "127.0.0.1",
        callback = () => console.log(`Server running at http://${hostname}:${port}/`)) {
        createServer((req, res) => {
            const method = req.method.toUpperCase();
            const {pathname} = new URL(`http://localhost${req.url}`);

            if (!this.routes[method]) {
                res.writeHead(405, {'Content-Type': 'text/plain'}).end('Method Not Allowed');
                return;
            }

            for (const route of this.routes[method]) {
                if (route.path === pathname) {
                    const stack = [...this.middlewares, ...route.middlewares, route.handler];
                    runMiddlewareStack(stack, req, res);
                    return;
                }
            }

            res.writeHead(404, {'Content-Type': 'text/plain'}).end('Not Found');

        }).listen(port, hostname, callback);
    }
}