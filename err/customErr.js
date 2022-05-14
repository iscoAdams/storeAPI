class customErr extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }

}
export const createErr = (message, statusCode) => {
    return new customErr(message, statusCode);
} 

export default customErr;