const path = require("path");
const Products = require("./products");
const autoCatch = require("./lib/auto-catch");

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, "/index.html"));
}

async function getProduct(req, res, next) {
  const { id } = req.params;
  const product = await Products.get(id);

  if (!product) {
    return next();
  }

  return res.json(product);
}

async function listProducts(req, res) {
  const { offset = 0, limit = 25, tag } = req.query;
  // Pass the limit, offset, and tag to the Products service
  res.json(
    await Products.list({
      offset: Number(offset),
      limit: Number(limit),
      tag,
    }),
  );
}

async function createProduct(req, res) {
  console.log("request body:", req.body);
  res.json(req.body);
}

async function updateProduct(req, res) {
  const { id } = req.params;
  const productData = req.body;

  await Products.updateProduct(id, productData);
  res.status(200).send(`Product with ID ${id} updated`);
}

async function deleteProduct(req, res) {
  const { id } = req.params;

  await Products.deleteProduct(id);
  res.status(202).send(`Product with ID ${id} deleted`);
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
});
