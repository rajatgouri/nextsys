const router = require('express').Router();
const routes = [
    'auth',
    'product',
    'collection',
    'admin'
];

module.exports = {
    init: function() {
        routes.forEach(route => {
            const defination = require(`./${route}`);
            router.use(defination.basePath, defination.router)
        });
        return router;
    }
}