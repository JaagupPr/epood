const OrderItemsController = require('../controllers/OrderItemsController');

module.exports = (app) => {
    app.route("/orderitems")
        .get(OrderItemsController.getAll)
        .post(OrderItemsController.create)

    app.route("/orderitems/:id")
        .get(OrderItemsController.getById)
        .put(OrderItemsController.updateById)
        .delete(OrderItemsController.deleteById)
}