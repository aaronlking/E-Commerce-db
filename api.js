// Importing dependencies 
const koa = require('koa');
const bodyparser = require('koa-bodyparser');
const koajson = require('koa-json');
const defaultRouter = require('./routes/default');
// Creating new instance of Koa
const api = new koa();

const API_PORT = 8015;

api.use(bodyparser());
api.use(koajson());
defaultRouter(api);

api.listen(API_PORT, () => {
    console.log(`API HAS STARTED WITHOUT ERRORS ON PORT: ${API_PORT}`);
});