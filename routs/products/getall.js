import products from '../../models/products.js';
export default async(req,res)=>{ 
    const {featured,company} = req.query;
     const queryObj = {};
    if(featured) queryObj.featured = featured;
    if (company) queryObj.company = company;
    // queryObj.featured = featured?  featured : {}; // this statment can be set to a variable only and not for property
    const productsList = await products.find(queryObj);
     res.status(200).json({
        amount : productsList.length,
         data: productsList
     });
    throw new Error("faild to get all data");
}
/*
export const  getall = async (req, res, next) => {

    res.status(200).json({
        msg : "getting all"
    });
}
export const  getallstatic = async(req,res,next)=>{
    // throw new Error("this is a static error");
    res.status(200).json({
        msg : "getting all static"
    });
}
*/