const customerRouter = require('./customer');
const cartRouter = require('./cart');
const productRouter = require('./product');
// Default router that will later be used to branch off three other routers
const defaultRouter = require('koa-router')({
    prefix: '/api/v1'
});

defaultRouter.use(
    customerRouter.routes(), cartRouter.routes(), productRouter.routes(),
    );

module.exports = api => {
    api.use(
        defaultRouter.routes(), defaultRouter.allowedMethods()
        );
};