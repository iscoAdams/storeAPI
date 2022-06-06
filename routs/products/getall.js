import products from '../../models/products.js';
export default async(req,res)=>{ 
    const {featured,company,name,sort,category} = req.query;
     const queryObj = {};
    if(featured) queryObj.featured = featured;
    if (company) queryObj.company = company;
    if (name) queryObj.name = {$regex:name, $options:'i'}
/*
    queryObj.company = company? company : {};
    queryObj.name = name?  name : {};
    queryObj.featured = featured?  featured : {}; // this statment can be set to a variable only and not for property
    */
    /* let sortlist = sort.split(',').join(' '); 
    if (!sort) sortlist = 'price'; //not working good with no sort
    */
   let data =  products.find(queryObj) // if there is no properity passed then it will pass to the next function which as i can see it  whill get all the data
   //sort is the last operation so we want to do here after we find the data
   if (sort){
       //syntax of sort require a space if there is a list
       let sortlist = sort.split(',').join(' '); 
       data.sort(sortlist);
    }
    else  data.sort('-price');
    if(category){
        let categoylist = category.split(',').join(' '); 
        data.select(categoylist);
    }
    const productsList = await data //await must be the last call back
    //notice that i passed sort here and not as a property above as that when i make a list 
    //of sort elements and the senario is that the user didnt enter an element then 
    //it will crash the app and i want to avoid that
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