const Controller = require('../controllers/ProductsController');

module.exports = (app) => {
    app.route("/products")
        .get(ProductsController.getAll)
        .post(ProductsController.create)
    app.route("/products/:id")
        .get(ProductsController.getById)
        .put(ProductsController.editById)
        .delete(ProductsController.deleteById)
}