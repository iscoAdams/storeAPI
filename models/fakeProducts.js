import { faker } from '@faker-js/faker';
let arr = [];
for (let i = 0 ; i <3;i++){  
     let data = {};
     data.name= faker.commerce.product(),
     data.price= faker.commerce.price(),
     data.feautered= faker.datatype.boolean(),
     data.rating =faker.datatype.number(),
     //randomcategory,
     data.company = faker.helpers.arrayElement(['ikea','intel','nestla','marcos']),
     data.created_at = faker.date.past()
      arr.push(data);
      console.log(data);    
    }
export default arr;
//  console.log(arr);
//note if we just pass the faker values to variables and then pass it to the array 
//then it will be the same value every time.