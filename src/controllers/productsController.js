const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    res.render("products", { products: products });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    let id = Number(req.params.id);
    let product = products.find((product) => product.id == id);
    console.log(product);
    res.render("detail", { product: product });
  },

  // Create - Form to create
  create: (req, res) => {
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    if (req.body) {
      let producto = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        discount: req.body.discount,
        category: req.body.category,
        description: req.body.description,
        image: req.body.image ? req.body.image : "default-image.png",
      };

      products.push(producto);

      let productsJson = JSON.stringify(products);

      fs.writeFileSync(productsFilePath, productsJson);
    }

    res.render("products", { products: products });
  },

  // Update - Form to edit
  edit: (req, res) => {
    let id = Number(req.params.id);

    let product = products.find((product) => product.id == id);

    res.render("product-edit-form", { product: product });
  },
  // Update - Method to update
  update: (req, res) => {
    let id = Number(req.params.id);

    let index = products.findIndex((product) => product.id == id);

    if (index >= 0) {
      let img = products[index].image;
      products[index] = req.body;
      products[index].id = id;
      products[index].image = img;

      let productJson = JSON.stringify(products);

      fs.writeFileSync(productsFilePath, productJson);

      res.render("detail", { product: products[index] });
    }
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    let id = Number(req.params.id);
    //products = products.filter((producto) => producto.id != id);
    let index = products.findIndex((product) => product.id == id);

    if (index >= 0) {
      products.splice(index, 1);
      let productsJson = JSON.stringify(products);

      fs.writeFileSync(productsFilePath, productsJson);
    }

    res.render("products", { products: products });
  },
};

module.exports = controller;
