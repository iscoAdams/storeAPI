import { faker } from '@faker-js/faker';
import objtocsv from 'objects-to-csv' //to add the objects of the array to csv
//import converter from 'json-2-csv'; // to convert the array to csv or to convert the csv file to array
//https://github.com/mrodrig/json-2-csv/wiki/csv2json-Documentation for the json2csv packege
/*
import stream from 'stream';
const readablestream = new stream.Readable()
readablestream._read = () => {};
import {parse} from 'csv-parse'; // for streaming the csv file
readablestream.push(JSON.stringify(arr));
readablestream.on('readable', () => {
    console.log(readablestream.read())
})*/
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//the above four lines for the path of the file which is unknown in es6
let arr = [];
var readFile = fs.createReadStream(`${__dirname}/products.csv`, {encoding: 'utf-8'});
// var writeFile  = fs.createWriteStream(`${__dirname}/products.csv`);
for (let i = 0 ; i <3;i++){  
    /*note if we just pass the faker values to variables and then pass it to the array 
    then it will be the same value every time.*/
        let data = {};
        data.name= faker.commerce.product(),
        data.price= faker.commerce.price(),
        data.feautered= faker.datatype.boolean(),
        data.rating =faker.datatype.number(),
        //randomcategory,
        data.company = faker.helpers.arrayElement(['ikea','intel','nestla','marcos']),
        data.created_at = faker.date.past()
        arr.push(data);
       // writeFile.write(JSON.stringify(data)); //stringify the data to csv as it must be string
    }
/* i had to pause this function as it keep adding to my data csv file
      (async ()=>{
        const csv = new objtocsv(arr);
        await csv.toDisk(`${__dirname}/products.csv`,{append:true});
       // console.log('appended to csv file');
    })(); //function to add data array to csv file uding objtocsv package
*/
    /*readFile.on('data', (chunk) =>{
        console.log(chunk);
        })
        .on('error', (err)=> {
            console.log(err);
        });
        */

    export default arr;