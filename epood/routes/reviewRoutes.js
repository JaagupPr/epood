const ReviewsController = require('../controllers/ReviewsController');

module.exports = (app) => {
    app.route("/reviews")
        .get(ReviewsController.getAll)
        .post(ReviewsController.create);
    
    app.route("/reviews/:id")
        .get(ReviewsController.getById)
        .put(ReviewsController.editById)
        .delete(ReviewsController.deleteById);
};

