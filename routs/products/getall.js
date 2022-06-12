import products from '../../models/products.js';
export default async(req,res)=>{ 
    //all that stuff was in the hackernews api that i copid to go throw with mine
    const {featured,company,name,sort,category,numericFilters} = req.query;
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
   
   //sort is the last operation so we want to do here after we find the data
//    if (numericFilters){
//        compareMap = {
//            '<': '$lt',
//            '<=': '$lte',
//            '=':  '$eq',
//            '>=': '$gte',
//            '>':    '$gt'
//         }
//         const regEx = /\b(<|>|>=|=|<=)\b/g; //regex to convert friendly compare methods to thing that mongoose understands
//         let filters = numericFilters.replace(regEx,(match)=>`-${compareMap[match]}-`);
//         //i get that syntax from stackoverflow and that to simplify the req query that has been taken from the user
//         //those <--> made reaching for each value and properety easier later on
//         // console.log(filters);
//         const options = ['price','rating']; //these are the only list of properties that can be filtered as numbers
//         //  const filterObj = {};
//         filters.split(',').forEach((filter)=>{
//             const [option,operator,value] = filter.split('-');
//             if (options.includes(option))  {
//             queryObj[option] ={[operator]:Number(value)};
//             // filterObj[operator] = value;
//             // queryObj[option] = filterObj;
//             }
//         })
//     }
if (numericFilters){
    const   compareMap = {
           '<': '$lt',
           '<=': '$lte',
           '=':  '$eq',
           '>=': '$gte',
           '>':    '$gt'
        }
        const regEx = /\b(<|>|>=|=|<=)\b/g; //regex to convert friendly compare methods to thing that mongoose understands
        let filters = numericFilters.replace(regEx,(match)=>`-${compareMap[match]}-`);
        //i get that syntax from stackoverflow and that to simplify the req query that has been taken from the user
        //those <--> made reaching for each value and properety easier later on
        // console.log(filters);
        const options = ['price','rating']; //these are the only list of properties that can be filtered as numbers
         const filterObj = {};
        filters.split(',').forEach((filter)=>{
            const [option,operator,value] = filter.split('-');
            if (options.includes(option))  {
            // queryObj[option] ={[operator]:Number(value)};
            filterObj[operator] = value;
            queryObj[option] = filterObj;
            } //here i am adding an object to the query object
        })
}
    // console.log(queryObj);
    let data =  products.find(queryObj) // if there is no properity passed then it will pass to the next function which as i can see it  whill get all the data
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

    const limit = Number(req.query.limit) || 10; //number because req.query is always returning a string
    const page = Number(req.query.page) || 1; 
    const skippedElements = (page-1)*limit; //if 1 no skip and if 2 skip 1*whatever_limit elements
    data.limit(limit).skip(skippedElements);
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