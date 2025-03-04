class ApiError extends Error {
    statuscode = 500;

    constructor(statuscode, msg) {
        super(msg);
        this.message = msg;
        this.statuscode = statuscode;
    }
}

module.exports = ApiError;
