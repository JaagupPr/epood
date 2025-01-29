const { db } = require("../db");
const Utils = require("./utils");

exports.getAll = async (req, res) => {
  const reviews = await db.reviews.findAll();
  res.send(reviews);
};

exports.getById = async (req, res) => {
  const review = await db.reviews.findByPk(req.params.id);
  if (!review) return res.status(404).send({ error: "Review not found" });
  res.send(review);
};

exports.create = async (req, res) => {
  const { ProductID, UserID, Rating, Comment } = req.body;
  if (!ProductID || !UserID || !Rating) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  const newReview = await db.reviews.create({
    ProductID,
    UserID,
    Rating,
    Comment,
  });

  res.status(201)
    .location(`${Utils.getBaseURL(req)}/reviews/${newReview.ReviewID}`)
    .send(newReview);
};

exports.editById = async (req, res) => {
  const review = await db.reviews.findByPk(req.params.id);
  if (!review) return res.status(404).send({ error: "Review not found" });

  const { Rating, Comment } = req.body;

  if (!Rating || !Comment) {
    return res.status(400).send({ error: "Missing required fields" });
  }

  review.set({ Rating, Comment });
  await review.save();

  res.status(200)
    .location(`${Utils.getBaseURL(req)}/reviews/${review.ReviewID}`)
    .send(review);
};

exports.deleteById = async (req, res) => {
  const review = await db.reviews.findByPk(req.params.id);
  if (!review) return res.status(404).send({ error: "Review not found" });

  await review.destroy();
  res.status(204).send();
};
