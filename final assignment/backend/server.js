const express = require("express");
const { request, response } = require("http");
const server = express();
const mongoose = require("mongoose");
const Product = require("./models/product");
const User = require("./models/user");
const cors = require("cors");
require("dotenv/config");
const port = 3000;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

server.use(express.urlencoded({ extended: false }));
server.use(express.json());
server.use(cors());

mongoose
  .connect(
    // "mongodb+srv://admin:database1234@comp1013-cluster.elf6h5d.mongodb.net/products?retryWrites=true&w=majority"
    "mongodb+srv://admin:admin@cluster0.dowovpy.mongodb.net/products"
  )
  .then((result) => {
    server.listen(port, () => {
      console.log(`Listening on ${port}...\nConnected to DB`);
    });
  })
  .catch((error) => console.log(error));

server.get("/", (request, response) => {
  response.send("LIVE!");
});

server.get("/products", async (request, response) => {
  const products = await Product.find();
  response.send(products);
});

server.post("/submitProduct", async (request, response) => {
  const productData = ({ id, productName, brand, quantity, image, price } =
    request.body);
  const newProduct = new Product(productData)
  const saveProduct = await newProduct.save()
  if (saveProduct) {
    response.send("Product successfully Added")
    console.log("Product succesfully added...")
  } else {
    response.send("Failed!!!")
    console.log("Addition failed!!")
  }
});

server.delete("/products/:id", async (request, response) => {
  const { id } = request.params;
  const deleteProduct = await Product.deleteOne({
    _id: new mongoose.Types.ObjectId(id),
  }); //change the id from string to object id to be used by mongoDB
  deleteProduct ? response.send("Product Deleted") : response.send("FAILED!!");
});

server.patch("/products/:_id", async (request, response) => {
  const { _id } = request.params;
  const product = request.body;
  console.log(product)
 // console.log(id)
  console.log(_id)
  const patchProduct = await Product.updateOne(
    { _id: new mongoose.Types.ObjectId(_id) },
    { $set: product }
  );
  patchProduct
    ? response.send(`${product.productName} product is edited`)
    : response.send("Failed to edit");
});

////////////////user registration post

server.post("/register", async (request, response) => {
  const newUser = new User({
    username: request.body.username,
  });
  newUser.password = newUser.generateHash(request.body.password);
  const saveUser = await newUser.save();
  saveUser
    ? response.send("New user has been created")
    : response.send("Failed to store new user");
});

///////////////user verfication post

server.post("/login", async (request, response) => {
  const { username, password } = request.body;
  const jwtToken = jwt.sign({id: username}, "token")
  await User.findOne({ username }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if (err) {
          response.send(err);
        }
        if (res) {
         response.send({message: "Successful Login", token: jwtToken});
        } else {
          response.send({message: "Bad username or password"});
        }
      });

    }
    else {
      response.send({message: "Username does not exist"})
    }
  })
});
