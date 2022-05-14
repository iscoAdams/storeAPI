import customErr from '../err/customErr.js';
export default (err, req, res, next) => {
    const {statuscode,messsage} = err instanceof customErr ?
    {statuscode:err.statusCode,messsage:err.message} :
    {statuscode:500,messsage:`something went wrong`};
     res.status(statuscode).json({msg:messsage});
}
    