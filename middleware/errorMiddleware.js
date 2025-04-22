export function errorMiddleware(req, res, next) {
    throw new Error('Błąd synchroniczny');
}