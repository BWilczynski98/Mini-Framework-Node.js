export function jsonBodyParser(req, res, next) {
    if (req.headers['content-type'] !== 'application/json') {
         return next(new Error('the body must be passed in JSON format'));
    }

    let body = '';

    req.on('data', chunk => body += chunk.toString());
    req.on('end', () => {
        try {
            req.body = JSON.parse(body);
            next()
        } catch (error) {
            next(error);
        }
    });

    req.on('error', (err) => next(err))
}

