const CatchAsync = (fn) => (req, res, next) => {
    return Promise.resolve(fn(req, res, next))
        .catch((e) => {
            console.log("Promise can be caught");
            next(e); // pass the error to the next middleware
        });
};

module.exports = CatchAsync;
