const errorResponse = (res, statusCode, errorMessage) => res.status(statusCode).json({
    statusCode,
    errorMessage
});

module.exports = { errorResponse }