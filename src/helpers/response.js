const successResponse = (res, status, data) => {
    res.status(status).json({
        data,
        err: null
    });
};

const errorResponse = (res, status, err) => {
    res.status(status).json({
        err
    });
};


module.exports = {
    successResponse,
    errorResponse
};
