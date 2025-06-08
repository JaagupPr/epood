const { db } = require("../db");
const Utils = require("./utils");

const validateId = (id) => {
  const num = parseInt(id);
  return isNaN(num) ? null : num;
};

exports.getAll = async (req, res) => {
  const reviews = await db.reviews.findAll({
    attributes: ['ReviewID', 'ProductID', 'Rating', 'Comment'] 
  });
  res.send(reviews);
};

exports.getById = async (req, res) => {
  const id = validateId(req.params.id);
  if (!id) return res.status(400).send({ error: "Invalid ID format" });

  const review = await db.reviews.findByPk(id);
  if (!review) return res.status(404).send({ error: "Review not found" });
  res.send(review);
};

exports.create = async (req, res) => {
  const { ProductID, UserID, Rating, Comment } = req.body;
  if (!ProductID || !UserID || !Rating) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  if (Rating < 1 || Rating > 5) {
    return res.status(400).send({ error: "Rating must be between 1 and 5" });
  }

  const newReview = await db.reviews.create({ ProductID, UserID, Rating, Comment });
  res.status(201)
    .location(`${Utils.getBaseURL(req)}/reviews/${newReview.ReviewID}`)
    .send(newReview);
};

exports.editById = async (req, res) => {
  const id = validateId(req.params.id);
  if (!id) return res.status(400).send({ error: "Invalid ID format" });

  const review = await db.reviews.findByPk(id);
  if (!review) return res.status(404).send({ error: "Review not found" });

  const { Rating, Comment } = req.body;
  if (!Rating || !Comment) {
    return res.status(400).send({ error: "Missing required fields" });
  }
  if (Rating < 1 || Rating > 5) {
    return res.status(400).send({ error: "Rating must be between 1 and 5" });
  }

  await review.update({ Rating, Comment });
  res.send(review);
};

exports.deleteById = async (req, res) => {
  const id = validateId(req.params.id);
  if (!id) return res.status(400).send({ error: "Invalid ID format" });

  const review = await db.reviews.findByPk(id);
  if (!review) return res.status(404).send({ error: "Review not found" });

  await review.destroy();
  res.status(204).send();
};