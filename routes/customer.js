const customerController = require('../controller/customerController');
const customerRouter = require('koa-router')({
    prefix: '/customer'
});

//returns all customers in table
// curl -X GET http://localhost:8015/api/v1/customer
customerRouter.get('/', customerController.all);

//returns all customer emails in table 
// curl -X GET http://localhost:8015/api/v1/customer/email/User%201
customerRouter.get('/email/:customer_id', customerController.emails);

//returns customer search by ID in customer table
// curl -X GET http://localhost:8015/api/v1/customer/User%201
customerRouter.get('/:id', customerController.byId);

//updates a specific customers password attribute in customer table, searched but customer id
// curl -X PUT -H 'Content-type: application/json' -d '{"_password":"1234567"}' http://localhost:8015/api/v1/customer/User%201 
customerRouter.put('/:id', customerController.update);

//adds a new customer with id and password to customer table
// curl -X POST -H 'Content-type: application/json' -d '{"id":"User 8","_password":"password8"}' http://localhost:8015/api/v1/customer
customerRouter.post('/', customerController.add)

//deletes a customer searched by id
// curl -X DELETE http://localhost:8015/api/v1/customer/User%208
customerRouter.delete('/:id', customerController.delete);

//Procedure that returns the total amount spent by a customer, searched by id
// curl -X GET http://localhost:8015/api/v1/customer/total/User%203
customerRouter.get('/total/:customer_id', customerController.totalSpent);

module.exports = customerRouter;