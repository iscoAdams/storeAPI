//the whole idea of that file instead of the fakeproduct module is that i can avoid adding more while i'm using the other server 
//and i just need to add once and then comeback to my main server and whole of it's functionallity
import { faker } from '@faker-js/faker';
import products from './models/products.js';
import connect from './db/connect.js';
import dotenv from 'dotenv';
dotenv.config();
let arr = [];
for (let i = 0 ; i <10;i++){  
        let data = {};
        data.name= faker.commerce.product(),
        data.price= faker.commerce.price(),
        data.feautered= faker.datatype.boolean(),
        data.rating =faker.datatype.number(),
        data.company = faker.helpers.arrayElement(['ikea','intel','nestla','marcos']),
        data.created_at = faker.date.past()
        arr.push(data);
    }
const start = async () => {
    try {
        await connect(process.env.DB_URL);
        await products.deleteMany({});
        await products.create(arr);
        console.log(' old one deleted and fake products was created');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
    start();