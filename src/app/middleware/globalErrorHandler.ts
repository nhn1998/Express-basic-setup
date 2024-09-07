/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";

const GlobalErrorHandler = (err:any, req: Request, res:Response, next:NextFunction)=>{
    const statusCode = 500;
    const message = err.message || "something went Wrong";
    return res.status(statusCode).json({
        success:false,
        message,
        err:err
    })

}

export default GlobalErrorHandler