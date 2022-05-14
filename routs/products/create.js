import products from '../../models/products.js';
import fakeproducts from '../../models/fakeProducts.js'
// export const createfaker =  async (req,res)=>{
//     const createdarr =JSON.parse(JSON.stringify(fakeproducts));
//     // console.log(createdarr);
//     const product = await products.create(createdarr);
//     res.status(200).json({
//         msg : "product created",
//         data : product
//     });
//      throw new Error("faild to create data");
// };
export default (req, res, next) => {
    const product = req.body;
    const createdproduct = products.create(product);
    res.status(200).json({
        msg: "product created",
        data: createdproduct
    });
    throw new Error("faild to create data");
};
