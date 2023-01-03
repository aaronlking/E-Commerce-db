const db = require('../database/connection')

class ProductController {
    static async all(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const query = 'SELECT * FROM Product;'
                db.query(query, (err, res)=>{
                    if(err){
                        reject(err);
                    }

                    ctx.body = res;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log('Error in Product Controller.');
        }
    }

    static async byId(ctx) {
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'SELECT * FROM Product WHERE ID = ?;',
                    values: [ctx.params.id]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = res;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Product Controller: ${error}`);
        }
    }

    

    static async delete(ctx) {
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'DELETE FROM Product WHERE ID = ?;',
                    values: [ctx.params.id]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = `Product with ID [${ctx.params.id}] deleted.`;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Product Controller: ${error}`);
        }
    }


    static async add(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const product = ctx.request.body;
                const query = `
                    INSERT INTO Product VALUES
                    (?, ?, ?);
                `

                db.query({
                    sql: query,
                    values: [product.id, product.description, product.price]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = product;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Product Controller: ${error}`);
        }
    }

    static async update(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const product = ctx.request.body;
                const query = `
                    UPDATE Product
                    SET description = ?,
                        price = ?
                    WHERE id = ?;
                `

                db.query({
                    sql: query,
                    values: [product.description, product.price, ctx.params.id]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = product;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Product Controller: ${error}`);
        }
    }
}

module.exports = ProductController;