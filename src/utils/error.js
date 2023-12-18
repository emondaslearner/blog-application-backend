
const notFound = (message = 'Request Not Cound') => {
    const error = new Error(message);
    error.status = 404;
    return error;
}

const badRequest = (message = 'Bad Request') => {
    const error = new Error(message);
    error.status = 400;
    return error;
}

const serverError = (message = 'Internal Server Error') => {
    const error = new Error(message);
    error.status = 400;
    return error;
}

const authenticationError = (message = 'Authentication Failed') => {
    const error = new Error(message);
    error.status = 400;
    return error;
}

const authorizationError = (message = 'Permission Denied') => {
    const error = new Error(message);
    error.status = 400;
    return error;
}

module.exports = {
    notFound,
    badRequest,
    serverError,
    authenticationError,
    authorizationError
}