const db = require('../database/connection')

class CustomerController {
    static async all(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const query = 'SELECT * FROM Customer;'
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
            console.log('Error in Customer Controller.');
        }
    }

    static async emails(ctx) {

        try {
            return new Promise((resolve, reject) => {

                db.query({
                    sql: 'SELECT * FROM Customer_Emails WHERE customer_id = ?;',
                    values: [ctx.params.customer_id]
                }, (err, res) => {

                    if(err) {
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
            console.log(`Error in Customer Controller: ${error}`);
        }
    };

    static async byId(ctx) {
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'SELECT * FROM Customer WHERE ID = ?;',
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
            console.log(`Error in Customer Controller: ${error}`);
        }
    }

    static async delete(ctx) {
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'DELETE FROM Customer WHERE ID = ?;',
                    values: [ctx.params.id]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = `Customer with ID [${ctx.params.id}] deleted.`;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Customer Controller: ${error}`);
        }
    }


    static async add(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const customer = ctx.request.body;
                const query = `
                    INSERT INTO Customer VALUES
                    (?, ?);
                `

                db.query({
                    sql: query,
                    values: [customer.id, customer._password]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = customer;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Customer Controller: ${error}`);
        }
    }

    static async totalSpent(ctx) {
        try {
            return new Promise((resolve, reject)=>{

                db.query({
                    sql: 'CALL total(?);',
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
            console.log(`Error in Customer Controller: ${error}`);
        }
    }


    static async update(ctx) {
        try {
            return new Promise((resolve, reject)=>{
                const customer = ctx.request.body;
                const query = `
                    UPDATE Customer
                    SET _password = ?
                    WHERE id = ?;
                `

                db.query({
                    sql: query,
                    values: [customer._password, ctx.params.id]
                }, (err, res)=>{
                    if(err){
                        ctx.body = err;
                        ctx.status = 500;
                        reject(err);
                    }

                    ctx.body = customer;
                    ctx.status = 200;
                    resolve();
                });
            });
        } catch(error) {
            console.log(`Error in Customer Controller: ${error}`);
        }
    }
}



module.exports = CustomerController;