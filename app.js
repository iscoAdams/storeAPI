import express from 'express';
import dotenv from 'dotenv';
import errHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import connect from './db/connect.js'
import 'express-async-errors'
import productsRouts from './routs/products/productRouts.js';
dotenv.config();
const app = express();
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('<h1>storeApi app </h1><a href="/api/v1/products">products</a>')
});
app.use('/api/v1/products',productsRouts)
app.use(notFound); //must be here after the  all defined routes '/' or i will git page not found
app.use(errHandler); 
const port = process.env.PORT || 3000;
const run = async () => {
    try {
    await connect(process.env.DB_URL);
    app.listen(port, () => {
            console.log(`yo isco we are connect to database and the server is running on port ${port}`);
        });
   }
   catch(err){
         console.log(err);
    }
}
run();