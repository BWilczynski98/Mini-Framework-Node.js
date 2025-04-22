export function logger(req, res, next) {
    console.log("This is logger middleware");
    next();
}