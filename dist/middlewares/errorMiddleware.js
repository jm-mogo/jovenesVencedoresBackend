const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: "Internal Server Error",
        error: err.message,
    });
};
export default errorMiddleware;
//# sourceMappingURL=errorMiddleware.js.map