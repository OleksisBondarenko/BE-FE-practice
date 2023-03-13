const Product = require("../models/product");
// const User = require("../models/user")

const addProduct = (req, res) => {
  const { product } = req.body;
  
  if (product?._id) {
    product._id = undefined;
  }
  if (product?.reviews) {
    product.reviews = JSON.stringify(product.reviews);
  }

  Product.insertMany([product]).then(result => {
    res.json(result)
  })

};

const updateProduct = (req, res) => {
  console.log(req.body);
  
  const { id, product } = req.body;

  if (product?.reviews) {
    product.reviews = JSON.stringify(product.reviews);
  }

  Product.updateOne({_id: id}, product).then(result => {
    res.json(result)
  })

};


const allProducts = (req, res) => {
  Product.find({}).then(products => {
    const onlyProducts = JSON.parse(JSON.stringify(products));
    const resProduct = onlyProducts.map(product => {
      const parsedReviews = product.reviews ? JSON.parse(product.reviews) : []; 
      return {...product, reviews: parsedReviews}})
    res.json(resProduct)
  })
}


const deleteProducts = (req, res) => {
  const { id } = req.body;

  Product.deleteMany({ "_id": id }).then(result => {
    res.send(result)
  })
}

module.exports = {
  addProduct,
  allProducts,
  deleteProducts,
  updateProduct
};