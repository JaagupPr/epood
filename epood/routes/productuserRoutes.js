const ProductUserController = require('../controllers/ProductUserController');
const { db } = require('../db');

module.exports = (app) => {
    app.route('/product-user')
        .get(async (req, res) => {
            try {
                const associations = await db.productuser.findAll();
                res.status(200).send(associations);
            } catch (error) {
                console.error("Detailed error:", error);
                res.status(500).send({ 
                    error: 'Failed to fetch product-user associations',
                    details: error.message 
                });
            }
        });

    app.route('/product-user/assign')
        .post(ProductUserController.assignProduct);    

    app.route('/product-user/unassign')
        .delete(ProductUserController.unassignProduct);
};
