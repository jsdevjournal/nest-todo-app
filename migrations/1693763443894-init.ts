import { getDb } from '../migrations-utils';
import { Product, ProductSchema } from '../src/schemas/product.schema';

export const up = async () => {
   const db = await getDb();
   /*
       Code your update script here!
    */
   
      
   const postModel = db.model(Product.name, ProductSchema);
   await postModel.updateMany({ name: 'iPhone' }, { name: 'iPhone 11' });
};

export const down = async () => {
   const db = await getDb();
   /*
       Code you downgrade script here!
    */
   const postModel = db.model(Product.name, ProductSchema);
   await postModel.updateMany({ name: 'iPhone 11' }, { name: 'iPhone' });
};
