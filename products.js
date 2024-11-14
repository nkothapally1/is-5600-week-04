const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, 'data/full-products.json')

async function list(options = {}) {
  const { offset = 0, limit = 25, tag } = options

  const data = await fs.readFile(productsFile)
  return JSON.parse(data)
    //filter
    .filter(product => {
      if (!tag) {
        return product
      }
      // check if tag exists

      return product.tags.find(({ title }) => title ==tag) 

    })
    .slice(offset, offset + limit) // Slice the products
}
async function get(id) {
  const products = JSON.parse(await fs.readFile(productsFile));
  return products.find(product => product.id === id) || null;
}

async function deleteProduct(id) {
  const products = JSON.parse(await fs.readFile(productsFile));
  const filteredProducts = products.filter(product => product.id !== id);
  console.log(`Product with ID ${id} deleted`);
  return;
}

async function updateProduct(id, newProductData) {
  const products = JSON.parse(await fs.readFile(productsFile));
  const index = products.findIndex(product => product.id === id);

  if (index !== -1) {
    products[index] = { ...products[index], ...newProductData };
    console.log(`Product with ID ${id} updated with data:`, newProductData);
  }

  return;
}

module.exports = {
  list,
  get,
  deleteProduct,
  updateProduct,
};