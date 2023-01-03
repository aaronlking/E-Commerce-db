const productController = require('../controller/productController');
const productRouter = require('koa-router')({
    prefix: '/product'
});

//returns all the available products in the product table
// curl -X GET http://localhost:8015/api/v1/product
productRouter.get('/', productController.all);

//returns a specific product if searched by id, returns description, price and id
// curl -X GET http://localhost:8015/api/v1/product/Product%201
productRouter.get('/:id', productController.byId);

//updates a specific product if searched by id, updates the description and price of product
// curl -X PUT -H 'Content-type: application/json' -d '{"description":"Silk Shirt","price":"22.50"}' http://localhost:8015/api/v1/product/Product%201 
productRouter.put('/:id', productController.update);

//adds a new product to the database in the product table, requires id, description and price parameters
// curl -X POST -H 'Content-type: application/json' -d '{"id":"Product 9","description":"Even Silkier Shirt","price":"420.00"}' http://localhost:8015/api/v1/product
productRouter.post('/', productController.add)

//deletes a product in the product table
// curl -X DELETE http://localhost:8015/api/v1/product/Product%209
productRouter.delete('/:id', productController.delete);

module.exports = productRouter;