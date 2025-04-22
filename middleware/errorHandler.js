export function errorHandler(err, req, res) {
    console.error("Caught error:", err);
    res.writeHead(500, {'Content-Type': 'text/plain'}).end('Internal Server Error');
}