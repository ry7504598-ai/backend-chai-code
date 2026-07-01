class ApiResoponse{
    constructor(
        statusCode,data,massage = "Success" , success = true
    ){
        this.statusCode = statusCode;
        this.data = data;
        this.massage = massage;
        this.success = statusCode<400 ;
    }
}

export {ApiResoponse}