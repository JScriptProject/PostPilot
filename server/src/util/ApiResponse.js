
class ApiResponse{
    constructor(statusCode=200, data=null, message="success" )
    {
        this.statusCode=statusCode;
        this.message=message;
        this.data=data;
        this.success=statusCode < 400;
    }
} 

export {ApiResponse}