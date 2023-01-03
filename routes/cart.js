const cartController = require('../controller/cartController');
const cartRouter = require('koa-router')({
    prefix: '/cart'
});

//Gets all carts in table
// curl -X GET http://localhost:8015/api/v1/cart
cartRouter.get('/', cartController.all);

//Gets all the carts and cart totals associated
// curl -X GET http://localhost:8015/api/v1/cart/total
cartRouter.get('/total', cartController.allCartTotals);

//Gets a cart by cart ID and shows user associated
// curl -X GET http://localhost:8015/api/v1/cart/Cart%201
cartRouter.get('/:id', cartController.byId);

//Gets product and cart associated by product id
// curl -X GET http://localhost:8015/api/v1/cart/cart_product/Product%201
cartRouter.get('/cart_product/:product_id', cartController.byProductId);

//View that returns total of all carts that are associated with a specific user
// curl -X GET http://localhost:8015/api/v1/cart/cart_total/User%201
cartRouter.get('/cart_total/:customer_id', cartController.cartTotal);

//Updates a products quantity in a cart
// curl -X PUT -H 'Content-type: application/json' -d '{"quantity":"2"}' http://localhost:8015/api/v1/cart/Product%201 
cartRouter.put('/:product_id', cartController.update);

//Adds a cart to a user specified
// curl -X POST -H 'Content-type: application/json' -d '{"id":"Cart 8","customer_id":"User 7"}' http://localhost:8015/api/v1/cart
cartRouter.post('/', cartController.add)

//Deletes a cart specified
// curl -X DELETE http://localhost:8015/api/v1/cart/Cart%208
cartRouter.delete('/:id', cartController.delete);

module.exports = cartRouter;