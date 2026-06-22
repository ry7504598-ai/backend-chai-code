class ApiError extends Error {
    constructor(
        statusCode,
        massage = "Something went wrong",
        error = [],
        stack = ""
    ){
        super(massage);
        this.statusCode = statusCode;
        this.error = error
        this.data  = null;
        this.massage = massage;
        this.success = false;

        if(stack){
            this.stack = stack;
        }else{
            Error.captureStackTrace(this, this.constructor);
        }
        
    }
}

export {ApiError}