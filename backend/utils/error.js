// Create an error handler for unexpected errors, eg. password's length too short
// Where it's not a server error, but it's not meeting the requirement for the password
export const errorHandler = (statusCode, message)=> {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;

}