const Controller = require('../controllers/OrdersController');

module.exports = (app) => {
    app.route("/orders")
        .get(OrdersController.getAll)
        .post(OrdersController.create)
    app.route("/orders/:id")
        .get(OrdersController.getById)
        .put(OrdersController.editById)
        .delete(OrdersController.deleteById)
}