const db = require('../database/connection')

class CartController {
    static async all(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const query = 'SELECT * FROM Cart;'
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
            console.log('Error in Cart Controller.');
        }
    }

    static async allCartTotals(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const query = 'SELECT * FROM Cart_Total;'
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
            console.log('Error in Cart Controller.');
        }
    }

    static async byId(ctx) {
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'SELECT * FROM Cart WHERE ID = ?;',
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
            console.log(`Error in Cart Controller: ${error}`);
        }
    }

    static async byProductId(ctx) {
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'SELECT * FROM Cart_Product WHERE product_id = ?;',
                    values: [ctx.params.product_id]
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
            console.log(`Error in Cart Controller: ${error}`);
        }
    }

    static async cartTotal(ctx) { //uses view to get Cart_Total
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'SELECT * FROM Cart_Total WHERE customer_id = ?;',
                    values: [ctx.params.customer_id]
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
            console.log(`Error in Cart Controller: ${error}`);
        }
    }

    
    static async delete(ctx) {
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'DELETE FROM Cart WHERE ID = ?;',
                    values: [ctx.params.id]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = `Cart with ID [${ctx.params.id}] deleted.`;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Cart Controller: ${error}`);
        }
    }


    static async add(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const cart = ctx.request.body;
                const query = `
                    INSERT INTO Cart VALUES
                    (?, ?);
                `

                db.query({
                    sql: query,
                    values: [cart.id, cart.customer_id]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = cart;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Cart Controller: ${error}`);
        }
    }

    static async update(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const cart = ctx.request.body;
                const query = `
                    UPDATE Cart_Product
                    SET quantity = ?
                    WHERE product_id = ?;
                `

                db.query({
                    sql: query,
                    values: [cart.quantity, ctx.params.product_id]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = cart;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Cart Controller: ${error}`);
        }
    }
}

module.exports = CartController;